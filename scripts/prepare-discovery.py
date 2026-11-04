# -*- coding: utf-8 -*-
"""Niveau 0 « Découverte du numérique » : vérifie les leçons et génère dist/data/decouverte/."""
from pathlib import Path
import json, re

r = Path(__file__).resolve().parent.parent
src = r / 'content/fr/decouverte'
out = r / 'dist/data/decouverte'
out.mkdir(parents=True, exist_ok=True)
course = json.loads((src / 'course.json').read_text(encoding='utf-8'))
TYPES = {'qcm', 'vraifaux', 'ordre', 'associer'}
errors = []


def fail(where, msg):
    errors.append(f'{where}: {msg}')


def fr_spaces(v):
    """Espace insécable avant ? ! : ; » et après « : la ponctuation ne se retrouve jamais seule en début de ligne."""
    if isinstance(v, str):
        return re.sub(r'« ', '«\u00a0', re.sub(r' ([?!:;»])', '\u00a0\\1', v))
    if isinstance(v, list):
        return [fr_spaces(x) for x in v]
    if isinstance(v, dict):
        return {k: fr_spaces(x) for k, x in v.items()}
    return v


def text(v):
    return isinstance(v, str) and v.strip() != ''


def check_activity(where, a, prefix, seen):
    aid = a.get('id', '')
    if not re.fullmatch(re.escape(prefix) + r'-a\d', aid):
        fail(where, f'identifiant d’activité invalide « {aid} »')
    if aid in seen:
        fail(where, f'identifiant en double « {aid} »')
    seen.add(aid)
    t = a.get('type')
    if t not in TYPES:
        fail(where, f'{aid} : type inconnu « {t} »')
        return
    if not text(a.get('explanation_fr')):
        fail(where, f'{aid} : explication manquante')
    if t == 'qcm':
        opts = a.get('options_fr', [])
        if not text(a.get('question_fr')) or not 3 <= len(opts) <= 5 or not all(map(text, opts)) or len(set(opts)) != len(opts):
            fail(where, f'{aid} : question ou options invalides')
        if not isinstance(a.get('answer'), int) or not 0 <= a['answer'] < len(opts):
            fail(where, f'{aid} : index de réponse invalide')
    elif t == 'vraifaux':
        if not text(a.get('statement_fr')) or not isinstance(a.get('answer'), bool):
            fail(where, f'{aid} : affirmation ou réponse invalide')
    elif t == 'ordre':
        items = a.get('items_fr', [])
        if not text(a.get('question_fr')) or not 3 <= len(items) <= 6 or not all(map(text, items)) or len(set(items)) != len(items):
            fail(where, f'{aid} : étapes invalides')
    elif t == 'associer':
        pairs = a.get('pairs_fr', [])
        lefts = [p[0] for p in pairs if isinstance(p, list) and len(p) == 2]
        if not text(a.get('question_fr')) or not 3 <= len(pairs) <= 6 or len(lefts) != len(pairs) or len(set(lefts)) != len(lefts) or not all(text(x) for p in pairs for x in p):
            fail(where, f'{aid} : paires invalides')


index_lessons, search_terms = [], set()
for m in course['modules']:
    m['lesson_ids'] = []
    if m['status'] != 'ouvert':
        if len(m.get('planned_fr', [])) < 3:
            fail(m['id'], 'module prévu sans plan')
        continue
    for p in sorted((src / m['id']).glob('*.md')):
        where = str(p.relative_to(r))
        raw = p.read_text(encoding='utf-8').replace('\r\n', '\n')
        parts = raw.split('---', 2)
        if len(parts) != 3 or parts[0].strip():
            fail(where, 'en-tête --- {json} --- manquant')
            continue
        row = json.loads(parts[1])
        body = [x.strip() for x in parts[2].strip().split('\n\n') if x.strip()]
        words = sum(len(x.split()) for x in body)
        if row.get('id') != p.stem or row.get('course') != course['id'] or row.get('module') != m['id']:
            fail(where, 'id, cours ou module incohérent avec le chemin')
        if not 120 <= words <= 300:
            fail(where, f'{words} mots d’explication (attendu : 120 à 300)')
        if not 5 <= row.get('minutes', 0) <= 10:
            fail(where, 'durée hors de 5 à 10 minutes')
        for key in ['title_fr', 'idea_fr', 'analogy_fr']:
            if not text(row.get(key)):
                fail(where, f'champ {key} manquant')
        if len(row.get('outcomes', [])) != 2:
            fail(where, 'il faut 2 objectifs')
        ex = row.get('example', {})
        if not text(ex.get('title_fr')) or len(ex.get('steps_fr', [])) < 3:
            fail(where, 'exemple guidé incomplet')
        rf = row.get('reflect', {})
        if not text(rf.get('question_fr')) or not text(rf.get('model_fr')):
            fail(where, '« Explique avec tes mots » incomplet')
        if not 2 <= len(row.get('recap_fr', [])) <= 4 or not row.get('glossary'):
            fail(where, 'récapitulatif ou mots nouveaux manquants')
        acts = json.loads(p.with_name(p.stem + '.activities.json').read_text(encoding='utf-8'))
        if len(acts) != 4:
            fail(where, f'{len(acts)} activités (attendu : 4)')
        seen = set()
        for a in acts:
            check_activity(where, a, row['id'], seen)
        row['body_fr'] = body
        row['words'] = words
        row['activities'] = acts
        row = fr_spaces(row)
        (out / (row['id'] + '.json')).write_text(json.dumps(row, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
        m['lesson_ids'].append(row['id'])
        index_lessons.append({k: row[k] for k in ['id', 'title_fr', 'module', 'order', 'minutes', 'tags']})
    orders = [l['order'] for l in index_lessons if l['module'] == m['id']]
    if orders != list(range(1, len(orders) + 1)):
        fail(m['id'], f'ordre des leçons incohérent {orders}')

if errors:
    raise SystemExit('Découverte du numérique :\n- ' + '\n- '.join(errors))
course = fr_spaces(course)
course['lessons'] = index_lessons
course['estimated_minutes'] = sum(l['minutes'] for l in index_lessons)
(out / 'index.json').write_text(json.dumps(course, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print('Prepared discovery lessons:', len(index_lessons))

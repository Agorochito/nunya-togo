"""Generate dist/ambiances.css: the seven Nunya ambiances, in light and dark, plus shared polish and the liquid glass layer.

Every ambiance fills the same roles; text roles keep at least 4.5:1 on their surfaces (checked below, before writing).
Run: python3 scripts/build-ambiances.py
"""
from pathlib import Path

ROLES = ['bg', 'surface', 'raised', 'ink', 'muted', 'line', 'soft', 'text', 'deep', 'accent', 'on', 'accent2', 'on2']
A = {
    'nunya': {
        'light': ['#f6f4ee', '#ffffff', '#eef3ec', '#14231b', '#4f5d55', '#dde3d8', '#e2efe6', '#1f5e46', '#173f31', '#1f5e46', '#ffffff', '#f08a4b', '#1b1208'],
        'dark': ['#0f1713', '#17211c', '#1e2a24', '#ecf2ec', '#a9b7ae', '#2c3a33', '#1f3a2e', '#7fd3a8', '#ecf2ec', '#7fd3a8', '#0f1713', '#ffa36b', '#1b1208']},
    'lagune': {
        'light': ['#eef3fa', '#ffffff', '#e4edf8', '#0d1a2b', '#475a70', '#d3deeb', '#dee9fc', '#1d4fb8', '#0d2a5c', '#1d5bd6', '#ffffff', '#19b3a6', '#062420'],
        'dark': ['#0b1220', '#121b2d', '#182338', '#eaf1fb', '#a5b4c8', '#26334b', '#17284a', '#8fb4ff', '#eaf1fb', '#8fb4ff', '#0b1220', '#3fd6c8', '#04201d']},
    'kente': {
        'light': ['#fff6e5', '#fffdf8', '#fbebcb', '#1a1611', '#5a4f40', '#e7d9bb', '#fde7b0', '#a3361a', '#1a1611', '#1a1611', '#fff6e5', '#f4b400', '#1a1611'],
        'dark': ['#14110c', '#1d1913', '#26211a', '#fbf3e4', '#c2b6a2', '#3a3226', '#3a2e14', '#ffc83d', '#fbf3e4', '#ffc83d', '#14110c', '#ff7a4d', '#1a0c06']},
    'sauge': {
        'light': ['#f3eee7', '#fbf8f3', '#e9e4db', '#20261e', '#596156', '#dcd5c8', '#e1e8df', '#4a5e4f', '#2e3b31', '#55695a', '#ffffff', '#b7a792', '#20261e'],
        'dark': ['#121512', '#1a1e1a', '#222722', '#ecefe8', '#adb5aa', '#313830', '#263228', '#a9c7ae', '#ecefe8', '#a9c7ae', '#121512', '#d9cbb8', '#1a1e1a']},
    'prune': {
        'light': ['#ede4ea', '#faf6f8', '#e4d7df', '#2a1a29', '#62505f', '#d7c7d1', '#f0e1ea', '#7a3e5f', '#3e2340', '#6b4568', '#ffffff', '#e58ba0', '#2a1a29'],
        'dark': ['#151015', '#1e171e', '#271f27', '#f4ecf2', '#bbaab8', '#3a2e39', '#352335', '#f0a9c4', '#f4ecf2', '#f0a9c4', '#151015', '#b9a3ff', '#151015']},
    'nuit': {
        'dark': ['#0c111b', '#151c2a', '#1c2537', '#eef2f9', '#a6b1c4', '#29344a', '#1d2a47', '#a9beff', '#eef2f9', '#8da9ff', '#0c111b', '#ffb65c', '#1b1206']},
    'verre': {
        'light': ['#f2f3f8', 'rgba(255,255,255,.62)', 'rgba(255,255,255,.48)', '#0e1022', '#43475e', 'rgba(14,16,34,.12)', 'rgba(255,255,255,.58)', '#2f3fc0', '#0e1022', '#2f45d6', '#ffffff', '#6a4cf0', '#ffffff'],
        'dark': ['#0b0d1a', 'rgba(22,25,48,.54)', 'rgba(255,255,255,.08)', '#ffffff', 'rgba(255,255,255,.82)', 'rgba(255,255,255,.22)', 'rgba(255,255,255,.12)', '#dfe5ff', '#ffffff', '#ffffff', '#0b0d1a', '#b8a6ff', '#140b33']},
}
# Opaque surfaces used by "Verre léger" and by browsers without backdrop-filter.
GLASS_LITE = {'light': ('#ffffff', '#f1f2f8', '#f5f5fa'), 'dark': ('#191c33', '#21253f', '#1e223b')}
# Card previews in the picker always show the ambiance's own light look (Nuit and Verre: their dark look).
PREVIEW = {k: (v.get('light') or v['dark']) if k != 'verre' else v['dark'] for k, v in A.items()}


def rgba(c):
    if c.startswith('#'):
        return [int(c[i:i + 2], 16) for i in (1, 3, 5)] + [1.0]
    r, g, b, a = c[c.index('(') + 1:-1].split(',')
    return [int(r), int(g), int(b), float(a)]


def over(top, under):
    t, u = rgba(top), rgba(under)
    a = t[3]
    return '#' + ''.join(f'{round(t[i] * a + u[i] * (1 - a)):02x}' for i in range(3))


def lum(c):
    v = [x / 255 for x in rgba(c)[:3]]
    v = [x / 12.92 if x <= .04045 else ((x + .055) / 1.055) ** 2.4 for x in v]
    return .2126 * v[0] + .7152 * v[1] + .0722 * v[2]


def ratio(a, b):
    x, y = lum(a), lum(b)
    return (max(x, y) + .05) / (min(x, y) + .05)


# Glass is judged over its base colour and over its brightest colour field at the opacity drawn (.75).
GLASS_GROUNDS = {'dark': ['#0b0d1a'] + [over(f'rgba({c},.75)', '#0b0d1a') for c in ('79,107,255', '168,93,232', '226,85,127', '217,138,74')],
                 'light': ['#f2f3f8'] + [over(f'rgba({c},.75)', '#f2f3f8') for c in ('184,196,255', '226,196,255', '255,196,220', '255,217,184')]}
problems = []
for name, modes in A.items():
    for mode, p in modes.items():
        d = dict(zip(ROLES, p))
        grounds = GLASS_GROUNDS[mode] if name == 'verre' else [d['bg']]
        for g in grounds:
            surfaces = [over(d['surface'], g), over(d['raised'], over(d['surface'], g)), over(d['soft'], over(d['surface'], g))] + ([] if name == 'verre' else [g])
            for s_ in surfaces:
                for role in ('ink', 'muted', 'text'):
                    color = over(d[role], s_)
                    if ratio(color, s_) < 4.5:
                        problems.append(f'{name}/{mode}: {role} {d[role]} sur {s_} = {ratio(color, s_):.2f}')
        if ratio(d['on'], over(d['accent'], d['bg'])) < 4.5:
            problems.append(f'{name}/{mode}: bouton {ratio(d["on"], d["accent"]):.2f}')
        if ratio(d['on2'], d['accent2']) < 4.5:
            problems.append(f'{name}/{mode}: accent 2 {ratio(d["on2"], d["accent2"]):.2f}')
if problems:
    raise SystemExit('Contraste insuffisant :\n' + '\n'.join(problems))


def block(selector, p, dark):
    d = dict(zip(ROLES, p))
    shadow = ('0 1px 0 rgba(255,255,255,.04) inset,0 14px 30px -16px rgba(0,0,0,.7)' if dark
              else '0 1px 2px rgba(20,28,24,.06),0 12px 28px -16px rgba(20,28,24,.24)')
    hi = ('0 24px 48px -18px rgba(0,0,0,.85)' if dark else '0 2px 4px rgba(20,28,24,.08),0 22px 44px -18px rgba(20,28,24,.34)')
    vars_ = {
        'theme-bg': d['bg'], 'theme-surface': d['surface'], 'theme-raised': d['raised'], 'theme-ink': d['ink'],
        'theme-muted': d['muted'], 'theme-line': d['line'], 'theme-soft': d['soft'], 'theme-text': d['text'], 'theme-deep': d['deep'],
        'accent': d['accent'], 'accent-text': d['text'], 'accent-on': d['on'], 'accent-soft': d['soft'], 'green': d['text'],
        'deep': d['deep'], 'mint': d['soft'], 'accent-2': d['accent2'], 'accent-2-on': d['on2'],
        'amb-shadow': shadow, 'amb-shadow-hi': hi,
    }
    return selector + '{' + ';'.join(f'--{k}:{v}' for k, v in vars_.items()) + ';color-scheme:' + ('dark' if dark else 'light') + '}'


out = ['/* Generated by scripts/build-ambiances.py: seven ambiances, light and dark, plus shared polish and liquid glass. */']
for name, modes in A.items():
    if name == 'nuit':
        out.append(block(f'html[data-ambiance=nuit]', modes['dark'], True))
        continue
    out.append(block(f'html[data-ambiance={name}]', modes['light'], False))
    out.append(block(f'html[data-ambiance={name}][data-mode=dark]', modes['dark'], True))

for name, p in PREVIEW.items():
    d = dict(zip(ROLES, p))
    bg = ('linear-gradient(135deg,#4f6bff,#c86bff 55%,#ff6f9f)' if name == 'verre' else d['bg'])
    card = 'rgba(255,255,255,.38)' if name == 'verre' else d['surface']
    out.append(f'.ambiance-preview[data-preview={name}]{{--p-bg:{bg};--p-card:{card};--p-line:{d["line"]};--p-btn:{d["accent"]};--p-dot:{d["accent2"]}}}')

out.append('''
/* Shared polish: depth, motion and clearer progress in every ambiance. */
html[data-ambiance] body.personalized :is(.panel,.stat,.course-card,.resource-card,.sector-tile,.job-path,.settings-card,.download-row,.nunya-course-card,.daily-card){box-shadow:var(--amb-shadow)}
html[data-ambiance] body.personalized :is(.course-card,.resource-card,.sector-tile,.job-path,.nunya-course-card,.ambiance-card){transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s,border-color .25s}
html[data-ambiance] body.personalized :is(.course-card,.resource-card,.sector-tile,.job-path,.nunya-course-card):hover{transform:translateY(-3px);box-shadow:var(--amb-shadow-hi);border-color:var(--accent-text)!important}
html[data-ambiance] body.personalized :is(.primary,.secondary){transition:transform .15s,filter .2s,box-shadow .2s}
html[data-ambiance] body.personalized .primary:hover{filter:brightness(1.08);box-shadow:var(--amb-shadow-hi)}
html[data-ambiance] body.personalized :is(.primary,.secondary):active{transform:scale(.97)}
html[data-ambiance] body.personalized :is(.progress-line>span,.walk-progress .filled){background:var(--accent-2)!important}
html[data-ambiance] body.personalized .eyebrow .dot{background:var(--accent-2)!important}
html[data-ambiance=verre] body.personalized .toggle.on{background:var(--accent-2)!important}
@media (prefers-reduced-motion:reduce){html[data-ambiance] body.personalized *{transition:none!important;animation:none!important}html[data-ambiance] body.personalized :is(.course-card,.resource-card,.sector-tile,.job-path,.nunya-course-card):hover{transform:none}}

/* Ambiance picker */
.ambiance-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(132px,100%),1fr));gap:10px;margin:16px 0}
.appearance-panel .setting-line>span small{display:block;font-weight:400;margin-top:2px;color:var(--theme-muted)}
@media (max-width:480px){.ambiance-preview{height:58px}.ambiance-card small{font-size:12px}}
.ambiance-card{display:flex;flex-direction:column;align-items:stretch;gap:6px;padding:8px 8px 12px;border-radius:18px;border:1.5px solid var(--theme-line,#ddd);background:var(--theme-surface,#fff);color:var(--theme-ink,#222);font:inherit;text-align:left;cursor:pointer;min-height:44px}
.ambiance-card:hover{transform:translateY(-2px)}
.ambiance-card[aria-pressed=true]{border:2.5px solid var(--accent-text);box-shadow:var(--amb-shadow-hi)}
.ambiance-card[aria-pressed=true] strong::after{content:" ✓";color:var(--accent-text)}
.ambiance-card strong{font-size:15px;padding:0 4px}.ambiance-card small{padding:0 4px;color:var(--theme-muted)}
.ambiance-preview{position:relative;display:block;height:74px;border-radius:12px;overflow:hidden;background:var(--p-bg);border:1px solid var(--p-line)}
.ambiance-preview i{position:absolute;left:10px;right:34px;top:10px;height:14px;border-radius:7px;background:var(--p-card);border:1px solid var(--p-line)}
.ambiance-preview b{position:absolute;left:10px;top:32px;width:56px;height:22px;border-radius:999px;background:var(--p-btn)}
.ambiance-preview em{position:absolute;right:10px;bottom:10px;width:20px;height:20px;border-radius:50%;background:var(--p-dot)}
.ambiance-quick{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px 8px;margin:22px auto 0;max-width:640px}
.ambiance-quick>span{width:100%;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--theme-muted)}
.ambiance-quick button{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 14px 0 6px;border-radius:999px;border:1.5px solid var(--theme-line);background:var(--theme-surface);color:var(--theme-ink);font:600 13px/1 inherit;cursor:pointer;transition:transform .2s}
.ambiance-quick button:hover{transform:translateY(-2px)}
.ambiance-quick button[aria-pressed=true]{border-color:var(--accent-text);box-shadow:var(--amb-shadow-hi)}
.ambiance-quick .ambiance-preview{width:30px;height:30px;border-radius:50%;border:0;background:linear-gradient(135deg,var(--p-btn) 0 50%,var(--p-dot) 50%)}
.ambiance-quick .ambiance-preview[data-preview=verre]{background:var(--p-bg)}
.accent-own{margin-top:8px}.accent-own summary{cursor:pointer;font-weight:600;min-height:44px;display:flex;align-items:center}
.accent-custom input[type=color]{width:52px;height:44px;padding:2px;border-radius:12px;border:1px solid var(--theme-line);background:transparent;cursor:pointer}

/* Collapsible desktop sidebar: icon rail, labels kept for screen readers. */
.sidebar-toggle{display:none}
@media (min-width:701px){
.sidebar{transition:width .25s ease,padding .25s ease}.workspace{transition:margin-left .25s ease}
.sidebar-toggle{display:grid;place-items:center;position:absolute;top:14px;right:10px;width:32px;height:32px;border-radius:50%;border:1px solid var(--theme-line,#ddd);background:var(--theme-surface,#fff);color:var(--theme-ink,#222);cursor:pointer;z-index:2}
.sidebar-toggle::before{content:"‹";font:700 18px/1 system-ui,sans-serif}
html[data-sidebar=mini] .sidebar-toggle::before{content:"›"}
html[data-sidebar=mini] .sidebar{width:76px!important;padding-left:12px!important;padding-right:12px!important;overflow-x:hidden}
html[data-sidebar=mini] .workspace{margin-left:76px!important}
html[data-sidebar=mini] .sidebar-toggle{position:static;margin:0 auto 12px}
html[data-sidebar=mini] .sidebar :is(.brand-sub,.nav-label,.nav-pill,.sidebar-footer,.offline-note){display:none}
html[data-sidebar=mini] .sidebar .brand{font-size:0;justify-content:center}
html[data-sidebar=mini] .sidebar .brand .brand-mark{font-size:30px}
html[data-sidebar=mini] .sidebar .nav-item{justify-content:center;padding-left:0;padding-right:0;font-size:0;gap:0}
html[data-sidebar=mini] .sidebar .nav-item>:first-child{font-size:16px}
html[data-sidebar=mini] .sidebar .nav-item>:not(:first-child){position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
html[data-sidebar=mini] .sidebar .nav-item{position:relative}
html[data-sidebar=mini] .sidebar .nav-item>:is(.nav-pill,.tiny-dot){display:none}
}
@media (min-width:701px) and (prefers-reduced-motion:reduce){.sidebar,.workspace{transition:none}}

/* Exercise success: a short celebration on the result, a glow (not a movement) on the next button. */
@keyframes amb-pop{0%{transform:scale(.96);opacity:.4}60%{transform:scale(1.02);opacity:1}100%{transform:none}}
@keyframes amb-burst{0%{opacity:.9;transform:scale(.3)}100%{opacity:0;transform:scale(1.6)}}
@keyframes amb-glow{0%,100%{box-shadow:0 0 0 0 transparent}50%{box-shadow:0 0 0 6px var(--accent-soft,#e2efe6)}}
.curr-feedback.curr-ok{position:relative;animation:amb-pop .5s cubic-bezier(.2,.8,.2,1);background:var(--accent-soft,#e2efe6);border-radius:14px;padding:12px 14px}
.curr-feedback.curr-ok::before{content:"";position:absolute;inset:-10px;pointer-events:none;border-radius:20px;background:radial-gradient(circle at 12% 30%,var(--accent-2,#f08a4b) 0 4px,transparent 5px),radial-gradient(circle at 88% 20%,var(--accent,#1f5e46) 0 4px,transparent 5px),radial-gradient(circle at 70% 90%,var(--accent-2,#f08a4b) 0 3px,transparent 4px),radial-gradient(circle at 25% 85%,var(--accent,#1f5e46) 0 3px,transparent 4px),radial-gradient(circle at 50% 5%,var(--accent-2,#f08a4b) 0 3px,transparent 4px);animation:amb-burst .9s ease-out forwards}
.curr-practice:has(.curr-ok) [data-curr=exercise-next]:not(:disabled){animation:amb-glow 1.6s ease-in-out 2}
@media (prefers-reduced-motion:reduce){.curr-feedback.curr-ok,.curr-feedback.curr-ok::before,.curr-practice:has(.curr-ok) [data-curr=exercise-next]{animation:none}.curr-feedback.curr-ok::before{display:none}}

/* Liquid glass: translucent panels over slow colour fields. */
html[data-ambiance=verre]{background:#0b0d1a;--blob1:#4f6bff;--blob2:#a85de8;--blob3:#e2557f;--blob4:#d98a4a;--glass-modal:rgba(20,22,42,.92)}
html[data-ambiance=verre]:not([data-mode=dark]){background:#f2f3f8;--blob1:#b8c4ff;--blob2:#e2c4ff;--blob3:#ffc4dc;--blob4:#ffd9b8;--glass-modal:rgba(255,255,255,.94)}
html[data-ambiance=verre] body.personalized,html[data-ambiance=verre] body.personalized :is(.workspace,#main){background:transparent!important}
html[data-ambiance=verre] body.personalized::before{content:"";position:fixed;inset:-20%;z-index:-1;pointer-events:none;background:radial-gradient(closest-side at 22% 24%,var(--blob1),transparent),radial-gradient(closest-side at 80% 30%,var(--blob2),transparent),radial-gradient(closest-side at 40% 82%,var(--blob3),transparent),radial-gradient(closest-side at 86% 86%,var(--blob4),transparent);opacity:.75;animation:amb-drift 36s ease-in-out infinite alternate}
@keyframes amb-drift{0%{transform:translate3d(0,0,0) rotate(0)}50%{transform:translate3d(6%,4%,0) rotate(8deg)}100%{transform:translate3d(-5%,6%,0) rotate(-6deg)}}
html[data-ambiance=verre]:not([data-glass-lite]) body.personalized :is(.sidebar,.topbar,.panel,.stat,.course-card,.resource-card,.sector-tile,.job-path,.syllabus-lesson,.course-collection,.download-row,.bottom-nav,.settings-card,.nunya-course-card,.ambiance-card,.daily-card){-webkit-backdrop-filter:blur(22px) saturate(180%);backdrop-filter:blur(22px) saturate(180%);border-color:rgba(255,255,255,.28)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.45),inset 0 -1px 0 rgba(255,255,255,.08),0 18px 40px -22px rgba(5,8,30,.55)}
html[data-ambiance=verre] body.personalized .modal{background:var(--glass-modal)!important}
html[data-ambiance=verre][data-glass-lite] body.personalized::before{animation:none;opacity:.45}''')
for mode, (surface, raised, soft) in GLASS_LITE.items():
    sel = 'html[data-ambiance=verre][data-glass-lite]' + ('[data-mode=dark]' if mode == 'dark' else ':not([data-mode=dark])')
    out.append(f'{sel}{{--theme-surface:{surface};--theme-raised:{raised};--theme-soft:{soft};--accent-soft:{soft};--mint:{soft}}}')
    sel2 = 'html[data-ambiance=verre]' + ('[data-mode=dark]' if mode == 'dark' else ':not([data-mode=dark])')
    out.append(f'@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){{{sel2}{{--theme-surface:{surface};--theme-raised:{raised};--theme-soft:{soft}}}}}')
out.append('@media (prefers-reduced-motion:reduce){html[data-ambiance=verre] body.personalized::before{animation:none}}')

Path('dist/ambiances.css').write_text('\n'.join(out) + '\n')
print('ambiances.css', len('\n'.join(out)), 'octets')

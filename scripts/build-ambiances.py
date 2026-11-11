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

# Redesign roles ("Forêt, latérite, soleil", docs/PLAN_REFONTE_VISUELLE.md). Phase 0: generated and checked, not used yet.
# warm = latérite (current step, progress, eyebrows); sun = fill only; hero = the one dark "moment" panel per page;
# line-strong = borders that must be seen (fields, lists, secondary buttons); dom-* = domain colour / tint (sec = warm).
ROLES2 = ['warm', 'warm-soft', 'warm-on', 'sun', 'sun-on', 'hero-bg', 'hero-ink', 'hero-accent', 'hero-muted', 'line-strong',
          'dom-web', 'dom-web-soft', 'dom-lang', 'dom-lang-soft', 'dom-data', 'dom-data-soft', 'dom-tools', 'dom-tools-soft', 'dom-algo', 'dom-algo-soft']
DOMAINS = ('web', 'lang', 'data', 'sec', 'tools', 'algo')
R = {
    'nunya': {
        'light': ['#a8401a', '#fbe7dc', '#ffffff', '#f2b134', '#1b1208', '#173f31', '#f7f1e6', '#f2b134', '#cfe6d8', '#7d8a80',
                  '#2f45a3', '#e6eafb', '#1f5e46', '#e2efe6', '#0b6670', '#ddf1f1', '#6b3a78', '#f1e4f4', '#7d5200', '#fbefd2'],
        'dark': ['#ff9f78', '#3d2419', '#1b1208', '#f2c35b', '#1b1208', '#1f3a2e', '#f7f1e6', '#f2c35b', '#cfe6d8', '#66766c',
                 '#a9b8ff', '#222b52', '#7fd3a8', '#1f3a2e', '#6fd0d6', '#10363a', '#e2b1ef', '#36223d', '#f2c35b', '#3a2d10']},
    'lagune': {
        'light': ['#b03c22', '#fde6de', '#ffffff', '#f5bd45', '#1a1206', '#0d2a5c', '#f2f7ff', '#6fe0d4', '#c3d4ee', '#73859c',
                  '#3442b0', '#e7e9fc', '#1c6b4f', '#ddf1e8', '#00687a', '#d8f0f3', '#6c3d8f', '#efe5f8', '#7a5300', '#fcf0d4'],
        'dark': ['#ff9a7a', '#3b2224', '#1a0c06', '#f7c85e', '#1a1206', '#102a55', '#eaf1fb', '#7ee6db', '#b9cbe8', '#5d6d87',
                 '#aab6ff', '#1f2852', '#86d9b2', '#15332a', '#5fd8e4', '#0d3340', '#d3b0ff', '#2e2350', '#f5c86a', '#3a2e12']},
    'kente': {
        'light': ['#b23a10', '#fde3cf', '#fffdf8', '#f4b400', '#1a1611', '#1a1611', '#fff6e5', '#f4b400', '#e7d9bb', '#8f8068',
                  '#283c9a', '#e5e8fa', '#1d6638', '#def0dc', '#07636a', '#d9efed', '#7a2c6c', '#f6e1ef', '#7a4f00', '#fbeac4'],
        'dark': ['#ff8f5e', '#3d2112', '#1a0c06', '#ffc83d', '#1a1611', '#3a2e14', '#fbf3e4', '#ffc83d', '#e0d2b6', '#74684f',
                 '#a7b4ff', '#232848', '#8ad7a0', '#183020', '#66d1cf', '#10322f', '#f0a6dd', '#3a1e33', '#ffc83d', '#3a2c0c']},
    'sauge': {
        'light': ['#94492f', '#f2e2d8', '#fbf8f3', '#d8b26a', '#20261e', '#2e3b31', '#f3eee7', '#e2c587', '#c8d2c5', '#828a7d',
                  '#45508a', '#e6e8f2', '#4a5e4f', '#e1e8df', '#2e6366', '#dceae8', '#694a70', '#ece3ec', '#735a24', '#f1e9d4'],
        'dark': ['#e0a080', '#352720', '#1a1e1a', '#dcc189', '#20261e', '#263228', '#ecefe8', '#e2c587', '#c2ccbf', '#646d63',
                 '#b2b9e0', '#262a3a', '#a9c7ae', '#263228', '#9fcfcb', '#1e3231', '#d6b7d8', '#33283a', '#dcc189', '#342d1d']},
    'prune': {
        'light': ['#a33d3a', '#f8e2df', '#ffffff', '#eeb050', '#2a1a29', '#3e2340', '#faf6f8', '#f5c36e', '#e2cbdc', '#8a7686',
                  '#3b43a0', '#e7e6f7', '#2e664c', '#e0eee6', '#135f6a', '#dcedef', '#6b3a78', '#f1e4f4', '#7b501a', '#f6ead6'],
        'dark': ['#ff9c8a', '#3b2024', '#151015', '#f3c068', '#2a1a29', '#352335', '#f4ecf2', '#f3c068', '#dcc6d6', '#74636f',
                 '#b3b8ff', '#282647', '#8fd3b0', '#1d3128', '#79cfd8', '#142f34', '#e7b1f2', '#3a2240', '#f3c068', '#3a2a14']},
    'nuit': {
        'dark': ['#ffa173', '#3a2418', '#1b1206', '#ffc95c', '#1b1206', '#1d2a47', '#eef2f9', '#ffc95c', '#bfcbe2', '#5c6a84',
                 '#a9beff', '#1f2a4d', '#86d6ad', '#142e27', '#6ccfe0', '#0f2f3b', '#d7b2ff', '#2b2350', '#ffcb6b', '#362b14']},
    'verre': {
        'light': ['#a63a1d', 'rgba(255,220,204,.72)', '#ffffff', '#f2b134', '#1b1208', 'rgba(14,16,34,.86)', '#ffffff', '#ffd27a', '#d6d9f0', 'rgba(14,16,34,.5)',
                  '#2f3fc0', 'rgba(227,231,255,.8)', '#1d6447', 'rgba(214,240,226,.8)', '#0a6270', 'rgba(212,240,242,.8)', '#6a3196', 'rgba(238,226,252,.8)', '#7a4e00', 'rgba(252,238,206,.8)'],
        'dark': ['#ffbc9f', 'rgba(255,140,100,.1)', '#1b1208', '#f6c560', '#1b1208', 'rgba(8,10,28,.72)', '#ffffff', '#ffd27a', '#d6d9f0', 'rgba(255,255,255,.42)',
                 '#b9c3ff', 'rgba(120,140,255,.18)', '#8fe0b8', 'rgba(80,200,140,.16)', '#7fdde6', 'rgba(60,190,200,.16)', '#dcb8ff', 'rgba(170,110,255,.18)', '#ffd27a', 'rgba(240,180,60,.16)']},
}
# Opaque stand-ins for Verre's translucent roles ("Verre léger" and browsers without backdrop-filter).
GLASS_LITE2 = {'light': {'warm-soft': '#fde6dc', 'hero-bg': '#161a3a', 'dom-web-soft': '#e6e9ff', 'dom-lang-soft': '#dcf1e6', 'dom-data-soft': '#dbf1f3', 'dom-tools-soft': '#efe5fc', 'dom-algo-soft': '#fcefd2'},
               'dark': {'warm-soft': '#3a2430', 'hero-bg': '#0e1024', 'dom-web-soft': '#262c5a', 'dom-lang-soft': '#1a3a33', 'dom-data-soft': '#173a45', 'dom-tools-soft': '#2f2550', 'dom-algo-soft': '#3a3120'}}
# Shared scales, the same in every ambiance: type (ratio 1.25, the three largest fluid), spacing and radii.
SCALE = {'fs-1': '12px', 'fs-2': '14px', 'fs-3': '16px', 'fs-4': '20px', 'fs-5': 'clamp(22px,1.27rem + .47vw,25px)',
         'fs-6': 'clamp(26px,1.45rem + .78vw,31px)', 'fs-7': 'clamp(31px,1.66rem + 1.25vw,39px)',
         'sp-1': '4px', 'sp-2': '8px', 'sp-3': '12px', 'sp-4': '16px', 'sp-5': '24px', 'sp-6': '32px', 'sp-7': '48px', 'sp-8': '64px',
         'r-s': '8px', 'r-m': '14px', 'r-l': '24px', 'r-pill': '999px'}
# --accent-2 still fails 3:1 as a fill on light surfaces; tolerated at these exact values until phase 1 makes it an alias of --warm.
ACCENT2_KNOWN = {('nunya', 'light'): '#f08a4b', ('lagune', 'light'): '#19b3a6', ('kente', 'light'): '#f4b400', ('sauge', 'light'): '#b7a792', ('prune', 'light'): '#e58ba0'}


def roles2(name, mode):
    d = dict(zip(ROLES2, R[name][mode]))
    d['dom-sec'], d['dom-sec-soft'] = d['warm'], d['warm-soft']
    return {k: d[k] for k in ROLES2[:10] + [f'dom-{x}{s}' for x in DOMAINS for s in ('', '-soft')]}


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


def worlds(name, mode):
    """Yield (roles, redesign roles, page, field, card surface) as drawn. Verre: over its base colour and each colour field
    (page text judged on the base colour, as above), then once more with its opaque fallbacks."""
    d, r = dict(zip(ROLES, A[name][mode])), roles2(name, mode)
    if name != 'verre':
        yield d, r, d['bg'], d['bg'], d['surface']
        return
    base = GLASS_GROUNDS[mode][0]
    for g in GLASS_GROUNDS[mode]:
        yield d, r, base, g, over(d['surface'], g)
    lite = dict(r, **GLASS_LITE2[mode])
    lite['dom-sec-soft'] = lite['warm-soft']
    yield d, lite, base, base, GLASS_LITE[mode][0]


# Redesign gate: text 4.5:1, non-text (borders, fills against their track) 3:1, in every ambiance and mode.
problems, mins, tolerated = [], {}, []


def need(label, floor, fg, bg, where):
    v = ratio(over(fg, bg), bg)
    if label not in mins or v < mins[label][1]:
        mins[label] = (floor, v, where)
    if v < floor:
        problems.append(f'{where}: {label} {fg} sur {bg} = {v:.2f} (minimum {floor})')


for name, modes in R.items():
    for mode in modes:
        at = f'{name}/{mode}'
        for d, r, page, field, s in worlds(name, mode):
            need('warm-on/warm', 4.5, r['warm-on'], r['warm'], at)
            need('warm/surface', 4.5, r['warm'], s, at)
            need('warm/bg', 4.5, r['warm'], page, at)
            need('warm/warm-soft', 4.5, r['warm'], over(r['warm-soft'], s), at)
            need('sun-on/sun', 4.5, r['sun-on'], r['sun'], at)
            for k in ('ink', 'accent', 'muted'):
                need(f'hero-{k}/hero-bg', 4.5, r[f'hero-{k}'], over(r['hero-bg'], field), at)
            need('line-strong/surface', 3, r['line-strong'], s, at)
            need('line-strong/bg', 3, r['line-strong'], page, at)
            need('warm/track (line)', 3, r['warm'], over(d['line'], s), at)
            for x in DOMAINS:
                need('dom-X/dom-X-soft', 4.5, r[f'dom-{x}'], over(r[f'dom-{x}-soft'], s), f'{at} {x}')
                need('dom-X/surface', 4.5, r[f'dom-{x}'], s, f'{at} {x}')
            if ACCENT2_KNOWN.get((name, mode)) == d['accent2']:
                tolerated.append(f'{at} {ratio(d["accent2"], s):.2f}')
            else:
                need('accent-2/surface', 3, d['accent2'], s, at)
print('Contrastes (minimum, seuil, pire cas) :')
for label, (floor, v, where) in mins.items():
    print(f'  {label:<22} {v:5.2f}  >= {floor:<3}  {where}')
print('  accent-2/surface tolérés jusqu\'à la phase 1 : ' + ', '.join(dict.fromkeys(tolerated)))
if problems:
    raise SystemExit('Contraste insuffisant (rôles de la refonte) :\n' + '\n'.join(dict.fromkeys(problems)))


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
out.append('/* Redesign roles and shared scales (phase 0): generated and contrast-checked, not used by any rule yet. */')
out.append(':root{' + ';'.join(f'--{k}:{v}' for k, v in SCALE.items()) + '}')
for name, modes in R.items():
    for mode in modes:
        sel = f'html[data-ambiance={name}]' + ('[data-mode=dark]' if mode == 'dark' and name != 'nuit' else '')
        out.append(sel + '{' + ';'.join(f'--{k}:{v}' for k, v in roles2(name, mode).items()) + '}')
# Before the JS sets data-ambiance (first paint) and in the custom-colour mode (no data-ambiance), use Nunya's roles.
out.append('html:not([data-ambiance]){' + ';'.join(f'--{k}:{v}' for k, v in roles2('nunya', 'light').items()) + '}')
out.append('html:not([data-ambiance])[data-mode=dark]{' + ';'.join(f'--{k}:{v}' for k, v in roles2('nunya', 'dark').items()) + '}')

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
html[data-sidebar=mini] .sidebar :is(.nav-item,.help-button){justify-content:center;padding-left:0;padding-right:0;font-size:0;gap:0;width:100%}
html[data-sidebar=mini] .sidebar :is(.nav-item,.help-button)>:first-child{font-size:16px}
html[data-sidebar=mini] .sidebar :is(.nav-item,.help-button)>:not(:first-child){position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
html[data-sidebar=mini] .sidebar :is(.nav-item,.help-button){position:relative}
html[data-sidebar=mini] .sidebar .sidebar-bottom{padding-left:0;padding-right:0;align-items:center}
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
for mode, fallback in GLASS_LITE2.items():
    lite = ';'.join(f'--{k}:{v}' for k, v in dict(fallback, **{'dom-sec-soft': fallback['warm-soft']}).items())
    sel = 'html[data-ambiance=verre][data-glass-lite]' + ('[data-mode=dark]' if mode == 'dark' else ':not([data-mode=dark])')
    sel2 = 'html[data-ambiance=verre]' + ('[data-mode=dark]' if mode == 'dark' else ':not([data-mode=dark])')
    out.append(f'{sel}{{{lite}}}')
    out.append(f'@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){{{sel2}{{{lite}}}}}')
out.append('@media (prefers-reduced-motion:reduce){html[data-ambiance=verre] body.personalized::before{animation:none}}')

Path('dist/ambiances.css').write_text('\n'.join(out) + '\n')
print('ambiances.css', len('\n'.join(out)), 'octets')

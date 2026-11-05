# Git lesson asset contract (local, unpublished work)

Author only the assigned `content/fr/git-bases/mN/` folders. Each lesson is `.md` JSON frontmatter plus `## Explication pas à pas` (350–650 original French words) and two `## Exemple guidé` sections. Code fences are illustrative CLI references, clearly not a simulated native terminal. The actual learning lab uses buttons backed by isomorphic-git and a private IndexedDB filesystem. Draft, reviewer:null, date 2026-11-04.

Frontmatter: id `git-m1-01`, course `git-bases`, module `m1`, order1..12, minutes20, title_fr, prerequisites previous lesson ID, outcomes[2+], idea_fr, analogy_fr, examples[{title_fr,steps_fr:[3+]}] (2 examples), common_mistakes[{error,why_fr,fix_fr}](2+), glossary[{term,definition}](2+), recap_fr[3], quiz[{id,question,options,answer,explanation}](3), sources[{title,url,scope,last_checked}], status:brouillon,reviewer:null. Twelve lessons, 3 per module. Do not say a successful GitHub publication is simulated or offline.

Each lesson has `.activities.json`: FOUR activities, >=2 are real Git lab goals. Types:
- `lab`: {id,title_fr,instruction_fr,fixture,goal,hints:[3],explanation_fr}. IDs git-mN-NN-a1...a4.
- `qcm`: same title/instruction/explanation/hints, plus question,options,answer; no fixture/goal. Can use at most2 per lesson.

Fixtures (each real repository, rebuilt by reset):
- `empty`: an empty folder, no `.git`, no files.
- `untracked`: initialized branch main; `notes.txt` contains `Bonjour\n`, untracked.
- `first`: main has one commit `Départ` with tracked notes.txt=`Bonjour\n` and README.md=`# Atelier\n`.
- `two`: same as first, plus second main commit `Suite` changing notes.txt=`Bonjour Nunya\n`.
- `modified`: first plus unstaged notes.txt=`À compléter\n`.
- `staged`: first plus staged notes.txt=`Version indexée\n`, then unstaged current file=`Version de travail\n`.
- `ignored`: first plus `.gitignore` contents `cache/\n` committed and untracked `cache/temp.txt`=`temporaire\n`.
- `feature`: first, branch idee checked out, one additional commit `Idée` adding projet.txt=`Projet\n`; main remains first.
- `fast-forward`: same as feature but main checked out; merging idee fast-forwards safely.
- `conflict`: first, idee has commit `Idée` changing notes.txt=`Version idée\n`; main has commit `Version principale` changing notes.txt=`Version main\n`. Both diverged and notes.txt conflicts.

Lab UI operations: initialize repository (branch main); write file (path + text, newlines can be entered); stage path; unstage path (remove from index only, not working file); delete working file; commit(message); create branch(name) (without checkout); checkout branch(name), force-restore chosen file from HEAD; merge branch(name), inspect status/history. Real merge conflicts leave markers; after editing/staging commit records two parents. Only virtual files, no host filesystem/network. `.gitignore` can be edited. Main/current branch and working files are visible.

Supported goal fields (AND; choose2–4 specific checks):
{initialized:true, branch:'main', files:{'notes.txt':'Exact text\n'}, absentFiles:['path'], statuses:{'notes.txt':'added'}, headFiles:{'notes.txt':'committed content\n'}, branches:['main','idee'], minCommits:2, headMessage:'exact message', clean:true, ignored:['cache/temp.txt'], mergeParents:2}
Statuses use git.status strings: untracked '*added', newly staged 'added', changed unstaged '*modified', staged changed 'modified', staged+working changed '*modified' (prefer goals on headFiles and files instead of ambiguous staging states). For exact index comparisons use `indexFiles:{path:content}`. For ignored tracking clarify already-tracked files are not untracked by adding a pattern. Never demand unknown UI operations. A goal should verify real repository properties rather than a user saying they did it.

Curriculum:
m1 (orders1..3): fichiers/dépôt/Git vs GitHub; working tree/index; commit/message/snapshot.
m2 (4..6): historique et différences; restaurer sans confondre index/HEAD; fichiers ignorés et données à exclure.
m3 (7..9): créer/basculer branches; développer isolément; fusion rapide/ancêtre commun.
m4 (10..12): conflit et résolution; GitHub dépôt/PR/revue (2 real local preparation labs +2 honest online workflow qcm); project one clean coherent repo with branch merged, useful messages, README, plus explanation.

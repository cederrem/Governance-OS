'use client';

import { useMemo, useState } from 'react';
import { Bell, Bot, CheckCircle2, Clock3, FileText, Search, ShieldCheck, Sparkles, UploadCloud } from 'lucide-react';
import { entities, importMethods, recentActivities, themes, aiValidationProposals, assistantQuestions, type VigilanceLevel } from '@/lib/governance-data';

const vigilanceConfig: Record<VigilanceLevel, { label: string; dot: string; className: string }> = {
  green: { label: 'Maîtrisé', dot: '🟢', className: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
  yellow: { label: 'À surveiller', dot: '🟡', className: 'border-amber-200 bg-amber-50 text-amber-800' },
  red: { label: 'Critique', dot: '🔴', className: 'border-red-200 bg-red-50 text-red-800' },
};

const metrics = [
  { label: 'Entités suivies', value: entities.length.toString(), detail: 'Holding, participations et futures cibles' },
  { label: 'Sujets critiques', value: '1', detail: 'Toujours reliés à une mémoire chronologique' },
  { label: 'Actions ouvertes', value: '8', detail: 'Seulement les actions stratégiques' },
  { label: 'Validation IA', value: '< 1 min', detail: 'Accepter, modifier ou ignorer' },
];

const markdownExample = `# Réunion FSM - 28 juin 2026

## Décisions
- Sécuriser le plan de trésorerie Airbus.
- Prioriser les recrutements production.

## Actions
- Claire: mettre à jour le cash forecast pour le 5 juillet.
- Marc: confirmer le planning fournisseurs.

## Risques
- Retard de livraison sur le lot A320.
- Tension de trésorerie à surveiller.`;

function parseMarkdownImport(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const title = lines.find((line) => line.trim().startsWith('#'))?.replace(/^#+\s*/, '').trim() || 'Compte-rendu sans titre';
  const bullets = lines
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line))
    .map((line) => line.replace(/^[-*]\s+/, ''));
  const headings = lines
    .map((line) => line.trim())
    .filter((line) => /^#{2,6}\s+/.test(line))
    .map((line) => line.replace(/^#{2,6}\s+/, ''));

  return {
    title,
    headings,
    decisions: bullets.filter((bullet) => /décision|décider|sécuriser|prioriser|valider/i.test(bullet)),
    actions: bullets.filter((bullet) => /:|pour le|avant le|action|mettre à jour|confirmer/i.test(bullet)),
    risks: bullets.filter((bullet) => /risque|retard|tension|alerte|surveiller/i.test(bullet)),
  };
}

export default function Home() {
  const [markdownImport, setMarkdownImport] = useState('');
  const importedReport = useMemo(() => parseMarkdownImport(markdownImport), [markdownImport]);
  const hasMarkdownImport = markdownImport.trim().length > 0;
  const allSubjects = entities.flatMap((entity) => entity.topSubjects.map((subject) => ({ ...subject, entity: entity.name })));
  const openActions = allSubjects.flatMap((subject) =>
    subject.actions
      .filter((action) => action.status !== 'Terminée')
      .map((action) => ({ ...action, subject: subject.name, entity: subject.entity, vigilance: subject.vigilance })),
  );

  return (
    <main className="min-h-screen bg-[#f7f5f1] text-slate-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-10 -mx-4 border-b border-slate-200/80 bg-[#f7f5f1]/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">PF Invest Governance OS</p>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">Mémoire vivante de gouvernance</h1>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <a className="rounded-full bg-slate-950 px-4 py-2 font-medium text-white" href="#import">Importer Plaud</a>
              <a className="rounded-full border border-slate-300 bg-white px-4 py-2 font-medium" href="#preparation">Préparer réunion</a>
            </div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-slate-100">
                  <Sparkles className="h-4 w-4" /> Les utilisateurs parlent. Plaud rédige. L&apos;application mémorise.
                </span>
                <h2 className="text-4xl font-semibold leading-tight sm:text-6xl">Vue exécutive du groupe en moins de deux minutes.</h2>
                <p className="text-lg leading-8 text-slate-300">
                  Une page d&apos;accueil centrée sur les entités, les sujets de vigilance, les décisions et les actions stratégiques — sans transformer l&apos;outil en CRM, logiciel projet ou prise de notes.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Principe IA</p>
                <p className="mt-2">L&apos;IA propose les rattachements, créations et changements de vigilance. L&apos;humain valide avant toute mise à jour.</p>
              </div>
            </div>
          </div>
          <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-5 w-5" />
              <h2 className="font-semibold">Recherche instantanée</h2>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">Sujet, décision, action, personne, entité, client, fournisseur...</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {themes.map((theme) => (
                <span key={theme} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                  {theme}
                </span>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className="mt-2 text-3xl font-semibold">{metric.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{metric.detail}</p>
            </article>
          ))}
        </section>

        <section id="dashboard" className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Tableau de bord</p>
              <h2 className="text-2xl font-semibold">Cartes entités</h2>
            </div>
            <span className="hidden rounded-full bg-white px-4 py-2 text-sm text-slate-500 shadow-sm sm:inline-flex">Mobile first · lecture prioritaire</span>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {entities.map((entity) => {
              const vigilance = vigilanceConfig[entity.vigilance];
              return (
                <article key={entity.name} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 font-semibold text-white">{entity.logo}</div>
                      <div>
                        <h3 className="text-xl font-semibold">{entity.name}</h3>
                        <p className="text-sm text-slate-500">{entity.type} · DG {entity.generalManager}</p>
                      </div>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-sm font-medium ${vigilance.className}`}>
                      {vigilance.dot} {vigilance.label}
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-slate-600">{entity.aiSummary}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Sujets clés</p>
                      <div className="space-y-2">
                        {entity.topSubjects.map((subject) => (
                          <div key={subject.name} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-medium">{subject.name}</p>
                              <span>{vigilanceConfig[subject.vigilance].dot}</span>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">{subject.theme} · {subject.type}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Actions ouvertes</p>
                      <div className="space-y-2">
                        {entity.topSubjects.flatMap((subject) => subject.actions).slice(0, 3).map((action) => (
                          <div key={`${entity.name}-${action.description}`} className="rounded-2xl border border-slate-100 p-3 text-sm">
                            <p className="font-medium">{action.description}</p>
                            <p className="mt-1 text-xs text-slate-500">{action.owner} · {action.dueDate} · {action.status}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-slate-100 px-3 py-1">Dernière réunion : {entity.lastMeeting}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">Prochaine : {entity.nextMeeting}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Panel title="Vision groupe" icon={<ShieldCheck className="h-5 w-5" />}>
            <List items={recentActivities} />
          </Panel>
          <Panel title="Actions en retard / à risque" icon={<Clock3 className="h-5 w-5" />}>
            <div className="space-y-3">
              {openActions.slice(0, 4).map((action) => (
                <div key={`${action.entity}-${action.description}`} className="rounded-2xl bg-slate-50 p-3 text-sm">
                  <p className="font-medium">{action.description}</p>
                  <p className="mt-1 text-slate-500">{action.entity} · {action.subject} · {action.dueDate}</p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Notifications" icon={<Bell className="h-5 w-5" />}>
            <List items={['Compte-rendu importé', 'Nouveau sujet proposé', 'Action proche échéance', 'Commentaire ajouté', 'Sujet devenu critique']} />
          </Panel>
        </section>

        <section id="import" className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <Panel title="Import comptes-rendus" icon={<UploadCloud className="h-5 w-5" />}>
            <p className="mb-4 text-sm leading-6 text-slate-600">Le compte-rendu Plaud reste la source de vérité. L&apos;application extrait puis propose des liens avec la mémoire existante.</p>
            <ol className="space-y-2">
              {importMethods.map((method, index) => (
                <li key={method} className={`flex items-center gap-3 rounded-2xl border p-3 text-sm ${method === 'Copier / Coller Markdown' ? 'border-slate-950 bg-slate-50 font-semibold' : 'border-slate-100'}`}>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">{index + 1}</span>
                  {method}
                </li>
              ))}
            </ol>
            <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">Copier / Coller Markdown</p>
                  <p className="text-sm text-slate-500">Collez un compte-rendu Markdown pour générer immédiatement une pré-analyse.</p>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-medium transition hover:bg-slate-100"
                  onClick={() => setMarkdownImport(markdownExample)}
                >
                  Charger un exemple
                </button>
              </div>
              <textarea
                aria-label="Compte-rendu Markdown à importer"
                className="min-h-48 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
                placeholder="# Réunion...\n\n## Décisions\n- ...\n\n## Actions\n- ..."
                value={markdownImport}
                onChange={(event) => setMarkdownImport(event.target.value)}
              />
              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                <ImportStat label="Décisions" value={hasMarkdownImport ? importedReport.decisions.length : 0} />
                <ImportStat label="Actions" value={hasMarkdownImport ? importedReport.actions.length : 0} />
                <ImportStat label="Risques" value={hasMarkdownImport ? importedReport.risks.length : 0} />
              </div>
            </div>
          </Panel>
          <Panel title="Validation IA" icon={<CheckCircle2 className="h-5 w-5" />}>
            {hasMarkdownImport && (
              <div className="mb-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-900">Compte-rendu Markdown détecté : {importedReport.title}</p>
                <p className="mt-1 text-sm text-emerald-800">Sections reconnues : {importedReport.headings.length ? importedReport.headings.join(', ') : 'aucune section explicite'}.</p>
              </div>
            )}
            <div className="mb-4 grid gap-3 sm:grid-cols-3">
              {(hasMarkdownImport
                ? [`${importedReport.headings.length} sections analysées`, `${importedReport.actions.length} actions proposées`, `${importedReport.risks.length} risques détectés`]
                : ['14 sujets analysés', '12 reconnus', '2 nouveaux proposés']
              ).map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 p-3 text-center text-sm font-medium">{item}</div>
              ))}
            </div>
            <div className="space-y-3">
              {aiValidationProposals.map((proposal) => (
                <div key={`${proposal.entity}-${proposal.label}`} className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{proposal.label}</p>
                      <p className="text-sm text-slate-500">{proposal.entity} · {proposal.type} · {proposal.action}</p>
                    </div>
                    <div className="flex gap-2 text-xs font-medium">
                      <button className="rounded-full bg-slate-950 px-3 py-2 text-white">Accepter</button>
                      <button className="rounded-full border border-slate-200 px-3 py-2">Modifier</button>
                      <button className="rounded-full border border-slate-200 px-3 py-2">Ignorer</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section id="preparation" className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Panel title="Préparation automatique de réunion" icon={<FileText className="h-5 w-5" />}>
            <div className="rounded-3xl bg-slate-950 p-5 text-white">
              <p className="text-sm text-slate-300">Support proposé pour la prochaine réunion FSM</p>
              <h3 className="mt-2 text-2xl font-semibold">Trésorerie, Airbus et actions ouvertes</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {['Résumé IA de l entité', 'Sujets critiques', 'Décisions depuis la dernière réunion', 'Actions ouvertes', 'Commentaires récents', 'Compte-rendu précédent'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-sm text-slate-200">{item}</div>
                ))}
              </div>
            </div>
          </Panel>
          <Panel title="Mémoire chronologique" icon={<Clock3 className="h-5 w-5" />}>
            {entities[1].topSubjects[1].timeline.map((event) => (
              <div key={event.date} className="relative border-l border-slate-200 pb-5 pl-5 last:pb-0">
                <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-slate-950" />
                <p className="font-semibold">{event.date}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{event.entry}</p>
              </div>
            ))}
          </Panel>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Panel title="Assistant IA en lecture seule" icon={<Bot className="h-5 w-5" />}>
            <p className="mb-4 text-sm leading-6 text-slate-600">L&apos;assistant répond uniquement à partir des données de l&apos;application et ne modifie jamais la base.</p>
            <div className="grid gap-2">
              {assistantQuestions.map((question) => (
                <button key={question} className="rounded-2xl border border-slate-200 p-3 text-left text-sm transition hover:bg-slate-50">{question}</button>
              ))}
            </div>
          </Panel>
          <Panel title="Architecture prévue" icon={<Sparkles className="h-5 w-5" />}>
            <div className="grid gap-2 sm:grid-cols-2">
              {['Next.js + React + TypeScript', 'Tailwind CSS + shadcn/ui', 'Supabase Auth, DB, Storage', 'OpenAI API avec validation humaine', 'React Query pour les données', 'Recharts pour les indicateurs', 'Connecteurs Plaud, Zapier, Make', 'Exports Word, PDF, Excel'].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 p-3 text-sm">{item}</div>
              ))}
            </div>
          </Panel>
        </section>
      </section>
    </main>
  );
}

function ImportStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white p-3 text-center">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{label}</p>
    </div>
  );
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </article>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm text-slate-600">
      {items.map((item) => (
        <li key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-3">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-950" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

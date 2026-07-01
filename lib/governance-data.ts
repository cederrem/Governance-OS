export type VigilanceLevel = 'green' | 'yellow' | 'red';
export type EntityType = 'Holding' | 'Participation' | 'Cible M&A' | 'Autre';
export type Theme =
  | 'Sécurité'
  | 'Finance'
  | 'Ressources Humaines'
  | 'Commerce'
  | 'Production'
  | 'Supply Chain'
  | 'IT'
  | 'Autres';

export type StrategicAction = {
  description: string;
  owner: string;
  dueDate: string;
  priority: 'Haute' | 'Normale' | 'Basse';
  status: 'À faire' | 'En cours' | 'Terminée';
};

export type Subject = {
  name: string;
  type: string;
  theme: Theme;
  vigilance: VigilanceLevel;
  timeline: { date: string; entry: string }[];
  decisions: string[];
  actions: StrategicAction[];
  comments: string[];
  meetings: string[];
};

export type Entity = {
  name: string;
  type: EntityType;
  logo: string;
  generalManager: string;
  aiSummary: string;
  vigilance: VigilanceLevel;
  lastMeeting: string;
  nextMeeting: string;
  topSubjects: Subject[];
};

export const themes: Theme[] = [
  'Sécurité',
  'Finance',
  'Ressources Humaines',
  'Commerce',
  'Production',
  'Supply Chain',
  'IT',
  'Autres',
];

export const importMethods = [
  'API Plaud',
  'Zapier',
  'Make',
  'Import PDF',
  'Import DOCX',
  'Copier / Coller Markdown',
];

export const entities: Entity[] = [
  {
    name: 'PF Invest',
    type: 'Holding',
    logo: 'PF',
    generalManager: 'Actionnaires',
    vigilance: 'yellow',
    lastMeeting: '24 juin 2026',
    nextMeeting: '1 juillet 2026',
    aiSummary:
      'La holding consolide la vision groupe, arbitre les investissements et suit les risques transverses. Les priorités portent sur la trésorerie, les recrutements clés et la préparation des prochaines opérations de croissance externe.',
    topSubjects: [
      {
        name: 'Vision cash groupe',
        type: 'Gouvernance',
        theme: 'Finance',
        vigilance: 'yellow',
        timeline: [
          { date: 'Aujourd’hui', entry: 'Centralisation des prévisions de trésorerie hebdomadaires.' },
          { date: '15 juin', entry: 'Alignement sur un format commun de reporting financier.' },
        ],
        decisions: ['Consolider le cash forecast groupe chaque vendredi.'],
        actions: [
          { description: 'Finaliser le modèle de reporting cash', owner: 'Claire', dueDate: '5 juillet', priority: 'Haute', status: 'En cours' },
        ],
        comments: ['Les banques demandent une vision consolidée avant le comité crédit.'],
        meetings: ['Réunion holding du 24 juin'],
      },
      {
        name: 'Pipeline M&A',
        type: 'Croissance externe',
        theme: 'Autres',
        vigilance: 'green',
        timeline: [{ date: '20 juin', entry: 'Deux cibles industrielles qualifiées pour analyse.' }],
        decisions: ['Lancer une première revue financière sur la cible prioritaire.'],
        actions: [{ description: 'Préparer la note cible A', owner: 'Marc', dueDate: '12 juillet', priority: 'Normale', status: 'À faire' }],
        comments: ['Dossier encore confidentiel.'],
        meetings: ['Point M&A du 20 juin'],
      },
    ],
  },
  {
    name: 'FSM',
    type: 'Participation',
    logo: 'FS',
    generalManager: 'Sophie Martin',
    vigilance: 'red',
    lastMeeting: '25 juin 2026',
    nextMeeting: '2 juillet 2026',
    aiSummary:
      'FSM reste sous vigilance élevée à cause de tensions sur la trésorerie et de retards de livraison. La dynamique commerciale est positive, mais la production doit sécuriser les engagements pris auprès des grands comptes.',
    topSubjects: [
      {
        name: 'Trésorerie court terme',
        type: 'Risque',
        theme: 'Finance',
        vigilance: 'red',
        timeline: [
          { date: 'Aujourd’hui', entry: 'Le besoin de financement augmente avec les retards de règlement.' },
          { date: '18 juin', entry: 'La banque demande un plan de cash à 13 semaines.' },
          { date: '5 juin', entry: 'Première alerte sur le niveau de BFR.' },
        ],
        decisions: ['Demander un rendez-vous bancaire avant la fin de semaine.'],
        actions: [
          { description: 'Envoyer le plan de trésorerie 13 semaines', owner: 'Sophie Martin', dueDate: '3 juillet', priority: 'Haute', status: 'En cours' },
          { description: 'Relancer les trois principaux clients en retard', owner: 'Karim', dueDate: '4 juillet', priority: 'Haute', status: 'À faire' },
        ],
        comments: ['Le client principal annonce un paiement partiel cette semaine.'],
        meetings: ['Réunion FSM du 25 juin', 'Réunion FSM du 18 juin'],
      },
      {
        name: 'Client Airbus',
        type: 'Compte stratégique',
        theme: 'Commerce',
        vigilance: 'yellow',
        timeline: [
          { date: 'Aujourd’hui', entry: 'Le contrat est signé mais le jalon qualité reste ouvert.' },
          { date: '15 juin', entry: 'Le client demande une nouvelle offre.' },
          { date: '2 juin', entry: 'Présentation commerciale.' },
        ],
        decisions: ['Prioriser le jalon qualité avant lancement série.'],
        actions: [{ description: 'Confirmer le plan qualité Airbus', owner: 'Karim', dueDate: '8 juillet', priority: 'Haute', status: 'En cours' }],
        comments: ['Le client confirme son intérêt pour une extension de périmètre.'],
        meetings: ['Réunion FSM du 25 juin'],
      },
    ],
  },
  {
    name: 'SMTG',
    type: 'Participation',
    logo: 'SM',
    generalManager: 'Thomas Gérard',
    vigilance: 'yellow',
    lastMeeting: '26 juin 2026',
    nextMeeting: '3 juillet 2026',
    aiSummary:
      'SMTG progresse sur la modernisation industrielle. Les points de vigilance concernent l ERP, les délais fournisseurs et la disponibilité des équipes pour absorber les chantiers en parallèle.',
    topSubjects: [
      {
        name: 'Migration ERP',
        type: 'Transformation',
        theme: 'IT',
        vigilance: 'yellow',
        timeline: [
          { date: 'Aujourd’hui', entry: 'Le cadrage est validé, les données articles restent à nettoyer.' },
          { date: '12 juin', entry: 'Choix de l intégrateur confirmé.' },
        ],
        decisions: ['Démarrer le pilote sur le périmètre achats.'],
        actions: [{ description: 'Nettoyer le référentiel articles prioritaire', owner: 'Thomas Gérard', dueDate: '10 juillet', priority: 'Haute', status: 'En cours' }],
        comments: ['Risque de charge interne sur juillet.'],
        meetings: ['Réunion SMTG du 26 juin'],
      },
      {
        name: 'Nouvelle ligne de production',
        type: 'Investissement',
        theme: 'Production',
        vigilance: 'green',
        timeline: [{ date: '19 juin', entry: 'Budget d investissement validé sous réserve du planning fournisseur.' }],
        decisions: ['Valider le budget d investissement de la ligne 2.'],
        actions: [{ description: 'Obtenir le planning fournisseur ferme', owner: 'Nadia', dueDate: '9 juillet', priority: 'Normale', status: 'À faire' }],
        comments: ['Capacité attendue +18 %.'],
        meetings: ['Réunion SMTG du 19 juin'],
      },
    ],
  },
  {
    name: 'Stimy',
    type: 'Participation',
    logo: 'ST',
    generalManager: 'Nadia Petit',
    vigilance: 'green',
    lastMeeting: '27 juin 2026',
    nextMeeting: '4 juillet 2026',
    aiSummary:
      'Stimy conserve une trajectoire saine. Les sujets principaux sont commerciaux et RH, avec un recrutement clé à sécuriser pour soutenir la croissance du second semestre.',
    topSubjects: [
      {
        name: 'Recrutement Directeur Commercial',
        type: 'Organisation',
        theme: 'Ressources Humaines',
        vigilance: 'yellow',
        timeline: [
          { date: 'Aujourd’hui', entry: 'Le candidat favori demande un délai de réflexion.' },
          { date: '16 juin', entry: 'Deux finalistes rencontrés par les actionnaires.' },
        ],
        decisions: ['Faire une offre ajustée au candidat prioritaire.'],
        actions: [{ description: 'Envoyer la proposition finale', owner: 'Nadia Petit', dueDate: '2 juillet', priority: 'Haute', status: 'À faire' }],
        comments: ['Le candidat refuse la clause de mobilité initiale.'],
        meetings: ['Réunion Stimy du 27 juin'],
      },
      {
        name: 'Développement grands comptes',
        type: 'Croissance',
        theme: 'Commerce',
        vigilance: 'green',
        timeline: [{ date: '21 juin', entry: 'Trois prospects qualifiés entrent en phase offre.' }],
        decisions: ['Concentrer les efforts sur les comptes à marge supérieure.'],
        actions: [{ description: 'Mettre à jour les offres prioritaires', owner: 'Équipe commerce', dueDate: '11 juillet', priority: 'Normale', status: 'En cours' }],
        comments: ['Bon niveau de marge sur le pipeline actuel.'],
        meetings: ['Réunion Stimy du 21 juin'],
      },
    ],
  },
];

export const aiValidationProposals = [
  { label: 'Trésorerie court terme', entity: 'FSM', type: 'Sujet reconnu', action: 'Mettre à jour vigilance rouge' },
  { label: 'Client Airbus', entity: 'FSM', type: 'Sujet reconnu', action: 'Ajouter une décision qualité' },
  { label: 'Contrat énergie 2027', entity: 'SMTG', type: 'Nouveau sujet proposé', action: 'Créer dans Finance' },
  { label: 'Recrutement Directeur Commercial', entity: 'Stimy', type: 'Action modifiée', action: 'Décaler échéance au 2 juillet' },
];

export const recentActivities = [
  'Compte-rendu Plaud FSM importé et analysé',
  'Nouveau commentaire ajouté sur Client Airbus',
  'Action Trésorerie court terme proche échéance',
  'Sujet Migration ERP maintenu en vigilance jaune',
];

export const assistantQuestions = [
  'Que s est-il passé depuis la dernière réunion avec SMTG ?',
  'Quels sont les sujets critiques chez FSM ?',
  'Prépare-moi la prochaine réunion avec Stimy.',
  'Quelles actions critiques restent ouvertes ?',
];

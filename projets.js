/* =====================================================================
   TES PROJETS : c'est le seul fichier à modifier pour gérer les réalisations.
   - Chaque projet est un bloc entre { }. Pour en ajouter un : copie un bloc,
     mets une virgule après le précédent et change l'"id" (unique, sans espace).
   - Les cartes de l'accueil ET les pages détaillées sont générées automatiquement.
   - categorie : "Scolaire / Atelier pro" ou "Stage" (sert aux filtres).
     Écris-la exactement pareil pour tous les projets d'un même filtre.
   - competences : codes du bloc 1 couverts, parmi B1.1 à B1.6.
     Les codes ci-dessous sont provisoires : garde seulement ceux que le projet couvre vraiment.
   - Remplace chaque "À compléter" par ton vrai texte.
   - Laisse "" (vide) un lien que tu n'as pas : il ne s'affichera pas.
   ===================================================================== */

const COMPETENCES_B1 = {
  "B1.1": "Gérer le patrimoine informatique",
  "B1.2": "Répondre aux incidents et aux demandes d'assistance et d'évolution",
  "B1.3": "Développer la présence en ligne de l'organisation",
  "B1.4": "Travailler en mode projet",
  "B1.5": "Mettre à disposition des utilisateurs un service informatique",
  "B1.6": "Organiser son développement professionnel"
};

const PROJETS = [
  {
    id: "atelier-1",
    titre: "Atelier professionnel 1 : À compléter",
    categorie: "Scolaire / Atelier pro",
    date: "À compléter",
    techs: ["À compléter"],
    miniature: "img/atelier1.png",
    resume: "À compléter",
    cadre: "À compléter",
    description: [
      { titre: "Contexte", texte: "À compléter" },
      { titre: "Travail réalisé", texte: "À compléter" },
      { titre: "Difficultés et solutions", texte: "À compléter" }
    ],
    images: [],
    liens: { github: "", pdf: "", site: "" },
    competences: ["B1.1", "B1.2"]
  },
  {
    id: "atelier-2",
    titre: "Atelier professionnel 2 : À compléter",
    categorie: "Scolaire / Atelier pro",
    date: "À compléter",
    techs: ["À compléter"],
    miniature: "img/atelier2.png",
    resume: "À compléter",
    cadre: "À compléter",
    description: [
      { titre: "Contexte", texte: "À compléter" },
      { titre: "Travail réalisé", texte: "À compléter" },
      { titre: "Difficultés et solutions", texte: "À compléter" }
    ],
    images: [],
    liens: { github: "", pdf: "", site: "" },
    competences: ["B1.1", "B1.2", "B1.4"]
  },
  {
    id: "stage-2027",
    titre: "Stage : À compléter",
    categorie: "Stage",
    date: "Mai – août 2027 (prévisionnel)",
    techs: ["À compléter"],
    miniature: "img/stage.png",
    resume: "À compléter",
    cadre: "Stage de 4 à 5 semaines. Entreprise : À compléter",
    description: [
      { titre: "L'entreprise", texte: "À compléter" },
      { titre: "Ma mission", texte: "À compléter" },
      { titre: "Difficultés et solutions", texte: "À compléter" }
    ],
    images: [],
    liens: { github: "", pdf: "", site: "" },
    competences: ["B1.2", "B1.5", "B1.6"]
  }
];

/* =============================================
       STATE
    ============================================= */
    var ST = { step: 1, domain: '', template: '', photo: null, totalSteps: 6 };
    var MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    var bc = 0;

    /* Per-domain content */
    var DOMAIN = {
      etudiant: {
        titleLabel: 'Programme visé / Domaine d\'étude',
        titleHint: 'Ex : Master Informatique, Licence Économie, BTS Électronique…',
        titlePH: 'Ex : Étudiant en Licence 3 Informatique',
        cityHint: 'Ville de votre université ou ville souhaitée',
        phoneHint: 'WhatsApp accepté, incluez l\'indicatif : +237 pour Cameroun…',
        emailHint: 'Utilisez votre email universitaire ou une adresse sérieuse',
        linkedinHint: 'Créez un profil LinkedIn — très utile pour les candidatures étrangères !',
        websiteLabel: 'Site/Portfolio personnel',
        websiteHint: 'Si vous avez un site, GitHub, Behance… mettez le lien ici',
        projUrlTitle: 'Votre site ou projet en cours de création',
        projUrlTip: 'Vous créez un site, une appli ? Même en cours, mentionnez-le ! Cela montre votre initiative et vos compétences pratiques.',
        projUrlLabel: 'Lien du site / projet',
        projUrlPH: 'Ex : github.com/monpseudo/mon-site, monprojet.netlify.app…',
        projDescLabel: 'Description du projet (ce que vous construisez)',
        projDescPH: 'Ex : Site vitrine pour une association locale — réalisé en HTML/CSS/JS, en cours de finalisation',
        profileTip: '3-4 phrases sur vous : qui vous êtes, vos études, ce que vous cherchez (stage/école), et ce qui vous motive.',
        profilePH: 'Ex : Étudiant en 3e année de Licence Informatique à l\'Université de Yaoundé I, passionné par le développement web. J\'ai réalisé 2 projets en Python et React. Je recherche un stage de 6 mois pour mettre en pratique mes compétences dans un environnement professionnel.',
        eduTitle: 'Formations & Diplômes',
        eduSub: 'Votre parcours scolaire, du plus récent au plus ancien. Mettez votre formation en cours en premier.',
        expTitle: 'Expériences professionnelles',
        expSub: 'Stage, job étudiant, bénévolat rémunéré… Tout compte ! Si vous n\'en avez pas, cochez la case.',
        noExpLbl: 'Je n\'ai pas encore d\'expérience professionnelle (c\'est normal pour un étudiant !)',
        s4sub: 'Remplissez votre parcours scolaire en priorité. Les projets et activités extra-scolaires sont aussi très importants pour les candidatures à l\'étranger.',
        skillsSub: 'Compétences académiques et techniques — cliquez pour sélectionner.',
        langsTip: 'Les langues sont ESSENTIELLES pour les candidatures à l\'étranger. Mentionnez votre niveau réel — les recruteurs vérifieront !',
        hobbiesHint: 'Montre votre personnalité. Ex : Lecture, Programmation, Football, Voyages, Musique…',
        showProjCard: true,
        showActCard: true,
        skills: ['Microsoft Office', 'Gestion du temps', 'Travail en équipe', 'Communication', 'Anglais technique', 'Recherche documentaire', 'Prise de parole en public', 'Organisation', 'Leadership', 'Pensée critique', 'Réseaux sociaux', 'LaTeX', 'Présentation PowerPoint']
      },
      info: {
        titleLabel: 'Poste visé',
        titleHint: 'Ex : Développeur Full Stack, Ingénieur Réseau, Data Analyst, DevOps…',
        titlePH: 'Ex : Développeur Web Full Stack',
        cityHint: 'Votre ville ou la ville du poste visé',
        phoneHint: 'Numéro professionnel avec indicatif pays',
        emailHint: 'Email professionnel. Ex : prenom.nom@gmail.com',
        linkedinHint: 'LinkedIn est incontournable en informatique — complétez votre profil !',
        websiteLabel: 'GitHub / Portfolio technique',
        websiteHint: 'Votre GitHub ou portfolio de projets est très important en dev !',
        projUrlTitle: 'Projet technique en cours',
        projUrlTip: 'Une appli, un site, un outil que vous développez ? Même non terminé, montrez-le ! C\'est une preuve concrète de vos compétences.',
        projUrlLabel: 'Lien GitHub ou démo du projet',
        projUrlPH: 'Ex : github.com/username/mon-projet ou monapp.vercel.app',
        projDescLabel: 'Description technique',
        projDescPH: 'Ex : Application de gestion de stock en React + Node.js + MongoDB — en cours de développement',
        profileTip: '3-4 phrases : vos technologies maîtrisées, vos années d\'expérience, vos spécialités et ce que vous cherchez.',
        profilePH: 'Ex : Développeur web avec 3 ans d\'expérience en JavaScript, React et Node.js. Passionné par les applications performantes et l\'expérience utilisateur. À la recherche d\'un poste de développeur full stack dans une entreprise innovante.',
        eduTitle: 'Formation',
        eduSub: 'Vos diplômes en informatique, certifications techniques, formations en ligne…',
        expTitle: 'Expériences professionnelles',
        expSub: 'Emplois, missions freelance, stages techniques, projets open source…',
        noExpLbl: 'Je n\'ai pas encore d\'expérience professionnelle',
        s4sub: 'Mettez en avant vos projets techniques même dans la section expérience.',
        skillsSub: 'Technologies et compétences — sélectionnez celles que vous maîtrisez.',
        langsTip: 'L\'anglais est indispensable en informatique pour lire la documentation et collaborer.',
        hobbiesHint: 'Ex : Contribution open source, Hackathons, Jeux vidéo, Lecture tech…',
        showProjCard: false, showActCard: false,
        skills: ['JavaScript', 'Python', 'React', 'Node.js', 'HTML/CSS', 'SQL', 'Git/GitHub', 'Docker', 'Linux', 'REST APIs', 'MongoDB', 'PostgreSQL', 'TypeScript', 'Java', 'PHP', 'C/C++', 'DevOps', 'Cybersécurité', 'Cloud AWS', 'Agile/Scrum']
      },
      commerce: {
        titleLabel: 'Poste commercial visé',
        titleHint: 'Ex : Responsable Commercial, Chef de Vente, Account Manager, Business Developer…',
        titlePH: 'Ex : Commercial terrain B2B',
        cityHint: 'Ville ou zone géographique visée',
        phoneHint: 'Votre numéro de téléphone professionnel',
        emailHint: 'Email professionnel pour vos contacts clients et employeurs',
        linkedinHint: 'LinkedIn est essentiel en commerce pour votre réseau professionnel',
        websiteLabel: 'Site web ou portfolio commercial',
        websiteHint: 'Votre site personnel ou un portfolio de vos résultats commerciaux',
        projUrlTitle: 'Projet ou initiative commerciale en cours',
        projUrlTip: 'Une boutique en ligne, un projet entrepreneurial, une campagne marketing ? Montrez votre initiative !',
        projUrlLabel: 'Lien du projet',
        projUrlPH: 'Ex : ma-boutique.com, campagne que vous avez créée…',
        projDescLabel: 'Description',
        projDescPH: 'Ex : Boutique en ligne de produits artisanaux — gestion des ventes et du marketing digital',
        profileTip: '3-4 phrases : vos résultats chiffrés si possible, votre secteur de prédilection, vos méthodes de vente.',
        profilePH: 'Ex : Commercial avec 5 ans d\'expérience en vente B2B dans le secteur des télécommunications. Habitué à gérer un portefeuille de 80+ clients et à atteindre des objectifs mensuels de 120%. Je recherche un poste de Responsable Commercial régional.',
        eduTitle: 'Formation',
        eduSub: 'Diplômes en commerce, marketing, gestion, vente…',
        expTitle: 'Expériences commerciales',
        expSub: 'Postes de vente, négociation, gestion clients, développement commercial…',
        noExpLbl: 'Je n\'ai pas encore d\'expérience en commerce',
        s4sub: 'Mentionnez vos résultats chiffrés quand c\'est possible (CA généré, taux de conversion…).',
        skillsSub: 'Compétences commerciales — sélectionnez celles qui vous correspondent.',
        langsTip: 'Les langues sont un atout en commerce international. Mentionnez votre niveau réel.',
        hobbiesHint: 'Ex : Networking, Tennis, Lecture business, Voyages, Cuisine…',
        showProjCard: false, showActCard: false,
        skills: ['Prospection B2B', 'Négociation', 'CRM (Salesforce/HubSpot)', 'Excel avancé', 'Marketing digital', 'Google Ads', 'Gestion de portefeuille clients', 'Présentation commerciale', 'Analyse des ventes', 'Service client', 'E-commerce', 'LinkedIn Sales Navigator', 'Cold calling', 'Gestion de contrats']
      },
      sante: {
        titleLabel: 'Spécialité / Poste visé',
        titleHint: 'Ex : Médecin généraliste, Infirmier(e) en service de réanimation, Sage-femme, Pharmacien(ne)…',
        titlePH: 'Ex : Infirmier(e) diplômé(e) d\'État',
        cityHint: 'Ville ou établissement de santé visé',
        phoneHint: 'Numéro professionnel',
        emailHint: 'Email professionnel pour vos candidatures',
        linkedinHint: 'LinkedIn est utile pour les professionnels de santé aussi',
        websiteLabel: 'Site web ou publications',
        websiteHint: 'Vos publications médicales, blog de santé ou site professionnel',
        projUrlTitle: 'Recherche ou projet médical en cours',
        projUrlTip: 'Si vous menez une recherche clinique ou un projet de santé publique, mentionnez-le ici.',
        projUrlLabel: 'Lien vers le projet ou la publication',
        projUrlPH: 'Ex : lien vers votre mémoire, recherche, ou projet de santé…',
        projDescLabel: 'Description du projet',
        projDescPH: 'Ex : Étude sur l\'impact du paludisme en milieu urbain — Université de Yaoundé',
        profileTip: '3-4 phrases sur votre spécialité, vos établissements, votre expérience et votre approche du soin.',
        profilePH: 'Ex : Infirmier diplômé avec 4 ans d\'expérience en service de médecine interne et urgences. Formé aux soins intensifs et à la gestion de crise. À la recherche d\'un poste d\'infirmier coordinateur.',
        eduTitle: 'Formation médicale & Diplômes',
        eduSub: 'Diplôme d\'État, spécialisations, formations continues, DU, DESC…',
        expTitle: 'Expériences cliniques & Postes occupés',
        expSub: 'Stages hospitaliers, postes d\'infirmier, médecin, pharmacien, sages-femmes…',
        noExpLbl: 'Je n\'ai pas encore d\'expérience clinique professionnelle',
        s4sub: 'Précisez toujours le type de service (urgences, pédiatrie, réanimation…) dans vos expériences.',
        skillsSub: 'Compétences médicales et paramédicales.',
        langsTip: 'L\'anglais médical est très utile pour lire les publications et travailler à l\'international.',
        hobbiesHint: 'Ex : Course à pied, Méditation, Lecture médicale, Voyages humanitaires…',
        showProjCard: false, showActCard: false,
        skills: ['Soins infirmiers', 'Pharmacologie', 'Premiers secours', 'Protocoles médicaux', 'Gestion des urgences', 'Triage', 'Pose de perfusions', 'Suivi de traitements', 'Travail en équipe pluridisciplinaire', 'Dossiers médicaux', 'DASRI', 'Stérilisation', 'Écoute active', 'Relation patient']
      },
      ingenierie: {
        titleLabel: 'Spécialité / Poste visé',
        titleHint: 'Ex : Ingénieur Génie Civil, Chef de Chantier, Ingénieur Mécanique, Conducteur de Travaux…',
        titlePH: 'Ex : Ingénieur Génie Civil Junior',
        cityHint: 'Ville ou région où vous souhaitez travailler',
        phoneHint: 'Numéro professionnel avec indicatif pays',
        emailHint: 'Email professionnel pour vos candidatures',
        linkedinHint: 'LinkedIn vous permet d\'accéder aux offres dans le BTP et l\'ingénierie',
        websiteLabel: 'Portfolio de projets / Plans',
        websiteHint: 'Lien vers vos réalisations, plans AutoCAD, ou portfolio de projets',
        projUrlTitle: 'Projet de construction ou d\'ingénierie en cours',
        projUrlTip: 'Un chantier, un projet de conception, un mémoire de fin d\'études ? Mentionnez-le !',
        projUrlLabel: 'Lien vers le projet ou les plans',
        projUrlPH: 'Ex : lien vers votre mémoire, PDF de plans, ou présentation du projet',
        projDescLabel: 'Description du projet',
        projDescPH: 'Ex : Conception d\'un bâtiment R+4 à structure béton armé — mémoire de fin d\'études',
        profileTip: '3-4 phrases : votre spécialité, vos logiciels maîtrisés, vos réalisations et votre secteur de prédilection.',
        profilePH: 'Ex : Ingénieur en génie civil avec 3 ans d\'expérience dans la conception de structures et le suivi de chantier. Maîtrise d\'AutoCAD, Revit et MS Project. Spécialisé dans les ouvrages d\'art et les bâtiments industriels.',
        eduTitle: 'Formation en ingénierie',
        eduSub: 'Diplômes d\'ingénieur, BTP, génie civil, mécanique, certifications…',
        expTitle: 'Expériences en ingénierie & Chantiers',
        expSub: 'Stages, missions de maîtrise d\'œuvre, supervision de chantier, bureau d\'études…',
        noExpLbl: 'Je n\'ai pas encore d\'expérience professionnelle en ingénierie',
        s4sub: 'Précisez les types de projets, les volumes (m², budget), et vos responsabilités exactes.',
        skillsSub: 'Compétences techniques en ingénierie.',
        langsTip: 'L\'anglais technique est indispensable pour les projets internationaux et les logiciels.',
        hobbiesHint: 'Ex : Modélisme, Architecture, Sport collectif, Dessin technique…',
        showProjCard: false, showActCard: false,
        skills: ['AutoCAD', 'Revit', 'MATLAB', 'MS Project', 'Gestion de chantier', 'Lecture de plans', 'Topographie', 'Béton armé', 'Hydraulique', 'Électricité bâtiment', 'Sécurité sur chantier', 'Coordination d\'équipe', 'Gestion budgétaire', 'BIM', 'SolidWorks']
      },
      finance: {
        titleLabel: 'Poste financier visé',
        titleHint: 'Ex : Comptable, Auditeur, Contrôleur de gestion, Analyste financier, Directeur Financier…',
        titlePH: 'Ex : Comptable certifié SYSCOHADA',
        cityHint: 'Ville où vous souhaitez travailler',
        phoneHint: 'Numéro professionnel',
        emailHint: 'Email professionnel — évitez les pseudos fantaisie',
        linkedinHint: 'Indispensable pour votre réseau professionnel en finance',
        websiteLabel: 'Blog finance ou publications',
        websiteHint: 'Blog financier, articles publiés ou portfolio de rapports',
        projUrlTitle: 'Rapport ou projet financier en cours',
        projUrlTip: 'Un rapport d\'audit, une analyse financière, une étude de marché ? Mentionnez-le !',
        projUrlLabel: 'Lien vers le projet',
        projUrlPH: 'Ex : lien vers votre rapport ou mémoire financier…',
        projDescLabel: 'Description',
        projDescPH: 'Ex : Analyse financière d\'une PME du secteur agroalimentaire — stage de fin d\'études',
        profileTip: '3-4 phrases : votre spécialité comptable/financière, vos outils, vos années d\'expérience et vos certifications.',
        profilePH: 'Ex : Comptable certifié avec 4 ans d\'expérience en cabinet d\'audit et expertise comptable. Maîtrise du plan comptable SYSCOHADA, de Sage et d\'Excel avancé. À la recherche d\'un poste de Chef Comptable.',
        eduTitle: 'Formation en finance & comptabilité',
        eduSub: 'Diplômes de comptabilité, finance, gestion, DSCG, CPA, ACCA…',
        expTitle: 'Expériences en finance & comptabilité',
        expSub: 'Postes en cabinet, DAF, contrôle de gestion, audit interne/externe…',
        noExpLbl: 'Je n\'ai pas encore d\'expérience professionnelle en finance',
        s4sub: 'Mentionnez les volumes gérés (budget, CA, nombre de dossiers) quand c\'est pertinent.',
        skillsSub: 'Compétences financières et comptables.',
        langsTip: 'L\'anglais financier est nécessaire pour les cabinets internationaux.',
        hobbiesHint: 'Ex : Lecture économique, Finance personnelle, Tennis, Jeux d\'échecs…',
        showProjCard: false, showActCard: false,
        skills: ['Comptabilité générale', 'SYSCOHADA', 'Plan comptable OHADA', 'Sage 100', 'Ciel Compta', 'Audit financier', 'Contrôle de gestion', 'Excel avancé', 'Tableaux de bord', 'Fiscalité', 'Déclarations fiscales', 'Consolidation', 'Gestion de trésorerie', 'Liasse fiscale', 'Reporting IFRS']
      },
      droit: {
        titleLabel: 'Spécialité juridique / Poste visé',
        titleHint: 'Ex : Avocat en droit des affaires, Juriste d\'entreprise, Notaire, Magistrat…',
        titlePH: 'Ex : Juriste en droit OHADA',
        cityHint: 'Barreau ou ville d\'exercice',
        phoneHint: 'Numéro de cabinet ou personnel',
        emailHint: 'Email professionnel de cabinet',
        linkedinHint: 'LinkedIn est utile pour les juristes, notamment pour les cabinets internationaux',
        websiteLabel: 'Site du cabinet ou publications',
        websiteHint: 'Site de votre cabinet, publications juridiques, articles de doctrine…',
        projUrlTitle: 'Mémoire ou article juridique en cours',
        projUrlTip: 'Un mémoire de master, une étude juridique ou un article de doctrine ? Mentionnez-le !',
        projUrlLabel: 'Lien vers le document ou la publication',
        projUrlPH: 'Ex : lien vers votre mémoire OHADA, article juridique, ou thèse…',
        projDescLabel: 'Description',
        projDescPH: 'Ex : Mémoire sur la responsabilité civile dans les contrats de distribution OHADA — en cours de rédaction',
        profileTip: '3-4 phrases : vos domaines de spécialisation, vos barreaux, vos langues de travail et votre expertise.',
        profilePH: 'Ex : Avocat inscrit au Barreau du Cameroun, spécialisé en droit des affaires OHADA et droit fiscal. 5 ans d\'expérience en contentieux commercial et conseil aux entreprises. Bilingue français/anglais.',
        eduTitle: 'Formation juridique',
        eduSub: 'Diplômes de droit, DEA, Master, CRFPA, Bar exam…',
        expTitle: 'Expériences juridiques',
        expSub: 'Stages en cabinet, postes de juriste, missions de conseil…',
        noExpLbl: 'Je n\'ai pas encore d\'expérience professionnelle en droit',
        s4sub: 'Précisez les types de dossiers traités et les juridictions concernées.',
        skillsSub: 'Compétences juridiques et procédurales.',
        langsTip: 'Le droit international requiert souvent l\'anglais juridique ou le droit OHADA.',
        hobbiesHint: 'Ex : Lectures juridiques, Débats, Jeux d\'échecs, Tennis…',
        showProjCard: false, showActCard: false,
        skills: ['Rédaction juridique', 'Droit des affaires', 'Droit civil', 'Droit OHADA', 'Droit fiscal', 'Droit du travail', 'Procédure civile', 'Contentieux', 'Négociation de contrats', 'Médiation', 'Recherche documentaire Dalloz', 'LexisNexis', 'Plaidoirie', 'Veille juridique']
      },
      communication: {
        titleLabel: 'Spécialité créative / Poste visé',
        titleHint: 'Ex : Directeur Artistique, Social Media Manager, Graphiste, Chef de Projet Digital…',
        titlePH: 'Ex : Graphiste & Motion Designer',
        cityHint: 'Ville ou mode de travail (remote/hybride)',
        phoneHint: 'Numéro professionnel ou WhatsApp',
        emailHint: 'Email pro — votre prénom.nom@gmail.com est parfait',
        linkedinHint: 'LinkedIn + Behance/Dribbble = combo gagnant pour les créatifs',
        websiteLabel: 'Portfolio en ligne (Behance, Dribbble, site perso)',
        websiteHint: 'Votre portfolio est votre meilleur CV ! Mettez le lien ici.',
        projUrlTitle: 'Projet créatif en cours de réalisation',
        projUrlTip: 'Un site en cours, une campagne, un projet perso créatif ? Les recruteurs adorent voir votre travail même en WIP (Work In Progress) !',
        projUrlLabel: 'Lien du projet ou portfolio en construction',
        projUrlPH: 'Ex : monsite.webflow.io, behance.net/monpseudo/projet-en-cours…',
        projDescLabel: 'Description du projet créatif',
        projDescPH: 'Ex : Refonte de l\'identité visuelle d\'une startup locale — logo, charte graphique, site web en cours',
        profileTip: '3-4 phrases : votre style créatif, vos outils maîtrisés, vos spécialités et ce qui vous différencie.',
        profilePH: 'Ex : Graphiste et Motion Designer avec 4 ans d\'expérience en agence et freelance. Spécialisé en identité visuelle, UI design et animation. Maîtrise de la suite Adobe et Figma. Passionné par le design africain contemporain.',
        eduTitle: 'Formation artistique & créative',
        eduSub: 'Écoles de design, BTS com, licences arts, certifications…',
        expTitle: 'Expériences créatives & Projets',
        expSub: 'Agences, freelance, missions créatives, direction artistique…',
        noExpLbl: 'Je n\'ai pas encore d\'expérience professionnelle en communication/design',
        s4sub: 'Décrivez l\'impact de vos créations : portée de campagne, audience, résultats obtenus.',
        skillsSub: 'Outils créatifs et compétences en communication.',
        langsTip: 'L\'anglais est la langue du design et du marketing digital international.',
        hobbiesHint: 'Ex : Photographie, Illustration, Voyages, Cinéma, Street art…',
        showProjCard: false, showActCard: false,
        skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Adobe Premiere', 'After Effects', 'Figma', 'Canva', 'WordPress', 'Gestion des réseaux sociaux', 'Copywriting', 'Stratégie de contenu', 'SEO', 'Google Ads', 'Meta Ads', 'Email marketing', 'Branding']
      },
      education: {
        titleLabel: 'Poste / Matière enseignée',
        titleHint: 'Ex : Professeur de Mathématiques, Formateur en informatique, Directeur d\'école…',
        titlePH: 'Ex : Enseignant de Mathématiques — Lycée',
        cityHint: 'Ville ou établissement scolaire visé',
        phoneHint: 'Numéro professionnel ou de l\'établissement',
        emailHint: 'Email institutionnel ou professionnel',
        linkedinHint: 'LinkedIn vous connecte avec d\'autres enseignants et les directeurs d\'établissements',
        websiteLabel: 'Blog pédagogique ou ressources en ligne',
        websiteHint: 'Ressources que vous avez créées, blog éducatif, cours en ligne…',
        projUrlTitle: 'Ressource pédagogique ou cours en ligne en cours',
        projUrlTip: 'Vous créez des cours en ligne, des fiches pédagogiques ou un blog éducatif ? Mentionnez-le !',
        projUrlLabel: 'Lien vers vos ressources ou cours',
        projUrlPH: 'Ex : moodle.monecole.cm/cours, monblogped.com, YouTube/chaîne…',
        projDescLabel: 'Description',
        projDescPH: 'Ex : Série de cours vidéo de mathématiques niveau terminale — diffusés sur YouTube',
        profileTip: '3-4 phrases : vos matières, niveaux enseignés, méthodes pédagogiques et résultats obtenus.',
        profilePH: 'Ex : Enseignant de Mathématiques avec 7 ans d\'expérience en lycée public et privé. Spécialisé dans les classes de terminale et la préparation aux concours. Taux de réussite au BAC de 94% sur les 3 dernières années.',
        eduTitle: 'Formation & Certifications pédagogiques',
        eduSub: 'CAPES, CAFDES, licences, masters, CRPE, formations pédagogiques…',
        expTitle: 'Expériences d\'enseignement',
        expSub: 'Établissements, niveaux enseignés, matières, postes de direction…',
        noExpLbl: 'Je n\'ai pas encore d\'expérience d\'enseignement',
        s4sub: 'Précisez les niveaux et matières enseignés, et vos résultats pédagogiques si possible.',
        skillsSub: 'Compétences pédagogiques et disciplinaires.',
        langsTip: 'Les langues d\'enseignement sont importantes — précisez si vous enseignez en français, anglais, ou bilingue.',
        hobbiesHint: 'Ex : Lecture, Jeux éducatifs, Randonnée, Jardinage, Musique…',
        showProjCard: false, showActCard: false,
        skills: ['Pédagogie différenciée', 'Gestion de classe', 'Création de cours', 'Évaluation formative', 'Numérique éducatif', 'Tableaux interactifs', 'Moodle', 'Google Classroom', 'Travail en équipe', 'Communication parentale', 'Soutien scolaire', 'Gestion de conflits', 'Mathématiques', 'Français', 'Sciences']
      },
      hotellerie: {
        titleLabel: 'Poste hôtelier / restauration visé',
        titleHint: 'Ex : Chef cuisinier, Réceptionniste hôtel 5*, Maître d\'hôtel, Responsable de salle…',
        titlePH: 'Ex : Chef de rang — Restauration gastronomique',
        cityHint: 'Ville ou établissement hôtelier visé',
        phoneHint: 'Numéro professionnel avec indicatif',
        emailHint: 'Email professionnel pour vos candidatures hôtelières',
        linkedinHint: 'LinkedIn est utile pour les postes dans les chaînes internationales (Hilton, Marriott…)',
        websiteLabel: 'Portfolio culinaire ou galerie',
        websiteHint: 'Photos de vos réalisations culinaires, site de votre restaurant ou portfolio',
        projUrlTitle: 'Projet gastronomique ou hôtelier en cours',
        projUrlTip: 'Vous créez un restaurant, un traiteur, ou un blog culinaire ? Mentionnez-le !',
        projUrlLabel: 'Lien du projet',
        projUrlPH: 'Ex : Instagram de vos créations culinaires, site de votre traiteur…',
        projDescLabel: 'Description',
        projDescPH: 'Ex : Service traiteur événementiel pour mariages et cérémonies — en développement',
        profileTip: '3-4 phrases : votre spécialité culinaire ou hôtelière, vos établissements, vos langues et votre savoir-faire.',
        profilePH: 'Ex : Chef de partie avec 5 ans d\'expérience en restauration gastronomique française et africaine. Formé à l\'École Hôtelière de Yaoundé, spécialisé en cuisine de fusion. Habitué au travail en équipe sous pression dans des établissements étoilés.',
        eduTitle: 'Formation hôtelière & culinaire',
        eduSub: 'Écoles hôtelières, CAP cuisine, BTS hôtellerie, formations HACCP…',
        expTitle: 'Expériences en hôtellerie & restauration',
        expSub: 'Hôtels, restaurants, traiteurs, croisières, postes de direction…',
        noExpLbl: 'Je n\'ai pas encore d\'expérience en hôtellerie/restauration',
        s4sub: 'Précisez les types d\'établissements (étoiles, gastronomique, rapide…) et le nombre de couverts.',
        skillsSub: 'Compétences hôtelières et culinaires.',
        langsTip: 'Les langues sont cruciales en hôtellerie internationale — anglais minimum, une 3e langue est un atout.',
        hobbiesHint: 'Ex : Cuisine du monde, Pâtisserie, Œnologie, Voyages gastronomiques…',
        showProjCard: false, showActCard: false,
        skills: ['Service en salle', 'Accueil et réception', 'HACCP', 'Sécurité alimentaire', 'Gestion des stocks', 'Caisse & encaissement', 'Réservations (Fidelio/Opera)', 'Mise en place', 'Découpe et dressage', 'Gestion d\'équipe', 'Langues étrangères', 'Techniques de cuisson', 'Pâtisserie', 'Bar & cocktails']
      },
      rh: {
        titleLabel: 'Poste RH visé',
        titleHint: 'Ex : Responsable RH, Chargé de recrutement, DRH, HRBP, Gestionnaire paie…',
        titlePH: 'Ex : Chargé(e) de Recrutement & Formation',
        cityHint: 'Ville ou siège de l\'entreprise visée',
        phoneHint: 'Numéro professionnel',
        emailHint: 'Email professionnel — les RH doivent donner l\'exemple !',
        linkedinHint: 'LinkedIn est LE réseau des professionnels RH — votre profil doit être exemplaire !',
        websiteLabel: 'Blog RH ou publications',
        websiteHint: 'Articles sur les RH, blog de conseils carrière, podcast…',
        projUrlTitle: 'Projet RH ou outil en cours de développement',
        projUrlTip: 'Vous développez un outil de gestion RH, un guide, ou un projet d\'amélioration ? Mentionnez-le !',
        projUrlLabel: 'Lien vers le projet',
        projUrlPH: 'Ex : guide-recrutement.notion.site, article LinkedIn sur la marque employeur…',
        projDescLabel: 'Description',
        projDescPH: 'Ex : Guide de l\'entretien structuré pour managers — en cours de rédaction pour mon entreprise',
        profileTip: '3-4 phrases : vos spécialités RH, vos outils SIRH, vos secteurs d\'expérience et votre approche.',
        profilePH: 'Ex : Professionnelle RH avec 6 ans d\'expérience en recrutement et gestion des talents dans le secteur bancaire. Maîtrise des outils ATS, SAP HCM et des techniques d\'entretien comportemental. À la recherche d\'un poste de HRBP.',
        eduTitle: 'Formation en ressources humaines',
        eduSub: 'Masters RH, psychologie du travail, droit social, certifications…',
        expTitle: 'Expériences RH',
        expSub: 'Postes en cabinet RH, DRH, recrutement, formation, paie…',
        noExpLbl: 'Je n\'ai pas encore d\'expérience professionnelle en RH',
        s4sub: 'Mentionnez le nombre de collaborateurs gérés, les volumes de recrutement ou les effectifs de paie.',
        skillsSub: 'Compétences en ressources humaines.',
        langsTip: 'L\'anglais RH est nécessaire dans les entreprises internationales et pour les outils SIRH.',
        hobbiesHint: 'Ex : Coaching, Lecture psychologie, Sport collectif, Yoga, Développement personnel…',
        showProjCard: false, showActCard: false,
        skills: ['Recrutement', 'Sourcing (LinkedIn Recruiter)', 'ATS (Workday/SAP)', 'Gestion de la paie', 'Droit du travail', 'Formation professionnelle', 'GPEC/GEPP', 'Évaluation des performances', 'Marque employeur', 'Onboarding', 'Gestion des conflits', 'Entretiens annuels', 'Dialogue social', 'SIRH']
      },
      autre: {
        titleLabel: 'Poste / Fonction visé(e)',
        titleHint: 'Indiquez le poste ou la fonction que vous recherchez',
        titlePH: 'Votre poste ou fonction',
        cityHint: 'Ville où vous souhaitez travailler',
        phoneHint: 'Votre numéro de téléphone avec indicatif pays',
        emailHint: 'Email professionnel',
        linkedinHint: 'Créez un profil LinkedIn si vous n\'en avez pas encore',
        websiteLabel: 'Site web ou portfolio',
        websiteHint: 'Votre site personnel, blog ou portfolio de réalisations',
        projUrlTitle: 'Projet en cours',
        projUrlTip: 'Vous avez un projet en cours ? Site, application, initiative ? Mentionnez-le ici !',
        projUrlLabel: 'Lien du projet',
        projUrlPH: 'Ex : lien vers votre projet, site ou réalisation en cours…',
        projDescLabel: 'Description du projet',
        projDescPH: 'Ex : Description de votre projet en cours et de votre rôle',
        profileTip: '3-4 phrases : qui vous êtes, votre expérience, ce que vous recherchez et ce que vous apportez.',
        profilePH: 'Décrivez votre profil professionnel en 3-4 phrases…',
        eduTitle: 'Formations & Diplômes',
        eduSub: 'Vos diplômes et formations, du plus récent au plus ancien.',
        expTitle: 'Expériences professionnelles',
        expSub: 'Vos expériences, du plus récent au plus ancien.',
        noExpLbl: 'Je n\'ai pas encore d\'expérience professionnelle',
        s4sub: 'Remplissez vos formations et expériences.',
        skillsSub: 'Sélectionnez vos compétences.',
        langsTip: 'Mentionnez toutes les langues que vous parlez avec votre niveau réel.',
        hobbiesHint: 'Vos passions et centres d\'intérêt…',
        showProjCard: false, showActCard: false,
        skills: ['Communication', 'Gestion de projet', 'Microsoft Office', 'Travail en équipe', 'Organisation', 'Résolution de problèmes', 'Leadership', 'Prise de parole', 'Adaptabilité', 'Créativité']
      }
    };

    /* =============================================
       INIT
    ============================================= */
    document.addEventListener('DOMContentLoaded', function () {
      initDOB(); initPills(); addEdu(); addLang(); renderSkills('autre');
      if (typeof loadFromLocal === 'function') loadFromLocal();
      document.addEventListener('input', function (e) { if (e.target.closest('.main')) saveToLocal(); });
      document.addEventListener('change', function (e) { if (e.target.closest('.main')) saveToLocal(); });
    });

    function initDOB() {
      var sd = document.getElementById('dob_d');
      var sm = document.getElementById('dob_m');
      var sy = document.getElementById('dob_y');
      var ss = 'font-family:inherit;font-size:.84rem;padding:10px;border:1.5px solid var(--border);border-radius:10px;color:var(--ink);background:var(--bg);outline:none;width:100%;cursor:pointer;';
      sd.style.cssText = sm.style.cssText = sy.style.cssText = ss;
      sd.innerHTML = '<option value="">Jour</option>';
      sm.innerHTML = '<option value="">Mois</option>';
      sy.innerHTML = '<option value="">Année</option>';
      for (var i = 1; i <= 31; i++) { var o = document.createElement('option'); o.value = i; o.textContent = String(i).padStart(2, '0'); sd.appendChild(o); }
      for (var i = 0; i < MONTHS.length; i++) { var o = document.createElement('option'); o.value = i + 1; o.textContent = MONTHS[i]; sm.appendChild(o); }
      for (var y = new Date().getFullYear() - 10; y >= 1940; y--) { var o = document.createElement('option'); o.value = y; o.textContent = y; sy.appendChild(o); }
    }

    function initPills() {
      var w = document.getElementById('pills'); w.innerHTML = '';
      for (var i = 0; i <= ST.totalSteps; i++) {
        var d = document.createElement('div'); d.id = 'sp' + i;
        d.className = 'sp' + (i === 0 ? ' active' : '');
        w.appendChild(d);
      }
    }

    /* =============================================
       NAVIGATION
    ============================================= */
    function goStep(n) {
      document.getElementById('step' + ST.step).classList.remove('active');
      ST.step = n;
      document.getElementById('step' + n).classList.add('active');
      var pct = (n / ST.totalSteps) * 100;
      document.getElementById('pf').style.width = pct + '%';
      if (n === 0) { document.getElementById('sctr').textContent = 'Accueil'; }
      else { document.getElementById('sctr').textContent = 'Etape ' + n + ' / ' + (ST.totalSteps - 1); }
      for (var i = 0; i <= ST.totalSteps; i++) {
        var d = document.getElementById('sp' + i);
        if (!d) continue;
        if (i < n) d.className = 'sp done'; else if (i === n) d.className = 'sp active'; else d.className = 'sp';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      /* Auto-generer le CV quand on arrive a l'etape 6 */
      if (n === 6) {
        setTimeout(function () { generateCV(); }, 150);
      }
    }

    function goNext(cur) {
      if (cur === 1 && !ST.domain) { showErr('e1'); return; }
      if (cur === 2 && !ST.template) { showErr('e2'); return; }
      if (cur === 3) {
        if (!gv('firstName') && !gv('lastName')) { showToast('⚠️ Entrez votre prénom et nom (obligatoire)'); return; }
      }
      goStep(cur + 1);
    }

    function showErr(id) {
      var e = document.getElementById(id);
      e.classList.add('show');
      setTimeout(function () { e.classList.remove('show'); }, 3500);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    /* =============================================
       DOMAIN SELECTION — update all hints
    ============================================= */
    function selDom(el) {
      document.querySelectorAll('.dom-card').forEach(function (c) { c.classList.remove('sel'); });
      el.classList.add('sel');
      ST.domain = el.dataset.d;
      var cfg = DOMAIN[ST.domain] || DOMAIN.autre;

      /* tip étudiant */
      document.getElementById('tipStu').style.display = ST.domain === 'etudiant' ? 'flex' : 'none';

      /* step 3 hints */
      setTxt('lbl-title', cfg.titleLabel);
      setTxt('h-title', cfg.titleHint);
      setAttr('jobTitle', 'placeholder', cfg.titlePH);
      setTxt('h-nat', cfg.cityHint);
      setTxt('h-phone', cfg.phoneHint);
      setTxt('h-email', cfg.emailHint);
      setTxt('h-linkedin', cfg.linkedinHint);
      setTxt('lbl-website', cfg.websiteLabel + ' (Optionnel)');
      setTxt('h-website', cfg.websiteHint);
      setTxt('projUrlTitle', cfg.projUrlTitle);
      setTxt('projUrlTip', cfg.projUrlTip);
      setTxt('lbl-projUrl', cfg.projUrlLabel);
      setAttr('projUrl', 'placeholder', cfg.projUrlPH);
      setTxt('lbl-projDesc', cfg.projDescLabel);
      setAttr('projDesc', 'placeholder', cfg.projDescPH);
      setTxt('profileTip', cfg.profileTip);
      setAttr('profile', 'placeholder', cfg.profilePH);

      /* step 4 */
      setTxt('s4sub', cfg.s4sub);
      setTxt('eduTitle', cfg.eduTitle);
      setTxt('eduSubtitle', cfg.eduSub);
      setTxt('expTitle', cfg.expTitle);
      setTxt('expSubtitle', cfg.expSub);
      setTxt('noExpLbl', cfg.noExpLbl);
      var tipS4 = document.getElementById('tipStu4');
      if (tipS4) tipS4.style.display = ST.domain === 'etudiant' ? 'flex' : 'none';
      var pCard = document.getElementById('projCard');
      var aCard = document.getElementById('actCard');
      if (pCard) pCard.style.display = cfg.showProjCard ? 'block' : 'none';
      if (aCard) aCard.style.display = cfg.showActCard ? 'block' : 'none';

      /* step 5 */
      setTxt('skillsSubtitle', cfg.skillsSub);
      setTxt('langsTip', cfg.langsTip);
      setTxt('hobbiesHint', cfg.hobbiesHint);
      renderSkills(ST.domain);

      document.getElementById('e1').classList.remove('show');
      /* Scroll vers le bouton Suivant */
      setTimeout(function () {
        var nav = document.querySelector('#step1 .nav');
        if (nav) nav.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }

    function setTxt(id, v) { var e = document.getElementById(id); if (e && v) e.textContent = v; }
    function setAttr(id, attr, v) { var e = document.getElementById(id); if (e && v) e.setAttribute(attr, v); }

    /* =============================================
       TEMPLATE SELECTION
    ============================================= */
    function selTpl(el) {
      document.querySelectorAll('.tpl-card').forEach(function (c) { c.classList.remove('sel'); });
      el.classList.add('sel'); ST.template = el.dataset.t;
      document.getElementById('e2').classList.remove('show');
      /* Scroll vers le bouton Suivant */
      setTimeout(function () {
        var nav = document.querySelector('#step2 .nav');
        if (nav) nav.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }

    /* =============================================
       PHOTO
    ============================================= */
    function handlePhoto(input) {
      if (!input.files || !input.files[0]) return;
      var file = input.files[0];
      /* Securite anti-malware : verifier que c'est bien une image */
      if (!file.type.match('image.*')) { showToast('Erreur: Veuillez uploader une image valide (JPG, PNG).'); return; }
      if (file.size > 2 * 1024 * 1024) {
        showToast("Erreur: L'image est trop lourde (2Mo max)."); return;
      }

      var r = new FileReader();
      r.onload = function (e) {
        ST.photo = e.target.result;
        document.getElementById('photoPreview').innerHTML = '<img src="' + ST.photo + '" alt="photo">';
      };
      r.readAsDataURL(file);
    }

    /* =============================================
       SKILLS
    ============================================= */
    function renderSkills(domain) {
      var cloud = document.getElementById('skillCloud'); if (!cloud) return;
      var skills = (DOMAIN[domain] || DOMAIN.autre).skills;
      cloud.innerHTML = '';
      skills.forEach(function (s) {
        var t = document.createElement('span'); t.className = 'sk-tag'; t.textContent = s;
        t.onclick = function () { t.classList.toggle('on'); };
        cloud.appendChild(t);
      });
    }
    function addCustomSkill() {
      var inp = document.getElementById('customSkill'); var v = inp.value.trim(); if (!v) return;
      var t = document.createElement('span'); t.className = 'sk-tag on';
      t.innerHTML = v + ' <span style="font-size:.65rem;cursor:pointer;margin-left:4px" onclick="this.parentElement.remove()">✕</span>';
      document.getElementById('skillCloud').appendChild(t); inp.value = '';
    }

    /* =============================================
       DYNAMIC BLOCKS
    ============================================= */
    var SS = 'font-family:inherit;font-size:.84rem;padding:10px;border:1.5px solid var(--border);border-radius:10px;color:var(--ink);background:var(--bg);outline:none;width:100%;cursor:pointer;';

    function mSel(opts, ph) {
      var h = '<select style="' + SS + '"><option value="">' + ph + '</option>';
      opts.forEach(function (o) { h += '<option value="' + o.v + '">' + o.l + '</option>'; });
      return h + '</select>';
    }
    function yOpts() { var y = new Date().getFullYear(); var a = []; for (var i = 0; i <= 45; i++) { a.push({ v: y - i, l: y - i }); } a.push({ v: 'En cours', l: 'En cours ✓' }); return a; }
    function yOnlyOpts() { var y = new Date().getFullYear(); var a = []; for (var i = 0; i <= 45; i++) { a.push({ v: y - i, l: y - i }); } return a; }
    function mOpts() { return MONTHS.map(function (m) { return { v: m, l: m }; }); }

    function addEdu() {
      var id = 'edu' + (++bc); var el = document.createElement('div'); el.className = 'rep-block'; el.id = id;
      var cfg = DOMAIN[ST.domain] || DOMAIN.autre;
      el.innerHTML = '<button class="rem-btn" onclick="rmB(\'' + id + '\')">✕</button>'
        + '<div class="rep-num">Formation</div>'
        + '<div class="fg"><div class="field"><label>Diplôme / Titre obtenu *</label>'
        + '<span class="hint" id="hd-deg">Ex : Licence 3 Informatique, BTS, Baccalauréat C, Master 1…</span>'
        + '<input type="text" placeholder="Votre diplôme ou certification"></div>'
        + '<div class="field"><label>Établissement *</label>'
        + '<span class="hint">Ex : Université de Yaoundé I, ENSP, Sciences Po, HEC…</span>'
        + '<input type="text" placeholder="Nom de l\'école ou université"></div></div>'
        + '<div class="fg"><div class="field"><label>Ville / Pays</label>'
        + '<input type="text" placeholder="Ex : Yaoundé, Cameroun ou Paris, France"></div>'
        + '<div class="field"><label>Mention / Note <span class="opt">Optionnel</span></label>'
        + '<span class="hint">Ex : Très Bien, 15/20, Major de promotion…</span>'
        + '<input type="text" placeholder="Mention ou note obtenue"></div></div>'
        + '<div class="fg"><div class="field"><label>Année de début</label>' + mSel(yOnlyOpts(), 'Année') + '</div>'
        + '<div class="field"><label>Année de fin</label>' + mSel(yOpts(), 'Année') + '</div></div>'
        + '<div class="fg f1"><div class="field"><label>Description <span class="opt">Optionnel</span></label>'
        + '<span class="hint">Matières principales, projets réalisés dans cet établissement…</span>'
        + '<textarea rows="2" placeholder="Ex : Spécialisation en réseaux informatiques. Réalisation d\'un projet de fin de cycle sur la sécurité des systèmes."></textarea></div></div>';
      document.getElementById('eduBlocks').appendChild(el);
    }

    function addExp() {
      var id = 'exp' + (++bc); var el = document.createElement('div'); el.className = 'rep-block'; el.id = id;
      var mo = mOpts(); var yo = yOpts();
      el.innerHTML = '<button class="rem-btn" onclick="rmB(\'' + id + '\')">✕</button>'
        + '<div class="rep-num">Expérience</div>'
        + '<div class="fg"><div class="field"><label>Titre du poste *</label>'
        + '<span class="hint">Ex : Développeur web junior, Infirmier, Commercial, Stagiaire comptabilité…</span>'
        + '<input type="text" placeholder="Votre titre de poste"></div>'
        + '<div class="field"><label>Entreprise / Organisation *</label>'
        + '<span class="hint">Nom de l\'employeur</span>'
        + '<input type="text" placeholder="Nom de l\'entreprise ou de l\'organisation"></div></div>'
        + '<div class="fg"><div class="field"><label>Date de début</label><div class="date-duo">' + mSel(mo, 'Mois') + mSel(yo, 'Année') + '</div></div>'
        + '<div class="field"><label>Date de fin</label><div class="date-duo">' + mSel(mo, 'Mois') + mSel(yo, 'Année') + '</div></div></div>'
        + '<div class="fg f1"><div class="field"><label>Missions réalisées <span class="opt">Recommandé</span></label>'
        + '<span class="hint">Décrivez concrètement vos missions. Utilisez des verbes d\'action : "J\'ai développé…", "J\'ai géré…", "J\'ai augmenté de X%…"</span>'
        + '<textarea rows="3" placeholder="Ex : Développement de l\'application mobile de l\'entreprise en React Native. Gestion d\'une équipe de 3 développeurs. Réduction des bugs de 40%."></textarea></div></div>';
      document.getElementById('expBlocks').appendChild(el);
    }

    function addProj() {
      var id = 'prj' + (++bc); var el = document.createElement('div'); el.className = 'rep-block'; el.id = id;
      el.innerHTML = '<button class="rem-btn" onclick="rmB(\'' + id + '\')">✕</button>'
        + '<div class="fg"><div class="field"><label>Nom du projet *</label>'
        + '<span class="hint">Ex : Application de gestion scolaire, Mémoire de fin de cycle, Hackathon…</span>'
        + '<input type="text" placeholder="Nom du projet académique"></div>'
        + '<div class="field"><label>Période</label>'
        + '<input type="text" placeholder="Ex : 2023, Septembre 2022 – Juin 2023"></div></div>'
        + '<div class="fg f1"><div class="field"><label>Description *</label>'
        + '<span class="hint">Que avez-vous réalisé ? Quels outils ? Résultats obtenus ? Votre rôle (seul ou en équipe) ?</span>'
        + '<textarea rows="3" placeholder="Ex : Développement en Python d\'une appli de gestion des absences scolaires. Équipe de 4. Présenté devant jury. Mention Très Bien."></textarea></div></div>';
      document.getElementById('projBlocks').appendChild(el);
    }

    function addAct() {
      var id = 'act' + (++bc); var el = document.createElement('div'); el.className = 'rep-block'; el.id = id;
      el.innerHTML = '<button class="rem-btn" onclick="rmB(\'' + id + '\')">✕</button>'
        + '<div class="fg"><div class="field"><label>Rôle / Activité *</label>'
        + '<span class="hint">Ex : Délégué de classe, Président du club informatique, Bénévole Croix-Rouge…</span>'
        + '<input type="text" placeholder="Votre rôle ou activité"></div>'
        + '<div class="field"><label>Organisation / Lieu</label>'
        + '<input type="text" placeholder="Ex : Université de Yaoundé I, Association X…"></div></div>'
        + '<div class="fg"><div class="field"><label>Période</label>'
        + '<input type="text" placeholder="Ex : 2022–2023, Depuis Septembre 2023…"></div>'
        + '<div class="field"><label>Ce que vous y avez fait</label>'
        + '<input type="text" placeholder="Ex : Organisation d\'événements, gestion d\'une équipe de 12 membres…"></div></div>';
      document.getElementById('actBlocks').appendChild(el);
    }

    function addLang() {
      var gid = 'lg' + Date.now();
      var levs = ['Débutant', 'Intermédiaire', 'Courant', 'Bilingue', 'Langue maternelle'];
      var row = document.createElement('div'); row.className = 'lang-row';
      var lh = '<div class="lang-levels">';
      levs.forEach(function (l) { lh += '<span class="ll" data-g="' + gid + '" onclick="selLL(this,\'' + gid + '\')">' + l + '</span>'; });
      lh += '</div>';
      row.innerHTML = '<input type="text" placeholder="Ex : Français, Anglais, Arabe, Espagnol…">'
        + lh + '<button style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:.9rem;flex-shrink:0;padding:4px" onclick="this.parentElement.remove()">✕</button>';
      document.getElementById('langRows').appendChild(row);
    }

    function selLL(el, g) { document.querySelectorAll('[data-g="' + g + '"]').forEach(function (e) { e.classList.remove('on'); }); el.classList.add('on'); }
    function rmB(id) { var e = document.getElementById(id); if (e) e.remove(); }
    function toggleNoExp() {
      var ch = document.getElementById('noExp').checked;
      var btn = document.getElementById('addExpBtn');
      var bl = document.getElementById('expBlocks');
      if (btn) btn.style.display = ch ? 'none' : 'flex';
      if (bl) { bl.style.opacity = ch ? '.3' : '1'; bl.style.pointerEvents = ch ? 'none' : 'auto'; }
    }

    /* =============================================
       DATA COLLECTION
    ============================================= */
    function expandMonths(s) {
      if (!s) return s;
      var abbrs = { 'janv': 'Janvier', 'févr': 'Février', 'fevr': 'Février', 'avr': 'Avril', 'juil': 'Juillet', 'aout': 'Août', 'août': 'Août', 'sept': 'Septembre', 'oct': 'Octobre', 'nov': 'Novembre', 'dec': 'Décembre', 'déc': 'Décembre' };
      var res = s;
      for (var k in abbrs) { res = res.replace(new RegExp('\\\\b' + k + '\\\\.?', 'gi'), abbrs[k]); }
      return res;
    }

    function collect() {
      var d = {};
      d.firstName = gv('firstName'); d.lastName = gv('lastName');
      d.jobTitle = gv('jobTitle'); d.nationality = gv('nationality');
      d.city = gv('city'); d.phone = gv('phone'); d.email = gv('email');
      d.linkedin = gv('linkedin');
      d.links = [];
      document.querySelectorAll('#linksBlocks .link-row').forEach(function (r) {
        var sel = r.querySelector('select');
        var inp = r.querySelector('input[type=text]');
        var ta = r.querySelector('textarea');
        var url = inp ? inp.value.trim() : '';
        var lbl = sel ? sel.value : 'Lien';
        var desc = ta ? ta.value.trim() : '';
        if (url) d.links.push({ url: url, lbl: lbl, desc: desc });
      });
      d.profile = gv('profile'); d.hobbies = gv('hobbies'); d.photo = ST.photo;

      var dd = document.getElementById('dob_d').value, dm = document.getElementById('dob_m').value, dy = document.getElementById('dob_y').value;
      d.dob = (dd && dm && dy) ? String(dd).padStart(2, '0') + '/' + String(dm).padStart(2, '0') + '/' + dy : '';

      d.educations = [];
      document.querySelectorAll('#eduBlocks .rep-block').forEach(function (b) {
        var ins = b.querySelectorAll('input'); var sels = b.querySelectorAll('select'); var ta = b.querySelector('textarea');
        var deg = ins[0] ? ins[0].value.trim() : ''; var sch = ins[1] ? ins[1].value.trim() : '';
        var cty = ins[2] ? ins[2].value.trim() : ''; var men = ins[3] ? ins[3].value.trim() : '';
        var sy = sels[0] ? sels[0].value : ''; var ey = sels[1] ? sels[1].value : '';
        var desc = ta ? ta.value.trim() : '';
        if (deg || sch) d.educations.push({ deg: deg, sch: sch, cty: cty, men: men, sy: sy, ey: ey, desc: desc });
      });

      d.experiences = [];
      if (!document.getElementById('noExp').checked) {
        document.querySelectorAll('#expBlocks .rep-block').forEach(function (b) {
          var ins = b.querySelectorAll('input'); var sels = b.querySelectorAll('select'); var ta = b.querySelector('textarea');
          var ttl = ins[0] ? ins[0].value.trim() : ''; var cmp = ins[1] ? ins[1].value.trim() : '';
          var sm = sels[0] ? sels[0].value : ''; var sy = sels[1] ? sels[1].value : '';
          var em = sels[2] ? sels[2].value : ''; var ey = sels[3] ? sels[3].value : '';
          var start = [sm, sy].filter(function (x) { return x && x !== 'Mois' && x !== 'Année'; }).join(' ');
          var end = ey === 'En cours' ? 'En cours' : [em, ey].filter(function (x) { return x && x !== 'Mois' && x !== 'Année'; }).join(' ');
          var desc = ta ? ta.value.trim() : '';
          if (ttl || cmp) d.experiences.push({ ttl: ttl, cmp: cmp, start: start, end: end, desc: desc });
        });
      }

      d.projects = [];
      document.querySelectorAll('#projBlocks .rep-block').forEach(function (b) {
        var ins = b.querySelectorAll('input'); var ta = b.querySelector('textarea');
        var nm = ins[0] ? ins[0].value.trim() : ''; var per = ins[1] ? expandMonths(ins[1].value.trim()) : ''; var desc = ta ? ta.value.trim() : '';
        if (nm) d.projects.push({ nm: nm, per: per, desc: desc });
      });

      d.activities = [];
      document.querySelectorAll('#actBlocks .rep-block').forEach(function (b) {
        var ins = b.querySelectorAll('input');
        var role = ins[0] ? ins[0].value.trim() : ''; var org = ins[1] ? ins[1].value.trim() : '';
        var per = ins[2] ? expandMonths(ins[2].value.trim()) : ''; var descA = ins[3] ? ins[3].value.trim() : '';
        if (role) d.activities.push({ role: role, org: org, per: per, descA: descA });
      });

      d.skills = [];
      document.querySelectorAll('.sk-tag.on').forEach(function (t) {
        var txt = t.textContent.replace('✕', '').trim(); if (txt) d.skills.push(txt);
      });

      d.languages = [];
      document.querySelectorAll('#langRows .lang-row').forEach(function (r) {
        var inp = r.querySelector('input'); var lv = r.querySelector('.ll.on');
        var nm = inp ? inp.value.trim() : '';
        if (nm) d.languages.push({ nm: nm, lv: lv ? lv.textContent : '' });
      });

      return d;
    }

    function gv(id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; }

    /* =============================================
       GENERATE CV
    ============================================= */
    function generateCV() {
      var d = collect();
      /* On peut generer meme sans nom (apercu) */
      if (!ST.template) { showToast('Choisissez un modele (etape 2)'); return; }
      var html = renderTpl(d, ST.template);
      var out = document.getElementById('cv-out');
      out.innerHTML = html; out.style.transform = ''; out.style.transformOrigin = '';
      out.parentElement.style.height = '';
      setTimeout(function () {
        var cw = out.parentElement.clientWidth - 40; var cvW = out.scrollWidth;
        if (cvW > cw) { var sc = cw / cvW; out.style.transform = 'scale(' + sc + ')'; out.style.transformOrigin = 'top left'; out.parentElement.style.height = (out.scrollHeight * sc + 40) + 'px'; }
      }, 80);
      /* Ne pas appeler goStep(6) si on y est deja (evite une boucle infinie) */
      if (ST.step !== 6) goStep(6);
    }

    /* =============================================
       HELPER RENDERERS
    ============================================= */
    function esc(s) { if (!s) return ''; return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

    /* safeHtml: for textarea descriptions — allows <b><strong><em><i><br> but strips everything else */
    function safeHtml(s) {
      if (!s) return '';
      /* First escape everything */
      var escaped = String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      /* Then selectively re-allow safe formatting tags */
      escaped = escaped
        .replace(/&lt;(\/?)strong&gt;/gi, '<$1strong>')
        .replace(/&lt;(\/?)b&gt;/gi, '<$1b>')
        .replace(/&lt;(\/?)em&gt;/gi, '<$1em>')
        .replace(/&lt;(\/?)i&gt;/gi, '<$1i>')
        .replace(/&lt;br\s*\/?&gt;/gi, '<br>');
      /* Also convert newlines to <br> */
      escaped = escaped.replace(/\n/g, '<br>');
      return escaped;
    }

    function eduDate(e) {
      var p = [];
      if (e.sy && e.sy !== 'Année') p.push(e.sy);
      if (e.ey && e.ey !== 'Année') p.push(e.ey);
      return p.join(' - ');
    }
    function expDate(e) { return [e.start, e.end].filter(Boolean).join(' - '); }

    function photoEl(d, cls, ph) {
      if (d.photo) return '<img class="' + cls + '" src="' + d.photo + '" alt="photo">';
      return '<div class="' + ph + '">👤</div>';
    }

    function contacts(d, sep) {
      var p = [];
      if (d.phone) p.push('📞 ' + esc(d.phone));
      if (d.email) p.push('✉ ' + esc(d.email));
      if (d.city) p.push('📍 ' + esc(d.city));
      if (d.linkedin) p.push('in ' + esc(d.linkedin));
      if (d.website) p.push('🌐 ' + esc(d.website));
      if (d.dob) p.push('Né(e) le ' + esc(d.dob));
      if (d.nationality) p.push(esc(d.nationality));
      return p.join(sep || ' · ');
    }

    function renderLinks(d, cls) {
      if (!d.links || !d.links.length) return '';
      var h = '';
      d.links.forEach(function (l) {
        var url = l.url;
        var displayUrl = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
        h += '<div class="' + (cls || '') + '" style="margin-top:6px;margin-bottom:8px">'
          + '<strong>' + esc(l.lbl) + ' :</strong> <a href="' + (url.indexOf('http') === 0 ? url : 'https://' + url) + '" target="_blank" style="color:inherit;text-decoration:underline">' + esc(displayUrl) + '</a>'
          + (l.desc ? '<div style="font-size:0.9em;opacity:0.8;margin-top:2px">' + safeHtml(l.desc) + '</div>' : '')
          + '</div>';
      });
      return h;
    }

    function expSection(d, headCls, itemFn) {
      var h = '';
      if (d.educations.length) { h += '<div class="' + headCls + '">Formation</div>'; d.educations.forEach(function (e) { h += itemFn(e.deg, e.sch + (e.cty ? ', ' + e.cty : ''), eduDate(e), e.desc, e.men); }); }
      if (d.experiences.length) { h += '<div class="' + headCls + '">Expériences</div>'; d.experiences.forEach(function (e) { h += itemFn(e.ttl, e.cmp, expDate(e), e.desc, ''); }); }
      if (d.projects && d.projects.length) { h += '<div class="' + headCls + '">Projets académiques</div>'; d.projects.forEach(function (p) { h += itemFn(p.nm, '', p.per, p.desc, ''); }); }
      if (d.activities && d.activities.length) { h += '<div class="' + headCls + '">Activités &amp; Bénévolat</div>'; d.activities.forEach(function (a) { h += itemFn(a.role, a.org, a.per, a.descA, ''); }); }
      return h;
    }

    /* =============================================
       UNIVERSAL TEMPLATE RENDERER
    ============================================= */
    function renderTpl(d, tpl) {
      var thmCfg = {
        't1': { bg: '#14213D', hl: '#14213D', font: 'Georgia, serif' },
        't2': { bg: '#1E3A8A', hl: '#2563EB', font: '\'Plus Jakarta Sans\', sans-serif' },
        't3': { bg: '#111111', hl: '#D97706', font: '\'Plus Jakarta Sans\', sans-serif' },
        't4': { bg: '#1E1B4B', hl: '#6366F1', font: '\'Plus Jakarta Sans\', sans-serif' },
        't5': { bg: '#333333', hl: '#111111', font: 'Arial, sans-serif' },
        't6': { bg: '#0F172A', hl: '#1E3A8A', font: '\'Plus Jakarta Sans\', sans-serif' },
        't7': { bg: '#1A3C34', hl: '#059669', font: '\'Plus Jakarta Sans\', sans-serif' },
        't8': { bg: '#C0544A', hl: '#C0544A', font: '\'Plus Jakarta Sans\', sans-serif' },
        't9': { bg: '#0F172A', hl: '#818CF8', font: '\'Plus Jakarta Sans\', sans-serif' },
        't10': { bg: '#111111', hl: '#F59E0B', font: '\'Plus Jakarta Sans\', sans-serif' }
      };
      var cfg = thmCfg[tpl] || thmCfg['t1'];
      var name = (d.lastName + ' ' + d.firstName).trim() || 'Votre Nom';

      var h = '<div class="cv-universal" style="--bg:' + cfg.bg + '; --hl:' + cfg.hl + '; --font:' + cfg.font + '">';

      /* --- LEFT COLUMN --- */
      h += '<div class="cv-left">';
      if (d.photo) h += '<img class="photo" src="' + d.photo + '" alt="photo">';
      else h += '<div class="photo" style="display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.2)">👤</div>';

      h += '<div class="name">' + esc(name) + '</div>';
      if (d.jobTitle) h += '<div class="job-title">' + esc(d.jobTitle) + '</div>';

      function lItem(icon, text) {
        if (!text) return '';
        return '<div class="l-item"><div class="l-item-icon">' + icon + '</div><div>' + esc(text) + '</div></div>';
      }

      h += '<div class="l-title">CONTACT</div>';
      h += lItem('📞', d.phone);
      h += lItem('✉', d.email);
      h += lItem('📍', d.city);
      h += lItem('in', d.linkedin);
      if (d.website) h += lItem('🌐', d.website);

      if (d.dob || d.nationality) {
        h += '<div class="l-title">INFOS</div>';
        if (d.dob) h += lItem('📅', 'Né(e) le ' + d.dob);
        if (d.nationality) h += lItem('🌍', d.nationality);
      }

      if (d.skills && d.skills.length) {
        h += '<div class="l-title">COMPÉTENCES</div><div class="l-bullet-list">';
        d.skills.forEach(function (s) { h += '<div class="l-bullet">• ' + esc(s) + '</div>'; });
        h += '</div>';
      }

      if (d.languages && d.languages.length) {
        h += '<div class="l-title">LANGUES</div><div class="l-bullet-list">';
        d.languages.forEach(function (l) {
          h += '<div class="l-bullet">• ' + esc(l.nm) + (l.lv ? ' - ' + esc(l.lv) : '') + '</div>';
        });
        h += '</div>';
      }

      if (d.hobbies) {
        h += '<div class="l-title">INTÉRÊTS</div>';
        h += '<div style="font-size:11px;color:rgba(255,255,255,0.9);line-height:1.4">' + esc(d.hobbies) + '</div>';
      }
      h += '</div>';

      /* --- RIGHT COLUMN --- */
      h += '<div class="cv-right">';

      if (d.profile) {
        h += '<div class="r-section"><div class="r-title">PROFIL</div>';
        h += '<div class="m-profile">' + safeHtml(d.profile) + '</div></div>';
      }

      function rItem(title, org, date, desc, men) {
        var r = '<div class="p-item"><div class="p-head"><div class="p-title">' + esc(title) + '</div><div class="p-date">' + esc(date) + '</div></div>';
        if (org) r += '<div class="p-org">' + esc(org) + '</div>';
        if (men) r += '<div class="p-men">Mention : ' + esc(men) + '</div>';
        if (desc) r += '<div class="p-desc">' + safeHtml(desc) + '</div>';
        return r + '</div>';
      }

      if (d.educations && d.educations.length) {
        h += '<div class="r-section"><div class="r-title">FORMATION</div>';
        d.educations.forEach(function (e) {
          h += rItem(e.deg, e.sch + (e.cty ? ', ' + e.cty : ''), eduDate(e), e.desc, e.men);
        });
        h += '</div>';
      }

      if (d.experiences && d.experiences.length) {
        h += '<div class="r-section"><div class="r-title">EXPÉRIENCE PROFESSIONNELLE</div>';
        d.experiences.forEach(function (e) {
          h += rItem(e.ttl, e.cmp, expDate(e), e.desc, '');
        });
        h += '</div>';
      }

      if (d.projects && d.projects.length) {
        h += '<div class="r-section"><div class="r-title">PROJETS ACADÉMIQUES</div>';
        d.projects.forEach(function (p) { h += rItem(p.nm, '', p.per, p.desc, ''); });
        h += '</div>';
      }

      if (d.activities && d.activities.length) {
        h += '<div class="r-section"><div class="r-title">ACTIVITÉS & BÉNÉVOLAT</div>';
        d.activities.forEach(function (a) { h += rItem(a.role, a.org, a.per, a.descA, ''); });
        h += '</div>';
      }

      if (d.links && d.links.length) {
        h += '<div class="r-section"><div class="r-title">LIENS & PROJETS</div>';
        d.links.forEach(function (l) {
          var url = l.url.indexOf('http') === 0 ? l.url : 'https://' + l.url;
          h += '<div class="p-link"><strong>' + esc(l.lbl) + ' : </strong><a href="' + url + '" target="_blank">' + esc(l.url.replace(/^https?:\/\//, '').replace(/^www\./, '')) + '</a>';
          if (l.desc) h += '<div class="p-link-desc">' + safeHtml(l.desc) + '</div>';
          h += '</div>';
        });
        h += '</div>';
      }

      h += '</div>';
      return h + '</div>';
    }

    /* =============================================
       LIENS MULTIPLES
    ============================================= */
    var LINK_TYPES = ['GitHub', 'GitLab', 'Portfolio', 'Site web', 'Application', 'Behance', 'Dribbble', 'Autre'];
    function addLink() {
      var id = 'lnk' + (++bc);
      var row = document.createElement('div');
      row.className = 'link-row'; row.id = id;
      row.style.cssText = 'border:1.5px dashed var(--border2);border-radius:12px;padding:12px;margin-bottom:12px;display:flex;flex-direction:column;gap:10px;position:relative;background:rgba(247,245,240,0.5)';
      var opts = LINK_TYPES.map(function (l) { return '<option>' + l + '</option>'; }).join('');
      row.innerHTML = '<button type="button" onclick="rmB(\'' + id + '\')" style="position:absolute;top:8px;right:8px;background:none;border:none;color:var(--muted2);cursor:pointer;font-size:1rem;width:26px;height:26px;display:flex;align-items:center;justify-content:center;transition:color .2s" onmouseover="this.style.color=\'#dc2626\'" onmouseout="this.style.color=\'\'">&#x2715;</button>'
        + '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">'
        + '<select style="font-family:inherit;font-size:.82rem;padding:9px 10px;border:1.5px solid var(--border);border-radius:9px;background:var(--bg);color:var(--ink);outline:none;cursor:pointer;width:120px">' + opts + '</select>'
        + '<input type="text" placeholder="URL (ex: https://github.com/...)" style="font-family:inherit;font-size:.84rem;padding:9px 12px;border:1.5px solid var(--border);border-radius:9px;color:var(--ink);background:var(--bg);outline:none;flex:1;min-width:180px">'
        + '</div>'
        + '<textarea placeholder="Description courte (ex: Projet de fin d\'études, application mobile...)" style="font-family:inherit;font-size:.82rem;padding:8px 12px;border:1.5px solid var(--border);border-radius:9px;color:var(--ink);background:var(--bg);outline:none;resize:vertical;min-height:50px"></textarea>';
      document.getElementById('linksBlocks').appendChild(row);
    }

    /* =============================================
       IMPORT DOCUMENT
    ============================================= */
    /* =============================================
       IMPORT CV — extraction IA complète
       Lit le fichier → extrait le texte → envoie à
       l'API Claude → remplit TOUS les champs
    ============================================= */
    function importCV(inp) {
      if (!inp.files || !inp.files[0]) return;
      var file = inp.files[0];
      var ext = file.name.split('.').pop().toLowerCase();
      var st = document.getElementById('importStatus');

      st.style.cssText = 'display:flex;align-items:center;gap:10px;color:var(--accent);font-size:.85rem;font-weight:600;margin-top:12px;padding:14px 16px;background:var(--al);border-radius:12px';
      st.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;flex-shrink:0"></div>'
        + '<div><strong>Lecture du document...</strong><br><span style="font-weight:400;opacity:.8">Extraction des informations en cours</span></div>';

      if (ext === 'docx') {
        /* Charger mammoth pour extraire le texte Word */
        var loadMammoth = function (cb) {
          if (window.mammoth) { cb(); return; }
          var s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js';
          s.onload = cb;
          s.onerror = function () {
            st.style.color = 'var(--red)';
            st.innerHTML = '&#9888; Impossible de charger le module Word. Verifiez votre connexion.';
          };
          document.head.appendChild(s);
        };
        loadMammoth(function () {
          var r = new FileReader();
          r.onload = function (e) {
            mammoth.extractRawText({ arrayBuffer: e.target.result }).then(function (res) {
              var txt = res.value || '';
              if (!txt.trim()) {
                st.style.color = 'var(--red)';
                st.innerHTML = '&#9888; Document vide ou illisible.';
                return;
              }
              st.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;flex-shrink:0"></div>'
                + '<div><strong>Analyse IA en cours...</strong><br><span style="font-weight:400;opacity:.8">Claude extrait toutes vos informations</span></div>';
              extractWithAI(txt, st);
            }).catch(function () {
              st.style.color = 'var(--red)';
              st.innerHTML = '&#9888; Impossible de lire ce fichier Word.';
            });
          };
          r.readAsArrayBuffer(file);
        });

      } else if (ext === 'pdf') {
        /* Lire le PDF en base64 et envoyer directement à Claude (supporte les PDFs) */
        var r = new FileReader();
        r.onload = function (e) {
          var base64 = e.target.result.split(',')[1];
          st.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;flex-shrink:0"></div>'
            + '<div><strong>Analyse IA en cours...</strong><br><span style="font-weight:400;opacity:.8">Claude lit votre PDF et extrait toutes vos infos</span></div>';
          extractPDFWithAI(base64, st);
        };
        r.readAsDataURL(file);

      } else {
        st.style.color = 'var(--red)';
        st.innerHTML = '&#9888; Format non supporte. Utilisez <strong>.docx</strong> (Word) ou <strong>.pdf</strong>';
      }
    }

    /* Extraction IA depuis texte (Word) */
    async function extractWithAI(cvText, stEl) {
      var prompt = buildExtractionPrompt(cvText);
      try {
        var response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2000,
            messages: [{ role: 'user', content: prompt }]
          })
        });
        var data = await response.json();
        var txt = data.content && data.content[0] ? data.content[0].text : '';
        var json = parseAIResponse(txt);
        if (json) {
          fillAllFields(json);
          stEl.style.background = 'rgba(45,106,79,.1)'; stEl.style.color = 'var(--sage)';
          stEl.innerHTML = '&#10003; <div><strong>CV importe avec succes !</strong><br><span style="font-weight:400">Toutes vos informations ont ete remplies automatiquement.</span></div>';
          setTimeout(function () { goStep(1); }, 2000);
        } else {
          stEl.style.color = 'var(--red)';
          stEl.innerHTML = '&#9888; Extraction impossible. Verifiez votre connexion et reessayez.';
        }
      } catch (err) {
        console.error(err);
        stEl.style.color = 'var(--red)';
        stEl.innerHTML = '&#9888; Erreur reseau. Verifiez votre connexion internet.';
      }
    }

    /* Extraction IA depuis PDF (base64) */
    async function extractPDFWithAI(base64, stEl) {
      try {
        var response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2000,
            messages: [{
              role: 'user',
              content: [
                { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } },
                { type: 'text', text: buildExtractionPrompt('') }
              ]
            }]
          })
        });
        var data = await response.json();
        var txt = data.content && data.content[0] ? data.content[0].text : '';
        var json = parseAIResponse(txt);
        if (json) {
          fillAllFields(json);
          stEl.style.background = 'rgba(45,106,79,.1)'; stEl.style.color = 'var(--sage)';
          stEl.innerHTML = '&#10003; <div><strong>CV PDF importe avec succes !</strong><br><span style="font-weight:400">Toutes vos informations ont ete remplies automatiquement.</span></div>';
          setTimeout(function () { goStep(1); }, 2000);
        } else {
          stEl.style.color = 'var(--red)';
          stEl.innerHTML = '&#9888; Extraction impossible. Reessayez ou remplissez manuellement.';
        }
      } catch (err) {
        console.error(err);
        stEl.style.color = 'var(--red)';
        stEl.innerHTML = '&#9888; Erreur reseau.';
      }
    }

    function buildExtractionPrompt(cvText) {
      return 'Analyse ce CV et extrait TOUTES les informations. Reponds UNIQUEMENT avec un objet JSON valide, sans texte avant ou apres, sans balises markdown.\n\n'
        + 'Format JSON exact a respecter:\n'
        + '{\n'
        + '"firstName":"",\n'
        + '"lastName":"",\n'
        + '"jobTitle":"",\n'
        + '"email":"",\n'
        + '"phone":"",\n'
        + '"city":"",\n'
        + '"nationality":"",\n'
        + '"dob":"JJ/MM/AAAA ou vide",\n'
        + '"linkedin":"url ou vide",\n'
        + '"links":[{"lbl":"GitHub","url":""},{"lbl":"Portfolio","url":""}],\n'
        + '"profile":"resume professionnel complet",\n'
        + '"educations":[{"deg":"diplome","sch":"etablissement","cty":"ville","men":"mention","sy":"annee debut","ey":"annee fin","desc":"description"}],\n'
        + '"experiences":[{"ttl":"poste","cmp":"entreprise","start":"mois complet annee (ex: Janvier 2023)","end":"mois complet annee ou En cours","desc":"description detaillee"}],\n'
        + '"skills":["competence1","competence2"],\n'
        + '"languages":[{"nm":"langue","lv":"niveau"}],\n'
        + '"hobbies":"loisirs et interets"\n'
        + '}\n\n'
        + 'CV a analyser:\n' + cvText;
    }

    function parseAIResponse(txt) {
      try {
        /* Enlever les balises markdown si presentes */
        var clean = txt.replace(/```json/gi, '').replace(/```/g, '').trim();
        /* Trouver le JSON entre { et } */
        var start = clean.indexOf('{');
        var end = clean.lastIndexOf('}');
        if (start > -1 && end > -1) {
          return JSON.parse(clean.substring(start, end + 1));
        }
      } catch (e) { console.error('parseAIResponse error:', e, txt); }
      return null;
    }

    /* Remplit TOUS les champs du formulaire avec les donnees extraites */
    function fillAllFields(d) {
      function sv(id, val) { var e = document.getElementById(id); if (e && val) e.value = val; }

      /* Infos personnelles */
      sv('firstName', d.firstName);
      sv('lastName', d.lastName);
      sv('jobTitle', d.jobTitle);
      sv('email', d.email);
      sv('phone', d.phone);
      sv('city', d.city);
      sv('nationality', d.nationality);
      sv('linkedin', d.linkedin);
      sv('profile', d.profile);
      sv('hobbies', d.hobbies);

      /* Date de naissance */
      if (d.dob) {
        var parts = d.dob.split('/');
        if (parts.length === 3) {
          var dd = document.getElementById('dob_d'); var dm = document.getElementById('dob_m'); var dy = document.getElementById('dob_y');
          if (dd) dd.value = parseInt(parts[0], 10);
          if (dm) dm.value = parseInt(parts[1], 10);
          if (dy) dy.value = parts[2];
        }
      }

      /* Liens multiples */
      if (d.links && d.links.length) {
        d.links.forEach(function (l) {
          if (!l.url) return;
          addLink();
          var rows = document.querySelectorAll('#linksBlocks .link-row');
          if (rows.length) {
            var lr = rows[rows.length - 1];
            var sel = lr.querySelector('select');
            var inp = lr.querySelector('input');
            var ta = lr.querySelector('textarea');
            if (sel && l.lbl) sel.value = l.lbl;
            if (inp) inp.value = l.url;
            if (ta && l.desc) ta.value = l.desc;
          }
        });
      }

      /* Formations */
      if (d.educations && d.educations.length) {
        /* Vider les blocs existants */
        var eb = document.getElementById('eduBlocks');
        if (eb) eb.innerHTML = '';
        d.educations.forEach(function (e) {
          addEdu();
          var blocs = document.querySelectorAll('#eduBlocks .rep-block');
          if (!blocs.length) return;
          var b = blocs[blocs.length - 1];
          var ins = b.querySelectorAll('input');
          var sels = b.querySelectorAll('select');
          var ta = b.querySelector('textarea');
          if (ins[0]) ins[0].value = e.deg || '';
          if (ins[1]) ins[1].value = e.sch || '';
          if (ins[2]) ins[2].value = e.cty || '';
          if (ins[3]) ins[3].value = e.men || '';
          if (sels[0] && e.sy) sels[0].value = e.sy;
          if (sels[1] && e.ey) sels[1].value = e.ey;
          if (ta) ta.value = e.desc || '';
        });
      }

      /* Experiences */
      if (d.experiences && d.experiences.length) {
        /* Decocher "Aucune experience" */
        var noExp = document.getElementById('noExp');
        if (noExp) noExp.checked = false;
        var expB = document.getElementById('expBlocks');
        if (expB) expB.innerHTML = '';
        /* Afficher le bloc experiences */
        var expSec = document.getElementById('expSection');
        if (expSec) expSec.style.display = 'block';
        d.experiences.forEach(function (e) {
          addExp();
          var blocs = document.querySelectorAll('#expBlocks .rep-block');
          if (!blocs.length) return;
          var b = blocs[blocs.length - 1];
          var ins = b.querySelectorAll('input');
          var sels = b.querySelectorAll('select');
          var ta = b.querySelector('textarea');
          if (ins[0]) ins[0].value = e.ttl || '';
          if (ins[1]) ins[1].value = e.cmp || '';
          if (ta) ta.value = e.desc || '';
          /* Dates : start = "mois annee", on met dans les selects */
          if (e.start) {
            var sp = e.start.split(' ');
            /* Chercher le mois et l'annee */
            var mo = MONTHS.findIndex(function (m) { return sp[0] && m.toLowerCase().indexOf(sp[0].toLowerCase()) === 0; });
            if (mo > -1 && sels[0]) sels[0].value = MONTHS[mo];
            var yr = sp.find(function (s) { return s.match(/^\d{4}$/); });
            if (yr && sels[1]) sels[1].value = yr;
          }
          if (e.end) {
            if (e.end === 'En cours' || e.end === 'en cours') {
              if (sels[3]) sels[3].value = 'En cours';
            } else {
              var ep = e.end.split(' ');
              var mo2 = MONTHS.findIndex(function (m) { return ep[0] && m.toLowerCase().indexOf(ep[0].toLowerCase()) === 0; });
              if (mo2 > -1 && sels[2]) sels[2].value = MONTHS[mo2];
              var yr2 = ep.find(function (s) { return s.match(/^\d{4}$/); });
              if (yr2 && sels[3]) sels[3].value = yr2;
            }
          }
        });
      }

      /* Competences */
      if (d.skills && d.skills.length) {
        /* Activer les competences qui existent dans le cloud */
        document.querySelectorAll('.sk-tag').forEach(function (t) {
          var label = t.textContent.replace('✕', '').trim();
          var found = d.skills.some(function (s) { return s.toLowerCase() === label.toLowerCase(); });
          if (found) t.classList.add('on');
        });
        /* Ajouter les competences manquantes comme custom */
        d.skills.forEach(function (s) {
          var exists = false;
          document.querySelectorAll('.sk-tag').forEach(function (t) {
            if (t.textContent.replace('✕', '').trim().toLowerCase() === s.toLowerCase()) exists = true;
          });
          if (!exists && s) {
            var ci = document.getElementById('customSkill');
            if (ci) { ci.value = s; addCustomSkill(); }
          }
        });
      }

      /* Langues */
      if (d.languages && d.languages.length) {
        var lr2 = document.getElementById('langRows');
        if (lr2) lr2.innerHTML = '';
        d.languages.forEach(function (l) {
          addLang();
          var rows = document.querySelectorAll('#langRows .lang-row');
          if (!rows.length) return;
          var row = rows[rows.length - 1];
          var inp = row.querySelector('input');
          if (inp) inp.value = l.nm || '';
          /* Activer le niveau */
          if (l.lv) {
            var lvls = row.querySelectorAll('.ll');
            lvls.forEach(function (btn) {
              if (btn.textContent.toLowerCase() === l.lv.toLowerCase() ||
                (l.lv.toLowerCase().indexOf(btn.textContent.toLowerCase()) > -1) ||
                (btn.textContent.toLowerCase().indexOf(l.lv.toLowerCase()) > -1)) {
                row.querySelectorAll('.ll').forEach(function (b) { b.classList.remove('on'); });
                btn.classList.add('on');
              }
            });
          }
        });
      }
    }

    /* =============================================
       DOWNLOAD PDF — impression navigateur (sans coupure)
    ============================================= */
    function downloadPDF() {
      generateCV();
      var el = document.getElementById('cv-out');
      if (!el || !el.innerHTML.trim()) { showToast('Generez d\'abord votre CV !'); return; }
      var savedT = el.style.transform; var savedTO = el.style.transformOrigin;
      var par = el.parentElement; var savedH = par.style.height; var savedO = par.style.overflow;
      el.style.transform = 'none'; el.style.transformOrigin = 'top left';
      par.style.height = 'auto'; par.style.overflow = 'visible';
      setTimeout(function () {
        window.print();
        setTimeout(function () { el.style.transform = savedT; el.style.transformOrigin = savedTO; par.style.height = savedH; par.style.overflow = savedO; }, 800);
      }, 120);
    }

    /* =============================================
       DOWNLOAD WORD (.docx)
    ============================================= */
    function downloadWord() {
      var el = document.getElementById('cv-out');
      if (!el || !el.innerHTML.trim()) { showToast('Generez d\'abord votre CV !'); return; }
      document.getElementById('loading').classList.add('show');
      if (window.docx) { _buildWord(); }
      else {
        var s = document.createElement('script');
        /* Utilisation de jsDelivr (souvent mieux accepté par la protection contre le pistage) */
        s.src = 'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.min.js';
        s.onload = _buildWord;
        s.onerror = function () {
          /* Fallback vers un autre CDN si le premier est bloqué */
          var s2 = document.createElement('script');
          s2.src = 'https://unpkg.com/docx@8.5.0/build/index.umd.min.js';
          s2.onload = _buildWord;
          s2.onerror = function () {
            document.getElementById('loading').classList.remove('show');
            showToast('Erreur : La bibliothèque de téléchargement Word est bloquée par votre navigateur.');
          };
          document.head.appendChild(s2);
        };
        document.head.appendChild(s);
      }
    }
    function _buildWord() {
      try {
        var d = collect(); var name = (d.lastName + ' ' + d.firstName).trim() || 'Mon CV';
        var Para = window.docx.Paragraph, TR = window.docx.TextRun, Doc = window.docx.Document, Pack = window.docx.Packer, EL = window.docx.ExternalHyperlink, IMG = window.docx.ImageRun;
        var Table = window.docx.Table, TableRow = window.docx.TableRow, TableCell = window.docx.TableCell, WidthType = window.docx.WidthType, BorderStyle = window.docx.BorderStyle, AlignmentType = window.docx.AlignmentType;

        var thmCfg = {
          't1': { bg: '14213D', fg: 'FFFFFF', hl: '14213D' },
          't2': { bg: '1E3A8A', fg: 'FFFFFF', hl: '2563EB' },
          't3': { bg: '111111', fg: 'FFFFFF', hl: 'D97706' },
          't4': { bg: '1E1B4B', fg: 'FFFFFF', hl: '6366F1' },
          't5': { bg: '333333', fg: 'FFFFFF', hl: '111111' },
          't6': { bg: '0F172A', fg: 'FFFFFF', hl: '1E3A8A' },
          't7': { bg: '1A3C34', fg: 'FFFFFF', hl: '059669' },
          't8': { bg: 'C0544A', fg: 'FFFFFF', hl: 'C0544A' },
          't9': { bg: '0F172A', fg: 'FFFFFF', hl: '818CF8' },
          't10': { bg: '111111', fg: 'FFFFFF', hl: 'F59E0B' }
        };
        var cfg = thmCfg[ST.template] || thmCfg['t1'];

        function tl(s, o) { return new TR(Object.assign({ text: String(s || ''), color: cfg.fg, font: 'Arial', size: 20 }, o || {})); }
        function pl(ch, o) { return new Para(Object.assign({ children: Array.isArray(ch) ? ch : [ch] }, o || {})); }
        function hl(s) { return pl([tl(s, { bold: true, size: 26, color: cfg.fg })], { spacing: { before: 240, after: 120 } }); }

        function tr(s, o) { return new TR(Object.assign({ text: String(s || ''), color: '333333', font: 'Arial', size: 20 }, o || {})); }
        function pr(ch, o) { return new Para(Object.assign({ children: Array.isArray(ch) ? ch : [ch] }, o || {})); }
        function hr(s) { return pr([tr(s, { bold: true, size: 26, color: cfg.hl })], { spacing: { before: 240, after: 120 } }); }

        function sepr() { return pr([tr('')], { border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: cfg.hl, space: 1 } }, spacing: { before: 60, after: 60 } }); }

        var left = [];
        var right = [];

        if (d.photo) {
          try {
            var b64 = d.photo.split(',')[1];
            left.push(pl([new IMG({
              data: Uint8Array.from(atob(b64), function (c) { return c.charCodeAt(0); }),
              transformation: { width: 100, height: 100 }
            })], { spacing: { after: 200 }, alignment: AlignmentType.CENTER }));
          } catch (ex) { console.warn('Photo Word error:', ex); }
        }

        left.push(pl([tl(name, { bold: true, size: 36 })], { spacing: { after: 80 }, alignment: AlignmentType.CENTER }));
        if (d.jobTitle) left.push(pl([tl(d.jobTitle, { size: 22, italics: true })], { spacing: { after: 240 }, alignment: AlignmentType.CENTER }));

        left.push(hl('CONTACT'));
        if (d.phone) left.push(pl([tl('📞 ' + d.phone)], { spacing: { after: 80 } }));
        if (d.email) left.push(pl([tl('✉ ' + d.email)], { spacing: { after: 80 } }));
        if (d.city) left.push(pl([tl('📍 ' + d.city)], { spacing: { after: 80 } }));
        if (d.linkedin) left.push(pl([tl('in ' + d.linkedin)], { spacing: { after: 80 } }));
        if (d.website) left.push(pl([tl('🌐 ' + d.website)], { spacing: { after: 80 } }));

        var infos = [];
        if (d.dob) infos.push('📅 ' + d.dob);
        if (d.nationality) infos.push('🌍 ' + d.nationality);
        if (infos.length) {
          left.push(hl('INFOS'));
          infos.forEach(function (i) { left.push(pl([tl(i)], { spacing: { after: 80 } })); });
        }

        if (d.skills.length) {
          left.push(hl('COMPÉTENCES'));
          d.skills.forEach(function (s) { left.push(pl([tl('• ' + s)], { spacing: { after: 60 } })); });
        }

        if (d.languages.length) {
          left.push(hl('LANGUES'));
          d.languages.forEach(function (l) { left.push(pl([tl('• ' + l.nm + (l.lv ? ' - ' + l.lv : ''))], { spacing: { after: 60 } })); });
        }

        if (d.hobbies) {
          left.push(hl('INTÉRÊTS'));
          left.push(pl([tl(d.hobbies)], { spacing: { after: 60 } }));
        }

        function rItem(ti, org, dt, desc) {
          var rows = [pr([tr(ti, { bold: true, size: 22, color: '111111' }), tr(dt ? ' | ' + dt : '', { size: 20, color: '888888', italics: true })], { spacing: { before: 120, after: 40 } })];
          if (org) rows.push(pr([tr(org, { italics: true, size: 20, color: cfg.hl })], { spacing: { after: 40 } }));
          if (desc) rows.push(pr([tr(desc, { size: 20, color: '444444' })], { spacing: { after: 80 } }));
          return rows;
        }

        if (d.profile) { right.push(hr('PROFIL')); right.push(pr([tr(d.profile)], { spacing: { after: 120 } })); right.push(sepr()); }

        if (d.educations.length) {
          right.push(hr('FORMATION'));
          d.educations.forEach(function (e) {
            var dt = [e.sy, e.ey].filter(Boolean).join(' - ');
            rItem(e.deg, e.sch + (e.cty ? ', ' + e.cty : ''), dt, e.desc).forEach(function (r) { right.push(r); });
            if (e.men) right.push(pr([tr('Mention : ' + e.men, { size: 18, color: '666666' })], { spacing: { after: 60 } }));
          });
          right.push(sepr());
        }

        if (d.experiences.length) {
          right.push(hr('EXPÉRIENCE PROFESSIONNELLE'));
          d.experiences.forEach(function (e) {
            rItem(e.ttl, e.cmp, [e.start, e.end].filter(Boolean).join(' - '), e.desc).forEach(function (r) { right.push(r); });
          });
          right.push(sepr());
        }

        if (d.projects && d.projects.length) {
          right.push(hr('PROJETS ACADÉMIQUES'));
          d.projects.forEach(function (pj) { rItem(pj.nm, '', pj.per, pj.desc).forEach(function (r) { right.push(r); }); });
          right.push(sepr());
        }

        if (d.activities && d.activities.length) {
          right.push(hr('ACTIVITÉS & BÉNÉVOLAT'));
          d.activities.forEach(function (a) { rItem(a.role, a.org, a.per, a.descA).forEach(function (r) { right.push(r); }); });
          right.push(sepr());
        }

        if (d.links && d.links.length) {
          right.push(hr('LIENS & PROJETS'));
          d.links.forEach(function (l) {
            var url = l.url.indexOf('http') === 0 ? l.url : 'https://' + l.url;
            var children = [tr(l.lbl + ' : ', { bold: true, size: 20 })];
            try { children.push(new EL({ children: [tr(l.url, { size: 20, color: cfg.hl, underline: true })], link: url })); }
            catch (ex) { children.push(tr(l.url, { size: 20, color: cfg.hl })); }
            right.push(pr(children, { spacing: { before: 80, after: 40 } }));
            if (l.desc) right.push(pr([tr(l.desc, { size: 18, color: '666666' })], { spacing: { after: 80 } }));
          });
        }

        var table = new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: { top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 32, type: WidthType.PERCENTAGE },
                  shading: { fill: cfg.bg },
                  margins: { top: 300, bottom: 300, left: 300, right: 300 },
                  children: left
                }),
                new TableCell({
                  width: { size: 68, type: WidthType.PERCENTAGE },
                  margins: { top: 300, bottom: 300, left: 400, right: 300 },
                  children: right
                })
              ]
            })
          ]
        });

        var doc = new Doc({
          sections: [{ properties: { page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } } }, children: [table] }]
        });

        Pack.toBlob(doc).then(function (blob) {
          var url = URL.createObjectURL(blob); var a = document.createElement('a'); a.href = url; a.download = 'CV_' + (d.firstName || 'Mon') + '_' + (d.lastName || 'CV') + '.docx'; document.body.appendChild(a); a.click();
          setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 1000);
          showToast('Fichier Word (.docx) telecharge !'); document.getElementById('loading').classList.remove('show');
        }).catch(function (err) { console.error(err); showToast('Erreur Word.'); document.getElementById('loading').classList.remove('show'); });
      } catch (err) { console.error(err); showToast('Erreur lors de la creation Word.'); document.getElementById('loading').classList.remove('show'); }
    }


    function showToast(msg) {
      var t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show');
      setTimeout(function () { t.classList.remove('show'); }, 3500);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && document.activeElement && document.activeElement.id === 'customSkill') addCustomSkill();
    });

    /* =============================================
       SAUVEGARDE LOCALE (AUTOSAVE)
    ============================================= */
    function saveToLocal() {
      try {
        var d = collect();
        d._navigation = { step: ST.step, domain: ST.domain, template: ST.template };
        localStorage.setItem('creacv_autosave', JSON.stringify(d));
      } catch (e) { console.warn('Erreur de sauvegarde locale:', e); }
    }

    function loadFromLocal() {
      try {
        var raw = localStorage.getItem('creacv_autosave');
        if (!raw) return;
        var d = JSON.parse(raw);
        if (!d) return;
        fillAllFields(d);
        if (d._navigation) {
          if (d._navigation.domain) {
            var el = document.querySelector('.dom-card[data-d="' + d._navigation.domain + '"]');
            if (el) selDom(el);
          }
          if (d._navigation.template) {
            var el = document.querySelector('.tpl-card[data-t="' + d._navigation.template + '"]');
            if (el) selTpl(el);
          }
          if (d._navigation.step > 0) goStep(d._navigation.step);
        }
        showToast('✅ Vos informations ont été restaurées automatiquement.');
      } catch (e) { console.warn('Erreur de chargement local:', e); }
    }

    /* Remplacer rmB pour sauver lors de la suppression */
    var originalRmB = rmB;
    rmB = function (id) { originalRmB(id); saveToLocal(); };
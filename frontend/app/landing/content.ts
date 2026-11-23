import type { Metadata } from "next";

export type Lang = "en" | "pt" | "es" | "fr";

export const LANGS: { code: Lang; short: string; name: string; path: string }[] = [
  { code: "en", short: "EN", name: "English", path: "/landing" },
  { code: "pt", short: "PT", name: "Português", path: "/landing/pt" },
  { code: "es", short: "ES", name: "Español", path: "/landing/es" },
  { code: "fr", short: "FR", name: "Français", path: "/landing/fr" },
];

export const SITE_URL = "https://stark-snowy.vercel.app";

export type Content = {
  htmlLang: string;
  meta: { title: string; description: string };
  nav: { how: string; source: string; demo: string; main: string; languages: string };
  hero: {
    h1: string;
    lede: string;
    demo: string;
    source: string;
    noteBefore: string;
    noteAfter: string;
  };
  example: {
    workspace: string;
    question: string;
    /** Text around the two citation markers: before 1, between 1 and 2, after 2. */
    answer: [string, string, string];
    sources: { file: string; where: string; before: string; mark: string; after: string }[];
    caption: string;
    sourcesLabel: string;
    sourceAria: string;
  };
  flow: {
    title: string;
    intro: string;
    label: string;
    replay: string;
    stages: { title: string; text: string }[][];
  };
  features: {
    title: string;
    items: { title: string; body: string }[];
  };
  close: { title: string; body: string };
  footer: { before: string; after: string };
};

// Code excerpts are the same in every language: they are the repo's own code.
export const FEATURE_CODE: { file: string; code: string[] }[] = [
  {
    file: "backend/app/services",
    code: [
      "ingestion/extractors.py",
      "ocr/tesseract_service.py",
      "audio/transcription_service.py",
      "parsers/email_parser.py",
      "parsers/slack_parser.py",
    ],
  },
  {
    file: "retrieval_service.py",
    code: [
      "semantic = vector search, top_k >= 20",
      "lexical  = BM25 search,   top_k >= 20",
      "fused    = reciprocal rank fusion (k = 60)",
      "ranked   = cross-encoder over the top candidates",
    ],
  },
  {
    file: "core/config.py",
    code: [
      'ollama_base_url: str = "http://host.docker.internal:11434"',
      'ollama_keep_alive: str = "5m"',
      'default_whisper_model: str = "base"',
    ],
  },
  {
    file: "services/vectorstore",
    code: ["chroma_store.py   local", "pinecone_store.py hosted", "bm25_store.py     lexical index"],
  },
];

export const CONTENT: Record<Lang, Content> = {
  en: {
    htmlLang: "en",
    meta: {
      title: "Stark | Ask your documents, see where the answer came from",
      description:
        "A local-first RAG workspace. Upload PDFs, notes, audio and email exports, ask in plain language, and get answers that list the passages they were built from. A portfolio project by Ricardo Madeira.",
    },
    nav: {
      how: "How it works",
      source: "Source",
      demo: "Open the demo",
      main: "Main",
      languages: "Language",
    },
    hero: {
      h1: "Ask your documents. See where the answer came from.",
      lede: "Stark is a local-first RAG workspace. Upload your files, ask in plain language, and every answer lists the passages it was built from.",
      demo: "Open the demo",
      source: "Read the source",
      noteBefore: "A portfolio project by ",
      noteAfter: ". Built with FastAPI, Next.js, ChromaDB and Ollama.",
    },
    example: {
      workspace: "Workspace: Policies",
      question: "How long do you keep customer backups?",
      answer: [
        "Customer backups are kept for 35 days and encrypted with AES-256",
        ". A restore test runs every quarter",
        ".",
      ],
      sources: [
        {
          file: "Security policy v3.docx",
          where: "Section 4.2",
          before: "Customer backups are ",
          mark: "retained for 35 days and encrypted with AES-256",
          after: ". Older backups are deleted automatically.",
        },
        {
          file: "Infrastructure runbook.md",
          where: "Restore tests",
          before: "A ",
          mark: "restore test runs every quarter",
          after: " and the result is logged in the ops tracker.",
        },
      ],
      caption:
        "Illustrative example, not a recorded run. Select a number to see the passage the sentence came from.",
      sourcesLabel: "Sources",
      sourceAria: "Source",
    },
    flow: {
      title: "What happens to a question",
      intro:
        "Retrieval is the part that decides whether an answer can be trusted, so it runs two searches and checks their work before the model writes anything.",
      label: "Retrieval pipeline",
      replay: "Run it again",
      stages: [
        [{ title: "Question", text: "Embedded for the vector search" }],
        [
          { title: "Vector search", text: "Nearest chunks by meaning" },
          { title: "BM25 search", text: "Chunks with the exact words" },
        ],
        [{ title: "Rank fusion", text: "Reciprocal rank fusion merges both lists" }],
        [{ title: "Rerank", text: "A cross-encoder reorders the best candidates" }],
        [{ title: "Answer", text: "Streamed, with the source passages listed" }],
      ],
    },
    features: {
      title: "What is in it",
      items: [
        {
          title: "It reads what you throw at it",
          body: "PDF, Word and Markdown files, images through OCR, audio through Whisper, and email and Slack exports. Each one goes through its own extractor, then the text is summarised, chunked and embedded.",
        },
        {
          title: "It finds passages two ways",
          body: "Meaning and exact words both matter, so a question runs a vector search and a BM25 keyword search. The two ranked lists are merged, and a cross-encoder reorders the best candidates.",
        },
        {
          title: "It can run entirely on your machine",
          body: "Inference goes through Ollama, vectors live in ChromaDB and metadata in SQLite, so nothing has to leave the computer. There is no API bill for local use.",
        },
        {
          title: "It also runs hosted",
          body: "The vector store sits behind one interface with two backends. The hosted demo uses Pinecone for vectors and Groq for the model, configured through environment variables in render.yaml.",
        },
      ],
    },
    close: {
      title: "Try it on your own files",
      body: "The demo is the full app. Upload a document, ask something about it, and check the answer against the passages it lists.",
    },
    footer: {
      before: "Stark is a portfolio project by ",
      after:
        ". The hosted demo runs on Groq and Pinecone; the local setup runs on Ollama and ChromaDB.",
    },
  },

  pt: {
    htmlLang: "pt-PT",
    meta: {
      title: "Stark | Pergunte aos seus documentos, veja de onde veio a resposta",
      description:
        "Um espaço de trabalho RAG pensado para funcionar localmente. Carregue PDFs, notas, áudio e exportações de e-mail, pergunte em linguagem corrente e receba respostas que listam as passagens em que se baseiam. Projeto de portefólio de Ricardo Madeira.",
    },
    nav: {
      how: "Como funciona",
      source: "Código",
      demo: "Abrir a demonstração",
      main: "Principal",
      languages: "Idioma",
    },
    hero: {
      h1: "Pergunte aos seus documentos. Veja de onde veio a resposta.",
      lede: "O Stark é um espaço de trabalho RAG pensado para funcionar localmente. Carregue os seus ficheiros, pergunte em linguagem corrente e cada resposta lista as passagens em que se baseia.",
      demo: "Abrir a demonstração",
      source: "Ver o código",
      noteBefore: "Projeto de portefólio de ",
      noteAfter: ". Feito com FastAPI, Next.js, ChromaDB e Ollama.",
    },
    example: {
      workspace: "Área de trabalho: Políticas",
      question: "Durante quanto tempo guardam as cópias de segurança dos clientes?",
      answer: [
        "As cópias de segurança dos clientes são guardadas durante 35 dias e cifradas com AES-256",
        ". Um teste de restauro é feito todos os trimestres",
        ".",
      ],
      sources: [
        {
          file: "Política de segurança v3.docx",
          where: "Secção 4.2",
          before: "As cópias de segurança dos clientes são ",
          mark: "retidas durante 35 dias e cifradas com AES-256",
          after: ". As cópias mais antigas são eliminadas automaticamente.",
        },
        {
          file: "Manual de infraestrutura.md",
          where: "Testes de restauro",
          before: "Um ",
          mark: "teste de restauro é feito todos os trimestres",
          after: " e o resultado fica registado no sistema de acompanhamento das operações.",
        },
      ],
      caption:
        "Exemplo ilustrativo, não é uma execução real. Selecione um número para ver a passagem de onde veio a frase.",
      sourcesLabel: "Fontes",
      sourceAria: "Fonte",
    },
    flow: {
      title: "O que acontece a uma pergunta",
      intro:
        "A recuperação é a parte que decide se uma resposta é de confiança, por isso faz duas pesquisas e verifica o resultado antes de o modelo escrever o que quer que seja.",
      label: "Fluxo de recuperação",
      replay: "Repetir",
      stages: [
        [{ title: "Pergunta", text: "Convertida em vetor para a pesquisa vetorial" }],
        [
          { title: "Pesquisa vetorial", text: "Blocos mais próximos em significado" },
          { title: "Pesquisa BM25", text: "Blocos com as palavras exatas" },
        ],
        [{ title: "Fusão de rankings", text: "A fusão por rank recíproco junta as duas listas" }],
        [{ title: "Reordenação", text: "Um cross-encoder reordena os melhores candidatos" }],
        [{ title: "Resposta", text: "Em fluxo contínuo, com as passagens de origem listadas" }],
      ],
    },
    features: {
      title: "O que tem lá dentro",
      items: [
        {
          title: "Lê o que lhe der",
          body: "Ficheiros PDF, Word e Markdown, imagens com OCR, áudio com Whisper e exportações de e-mail e Slack. Cada tipo passa pelo seu próprio extrator; depois o texto é resumido, dividido em blocos e convertido em vetores.",
        },
        {
          title: "Encontra passagens de duas formas",
          body: "O significado e as palavras exatas contam os dois, por isso cada pergunta corre uma pesquisa vetorial e uma pesquisa por palavras-chave BM25. As duas listas ordenadas são fundidas e um cross-encoder reordena os melhores candidatos.",
        },
        {
          title: "Pode funcionar inteiramente no seu computador",
          body: "A inferência passa pelo Ollama, os vetores ficam no ChromaDB e os metadados no SQLite, por isso nada tem de sair do computador. Não há fatura de API para o uso local.",
        },
        {
          title: "Também funciona alojado",
          body: "O armazenamento de vetores fica atrás de uma só interface com dois backends. A demonstração alojada usa o Pinecone para os vetores e o Groq para o modelo, configurados por variáveis de ambiente no render.yaml.",
        },
      ],
    },
    close: {
      title: "Experimente com os seus ficheiros",
      body: "A demonstração é a aplicação completa. Carregue um documento, faça-lhe uma pergunta e confirme a resposta com as passagens que ela lista.",
    },
    footer: {
      before: "O Stark é um projeto de portefólio de ",
      after:
        ". A demonstração alojada usa Groq e Pinecone; a configuração local usa Ollama e ChromaDB.",
    },
  },

  es: {
    htmlLang: "es",
    meta: {
      title: "Stark | Pregunta a tus documentos, mira de dónde viene la respuesta",
      description:
        "Un espacio de trabajo RAG pensado para funcionar en local. Sube PDF, notas, audio y exportaciones de correo, pregunta en lenguaje natural y recibe respuestas que listan los pasajes en los que se basan. Proyecto de portafolio de Ricardo Madeira.",
    },
    nav: {
      how: "Cómo funciona",
      source: "Código",
      demo: "Abrir la demo",
      main: "Principal",
      languages: "Idioma",
    },
    hero: {
      h1: "Pregunta a tus documentos. Mira de dónde viene la respuesta.",
      lede: "Stark es un espacio de trabajo RAG pensado para funcionar en local. Sube tus archivos, pregunta en lenguaje natural y cada respuesta lista los pasajes en los que se basa.",
      demo: "Abrir la demo",
      source: "Ver el código",
      noteBefore: "Proyecto de portafolio de ",
      noteAfter: ". Hecho con FastAPI, Next.js, ChromaDB y Ollama.",
    },
    example: {
      workspace: "Espacio de trabajo: Políticas",
      question: "¿Cuánto tiempo conservan las copias de seguridad de los clientes?",
      answer: [
        "Las copias de seguridad de los clientes se conservan durante 35 días y se cifran con AES-256",
        ". Cada trimestre se hace una prueba de restauración",
        ".",
      ],
      sources: [
        {
          file: "Política de seguridad v3.docx",
          where: "Sección 4.2",
          before: "Las copias de seguridad de los clientes se ",
          mark: "conservan durante 35 días y se cifran con AES-256",
          after: ". Las copias más antiguas se eliminan automáticamente.",
        },
        {
          file: "Manual de infraestructura.md",
          where: "Pruebas de restauración",
          before: "Cada trimestre se ",
          mark: "hace una prueba de restauración",
          after: " y el resultado queda registrado en el seguimiento de operaciones.",
        },
      ],
      caption:
        "Ejemplo ilustrativo, no es una ejecución real. Selecciona un número para ver el pasaje del que salió la frase.",
      sourcesLabel: "Fuentes",
      sourceAria: "Fuente",
    },
    flow: {
      title: "Qué pasa con una pregunta",
      intro:
        "La recuperación es la parte que decide si una respuesta es fiable, así que hace dos búsquedas y comprueba su trabajo antes de que el modelo escriba nada.",
      label: "Flujo de recuperación",
      replay: "Repetir",
      stages: [
        [{ title: "Pregunta", text: "Convertida en vector para la búsqueda vectorial" }],
        [
          { title: "Búsqueda vectorial", text: "Fragmentos más cercanos en significado" },
          { title: "Búsqueda BM25", text: "Fragmentos con las palabras exactas" },
        ],
        [{ title: "Fusión de rankings", text: "La fusión por rango recíproco une las dos listas" }],
        [{ title: "Reordenación", text: "Un cross-encoder reordena a los mejores candidatos" }],
        [{ title: "Respuesta", text: "En streaming, con los pasajes de origen listados" }],
      ],
    },
    features: {
      title: "Qué incluye",
      items: [
        {
          title: "Lee lo que le eches",
          body: "Archivos PDF, Word y Markdown, imágenes con OCR, audio con Whisper y exportaciones de correo y Slack. Cada tipo pasa por su propio extractor; después el texto se resume, se divide en fragmentos y se convierte en vectores.",
        },
        {
          title: "Encuentra pasajes de dos maneras",
          body: "Importan tanto el significado como las palabras exactas, así que cada pregunta ejecuta una búsqueda vectorial y una búsqueda por palabras clave BM25. Las dos listas ordenadas se fusionan y un cross-encoder reordena a los mejores candidatos.",
        },
        {
          title: "Puede funcionar por completo en tu equipo",
          body: "La inferencia pasa por Ollama, los vectores viven en ChromaDB y los metadatos en SQLite, así que nada tiene que salir del ordenador. No hay factura de API para el uso local.",
        },
        {
          title: "También funciona alojado",
          body: "El almacén de vectores está detrás de una sola interfaz con dos backends. La demo alojada usa Pinecone para los vectores y Groq para el modelo, configurados con variables de entorno en render.yaml.",
        },
      ],
    },
    close: {
      title: "Pruébalo con tus archivos",
      body: "La demo es la aplicación completa. Sube un documento, pregúntale algo y comprueba la respuesta con los pasajes que lista.",
    },
    footer: {
      before: "Stark es un proyecto de portafolio de ",
      after:
        ". La demo alojada usa Groq y Pinecone; la configuración local usa Ollama y ChromaDB.",
    },
  },

  fr: {
    htmlLang: "fr",
    meta: {
      title: "Stark | Interrogez vos documents, voyez d'où vient la réponse",
      description:
        "Un espace de travail RAG conçu pour fonctionner en local. Importez des PDF, des notes, de l'audio et des exports d'e-mails, posez vos questions en langage courant et obtenez des réponses qui listent les passages sur lesquels elles s'appuient. Projet de portfolio de Ricardo Madeira.",
    },
    nav: {
      how: "Comment ça marche",
      source: "Code",
      demo: "Ouvrir la démo",
      main: "Principal",
      languages: "Langue",
    },
    hero: {
      h1: "Interrogez vos documents. Voyez d'où vient la réponse.",
      lede: "Stark est un espace de travail RAG conçu pour fonctionner en local. Importez vos fichiers, posez vos questions en langage courant, et chaque réponse liste les passages sur lesquels elle s'appuie.",
      demo: "Ouvrir la démo",
      source: "Voir le code",
      noteBefore: "Projet de portfolio de ",
      noteAfter: ". Réalisé avec FastAPI, Next.js, ChromaDB et Ollama.",
    },
    example: {
      workspace: "Espace de travail : Politiques",
      question: "Combien de temps conservez-vous les sauvegardes des clients ?",
      answer: [
        "Les sauvegardes des clients sont conservées 35 jours et chiffrées en AES-256",
        ". Un test de restauration est effectué chaque trimestre",
        ".",
      ],
      sources: [
        {
          file: "Politique de sécurité v3.docx",
          where: "Section 4.2",
          before: "Les sauvegardes des clients sont ",
          mark: "conservées 35 jours et chiffrées en AES-256",
          after: ". Les sauvegardes plus anciennes sont supprimées automatiquement.",
        },
        {
          file: "Manuel d'infrastructure.md",
          where: "Tests de restauration",
          before: "Un ",
          mark: "test de restauration est effectué chaque trimestre",
          after: " et le résultat est consigné dans le suivi des opérations.",
        },
      ],
      caption:
        "Exemple illustratif, pas une exécution réelle. Sélectionnez un numéro pour voir le passage d'où vient la phrase.",
      sourcesLabel: "Sources",
      sourceAria: "Source",
    },
    flow: {
      title: "Ce qui arrive à une question",
      intro:
        "La récupération est l'étape qui décide si une réponse est fiable : elle lance donc deux recherches et vérifie leur travail avant que le modèle écrive quoi que ce soit.",
      label: "Pipeline de récupération",
      replay: "Rejouer",
      stages: [
        [{ title: "Question", text: "Transformée en vecteur pour la recherche vectorielle" }],
        [
          { title: "Recherche vectorielle", text: "Les blocs les plus proches par le sens" },
          { title: "Recherche BM25", text: "Les blocs contenant les mots exacts" },
        ],
        [{ title: "Fusion des classements", text: "La fusion par rang réciproque réunit les deux listes" }],
        [{ title: "Reclassement", text: "Un cross-encoder réordonne les meilleurs candidats" }],
        [{ title: "Réponse", text: "Diffusée en continu, avec les passages sources listés" }],
      ],
    },
    features: {
      title: "Ce qu'il contient",
      items: [
        {
          title: "Il lit ce qu'on lui donne",
          body: "Fichiers PDF, Word et Markdown, images par OCR, audio par Whisper, exports d'e-mails et de Slack. Chaque type passe par son propre extracteur ; le texte est ensuite résumé, découpé en blocs et converti en vecteurs.",
        },
        {
          title: "Il trouve des passages de deux façons",
          body: "Le sens et les mots exacts comptent tous les deux : chaque question lance donc une recherche vectorielle et une recherche par mots-clés BM25. Les deux listes classées sont fusionnées, puis un cross-encoder réordonne les meilleurs candidats.",
        },
        {
          title: "Il peut tourner entièrement sur votre machine",
          body: "L'inférence passe par Ollama, les vecteurs vivent dans ChromaDB et les métadonnées dans SQLite : rien n'a besoin de quitter l'ordinateur. Aucune facture d'API en usage local.",
        },
        {
          title: "Il fonctionne aussi hébergé",
          body: "Le stockage des vecteurs est derrière une seule interface avec deux backends. La démo hébergée utilise Pinecone pour les vecteurs et Groq pour le modèle, configurés par des variables d'environnement dans render.yaml.",
        },
      ],
    },
    close: {
      title: "Essayez-le avec vos fichiers",
      body: "La démo est l'application complète. Importez un document, posez-lui une question et vérifiez la réponse avec les passages qu'elle liste.",
    },
    footer: {
      before: "Stark est un projet de portfolio de ",
      after:
        ". La démo hébergée utilise Groq et Pinecone ; la configuration locale utilise Ollama et ChromaDB.",
    },
  },
};

export function metadataFor(lang: Lang): Metadata {
  const t = CONTENT[lang];
  const path = LANGS.find((l) => l.code === lang)?.path ?? "/landing";
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: path,
      languages: {
        en: "/landing",
        "pt-PT": "/landing/pt",
        es: "/landing/es",
        fr: "/landing/fr",
        "x-default": "/landing",
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: path,
      locale: t.htmlLang,
      type: "website",
    },
  };
}

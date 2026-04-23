// Data for Siesher's business card — pulled from github.com/Siesher

const PROFILE = {
  handle: "Siesher",
  nameEn: "Maksim",
  nameRu: "Максим",
  title: {
    ru: "Data Engineer · Собиратель заклинаний",
    en: "Data Engineer · Spell Collector",
  },
  quoteRu: "«Я просто собираю заклинания. Вот и всё.» — Фрирен",
  quoteEn: "«I just collect spells. That's all.» — Frieren",
  bioRu:
    "Как Фрирен собирает заклинания тысячу лет — так я собираю модели, алгоритмы и данные. Каждый коммит — новое заклинание в гримуаре.",
  bioEn:
    "Like Frieren gathering spells across a thousand years — I gather models, algorithms and data. Every commit is a new spell in the grimoire.",
  role: {
    ru: "Data Engineer в Альфа-Банке",
    en: "Data Engineer at Alfa-Bank",
  },
  edu: {
    ru: "МГТУ им. Н. Э. Баумана",
    en: "Bauman Moscow State Technical University",
  },
  contacts: {
    email: "loxterpoi@gmail.com",
    telegram: "@siesher",
    github: "Siesher",
    telegramUrl: "https://t.me/siesher",
    githubUrl: "https://github.com/Siesher",
  },
};

const SKILLS = [
  { name: "Python", level: 95, school: "Заклинания первого круга" },
  { name: "PyTorch", level: 88, school: "Трансформация разума" },
  { name: "Transformers / LLM", level: 85, school: "Высшая магия языка" },
  { name: "Graph Neural Networks", level: 78, school: "Древние узоры связей" },
  { name: "NLP", level: 82, school: "Речь древних" },
  { name: "Apache Spark", level: 72, school: "Призыв потоков" },
  { name: "PostgreSQL", level: 80, school: "Хранилища памяти" },
  { name: "C / C++", level: 70, school: "Руны низкого уровня" },
  { name: "Docker / Linux", level: 76, school: "Обряды среды" },
  { name: "HuggingFace", level: 84, school: "Библиотека магов" },
];

// Frieren-flavored descriptions of the actual repos
const PROJECTS = [
  {
    id: "mist",
    repo: "MIST",
    icon: "🔮",
    name: { ru: "MIST", en: "MIST" },
    tag: { ru: "Сократовский ИИ-наставник", en: "Socratic AI Tutor" },
    desc: {
      ru: "Multi-agent STEM-наставник с Qwen3.5-9B, обученный через RL. Ведёт ученика сократовскими вопросами, как Фламме вела Фрирен.",
      en: "Multi-agent STEM tutor on Qwen3.5-9B trained via RL. Guides students with Socratic questions, as Flamme guided Frieren.",
    },
    tech: ["Qwen3.5", "RL", "Multi-agent", "LLM"],
    school: "Высшая магия",
  },
  {
    id: "irwin",
    repo: "IRWIN",
    icon: "📜",
    name: { ru: "IRWIN", en: "IRWIN" },
    tag: { ru: "Система научного письма", en: "Research Writing Network" },
    desc: {
      ru: "Intelligent Research Writing & Inference Network — помогает исследователям писать и проверять выводы.",
      en: "Intelligent Research Writing & Inference Network for scientific writing support.",
    },
    tech: ["LLM", "RAG", "Agents"],
    school: "Магия знания",
  },
  {
    id: "qwen-lora",
    repo: "Qwen3_LoRA_pet",
    icon: "🐉",
    name: { ru: "Qwen3 LoRA", en: "Qwen3 LoRA" },
    tag: { ru: "Тонкая настройка драконов", en: "Fine-tuning Dragons" },
    desc: {
      ru: "Fine-tuning Qwen3 с LoRA под кастомные задачи. Приручение дракона небольшими рунами.",
      en: "Fine-tuning Qwen3 with LoRA for custom tasks.",
    },
    tech: ["LoRA", "Qwen3", "PEFT"],
    school: "Приручение",
  },
  {
    id: "whisper",
    repo: "Whisper_or_no_Whisper",
    icon: "🎤",
    name: { ru: "Whisper or no Whisper", en: "Whisper or no Whisper" },
    tag: { ru: "Распознавание речи", en: "Speech Recognition" },
    desc: {
      ru: "Эксперименты с Whisper, Wav2Vec и Silero — ансамблевый пайплайн ASR.",
      en: "Experiments with Whisper, Wav2Vec and Silero — ensemble ASR pipeline.",
    },
    tech: ["Whisper", "Wav2Vec", "Silero"],
    school: "Магия голоса",
  },
  {
    id: "embeddings",
    repo: "Embeddings",
    icon: "📐",
    name: { ru: "Embeddings", en: "Embeddings" },
    tag: { ru: "Векторы смыслов", en: "Vectors of Meaning" },
    desc: {
      ru: "Эксперименты с текстовыми и векторными представлениями — геометрия языка.",
      en: "Experiments with text and vector embeddings — geometry of language.",
    },
    tech: ["Embeddings", "FAISS", "Semantic"],
    school: "Геометрия смыслов",
  },
  {
    id: "reasoning",
    repo: "Generator_for_reasoning",
    icon: "🧠",
    name: { ru: "Reasoning Generator", en: "Reasoning Generator" },
    tag: { ru: "Данные для цепочек рассуждений", en: "CoT Data Generator" },
    desc: {
      ru: "Генератор данных для обучения LLM рассуждать пошагово.",
      en: "Reasoning data generator for training LLMs step-by-step.",
    },
    tech: ["LLM", "Data", "CoT"],
    school: "Магия разума",
  },
  {
    id: "supcom",
    repo: "AI_For_Supreme_Com",
    icon: "⚔️",
    name: { ru: "Supreme Commander AI", en: "Supreme Commander AI" },
    tag: { ru: "Стратегический бот", en: "Strategy Bot" },
    desc: {
      ru: "LLM-бот, играющий в Supreme Commander. Полководец на службе магии.",
      en: "LLM bot playing Supreme Commander. A commander at magic's service.",
    },
    tech: ["LLM", "Agents", "Games"],
    school: "Военная магия",
  },
  {
    id: "bmstu-cpp",
    repo: "BMSTU-CPP-Labs",
    icon: "🏛️",
    name: { ru: "BMSTU C++ Labs", en: "BMSTU C++ Labs" },
    tag: { ru: "Алгоритмы и структуры", en: "DSA in C++" },
    desc: {
      ru: "Лабораторные работы МГТУ: структуры данных и алгоритмы на C++.",
      en: "BMSTU lab assignments: data structures & algorithms in C++.",
    },
    tech: ["C++", "DSA", "CMake"],
    school: "Основы рун",
  },
];

const EXPERIENCE = [
  {
    when: "2024 — now",
    whenRu: "2024 — сейчас",
    role: { ru: "Data Engineer", en: "Data Engineer" },
    org: { ru: "Альфа-Банк", en: "Alfa-Bank" },
    desc: {
      ru: "Графовая аналитика транзакций, ML-поиск персональных данных, пайплайны обработки.",
      en: "Transaction graph analytics, ML-based PII search, data pipelines.",
    },
  },
  {
    when: "2022 — now",
    whenRu: "2022 — сейчас",
    role: { ru: "Студент ИУ", en: "Student" },
    org: { ru: "МГТУ им. Баумана", en: "BMSTU" },
    desc: {
      ru: "Прикладная математика и информатика. Алгоритмы, системы, машинное обучение.",
      en: "Applied math & computer science. Algorithms, системы, ML.",
    },
  },
];

const ACHIEVEMENTS = [
  { icon: "🏆", ru: "17+ репозиториев на GitHub", en: "17+ GitHub repos" },
  { icon: "🔮", ru: "Дообучение LLM через LoRA", en: "LLM fine-tuning via LoRA" },
  { icon: "🛡️", ru: "Production-пайплайны в банке", en: "Production banking pipelines" },
  { icon: "📜", ru: "Multi-agent RL система (MIST)", en: "Multi-agent RL system (MIST)" },
];

const BLOG = [
  {
    icon: "🔮",
    title: { ru: "LoRA Fine-tuning Template", en: "LoRA Fine-tuning Template" },
    tag: "gist",
    url: "https://gist.github.com/Siesher/fd31d015d96abb3d01856e4340dd247e",
  },
  {
    icon: "🛡️",
    title: { ru: "GNN Fraud Detection", en: "GNN Fraud Detection" },
    tag: "gist",
    url: "https://gist.github.com/Siesher/60f18d6f3f6ee871827b467bf68016a7",
  },
];

Object.assign(window, {
  PROFILE, SKILLS, PROJECTS, EXPERIENCE, ACHIEVEMENTS, BLOG,
});


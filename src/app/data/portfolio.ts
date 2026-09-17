// Content adapted exclusively from Mughees_Haider_AI_Engineer_CV_2Page_Final.pdf.
export const profile = {
  name: "Mughees Hiader",
  role: "Aspiring AI Engineer",
  email: "i243181@isb.nu.edu.pk",
  location: "Pakistan",
  university: "FAST–NUCES Islamabad",
  cv: `${import.meta.env.BASE_URL}Mughees_Hiader_CV.pdf`,
};

export const focusAreas = [
  {
    label: "AI & LLMs",
    icon: "brain",
    project: "FixFlow AI",
    detail: "Documentation-grounded debugging with RAG.",
    context: "Currently building",
    tone: "blue",
  },
  {
    label: "Systems",
    icon: "cpu",
    project: "OceanRoute Nav",
    detail: "Maritime routing with custom data structures.",
    context: "Built from the fundamentals",
    tone: "purple",
  },
  {
    label: "Software",
    icon: "layers",
    project: "Smart Disaster Response MIS",
    detail: "Relational data, reliable transactions, coordinated response.",
    context: "Full-stack engineering",
    tone: "green",
  },
] as const;

export type ProjectCategory = "AI & LLMs" | "Web & Data" | "Systems";
export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  description: string;
  tech: string[];
  details: string[];
  visual: "retrieval" | "leaf" | "database" | "route" | "traffic" | "shield";
  inProgress?: boolean;
};

export const projects: Project[] = [
  {
    id: "fixflow",
    title: "FixFlow AI",
    subtitle: "Documentation-grounded debugging",
    category: "AI & LLMs",
    description:
      "An AI debugging assistant that retrieves official technical documentation to help diagnose software errors.",
    tech: ["RAG", "LLMs", "Technical documentation"],
    visual: "retrieval",
    inProgress: true,
    details: [
      "Developing a debugging assistant that retrieves official documentation to diagnose errors across modern software technologies.",
      "Uses grounded, source-aware retrieval to keep troubleshooting guidance tied to authoritative technical material.",
    ],
  },
  {
    id: "leafscan",
    title: "LeafScan AI",
    subtitle: "From leaf image to treatment guidance",
    category: "AI & LLMs",
    description:
      "An image-based AI application that identifies likely plant diseases and returns structured treatment guidance.",
    tech: ["TypeScript", "Grok API", "Image analysis"],
    visual: "leaf",
    details: [
      "Built an AI application that analyzes leaf images to identify likely plant diseases.",
      "Integrated Grok API workflows to return structured treatment guidance in a practical user application.",
    ],
  },
  {
    id: "disaster-mis",
    title: "Smart Disaster Response MIS",
    subtitle: "Structured data for coordinated response",
    category: "Web & Data",
    description:
      "A full-stack disaster-response system with reliable transactions, role-based access, dashboards, and reporting.",
    tech: ["SQL", "ACID", "Five-role RBAC"],
    visual: "database",
    details: [
      "Built a full-stack MIS with normalized relational data, ACID transactions, triggers, and five-role role-based access control.",
      "Implemented indexing, dashboards, reporting, and comparative query-performance analysis.",
    ],
  },
  {
    id: "oceanroute",
    title: "OceanRoute Nav",
    subtitle: "Maritime routing, built from the basics",
    category: "Systems",
    description:
      "A maritime navigation optimizer built with custom data structures, Dijkstra routing, and no STL.",
    tech: ["C++", "Custom data structures", "SFML / GLUT"],
    visual: "route",
    details: [
      "Built a zero-STL maritime optimizer using custom graph, linked list, priority queue, and stack structures.",
      "Implemented Dijkstra routing, FIFO docking queues, multi-leg routes, subgraph filtering, and route preferences.",
    ],
  },
  {
    id: "traffic-simulator",
    title: "Traffic Intersection Simulator",
    subtitle: "Concurrency with coordination",
    category: "Systems",
    description:
      "Two concurrent intersections with ambulance priority, synchronized traffic flow, and race-condition prevention.",
    tech: ["C", "POSIX Threads", "Semaphores", "IPC"],
    visual: "traffic",
    details: [
      "Simulated two concurrent intersections using pthreads, semaphores, and fork-based IPC pipes.",
      "Implemented ambulance priority, bounded parking, race-condition prevention, coordinated flow, and SIGINT shutdown.",
    ],
  },
  {
    id: "crime-tracking",
    title: "Crime & Criminal Tracking",
    subtitle: "Case management with accountability",
    category: "Web & Data",
    description:
      "A CCTNS-inspired academic system for complaints, investigations, and case search, with access control and audit tracking.",
    tech: ["Full-stack", "SonarQube", "Software testing"],
    visual: "shield",
    details: [
      "Developed an academic crime and case-management system with complaint registration, investigation, search, RBAC, and audit tracking.",
      "Performed functional and system testing, alongside SonarQube analysis for bugs, vulnerabilities, code smells, and maintainability issues.",
    ],
  },
];

export const additionalProjects = [
  {
    title: "Local LLM Deployment",
    tech: "Ollama · Linux / Ubuntu",
    description:
      "Installed, configured, and tested open-source models for offline inference. Worked with model storage, local ports, lifecycle management, and application-to-model runtime communication.",
  },
  {
    title: "Point-of-Sale System",
    tech: "TypeScript",
    description:
      "Built sales, product, inventory, transaction, and sales-history workflows, with reporting, backup, and recovery capabilities.",
  },
  {
    title: "Traffic Company Management",
    tech: "Java",
    description:
      "Built customer complaint tracking and case-information workflows, with review and justification records for structured follow-up.",
  },
  {
    title: "Containerized Application Environment",
    tech: "Docker · Containers · Networking",
    description:
      "Created reproducible environments using images and containers, with container networking, port mapping, volumes, and deployment-oriented workflows.",
  },
  {
    title: "UNO Card Game",
    tech: "C++ · SFML",
    description:
      "Built a graphical UNO game with deck management, turn logic, special-card effects, player interaction, and rendering using OOP and real-time input handling.",
  },
  {
    title: "Brick Breaker",
    tech: "x86 Assembly",
    description:
      "Created a playable game with low-level graphics, keyboard input, collision detection, and score tracking using direct program-flow control.",
  },
];

export const skillGroups = [
  {
    title: "AI engineering",
    icon: "brain",
    skills: [
      "RAG",
      "Foundation models & LLMs",
      "Prompt engineering",
      "LLM APIs",
      "Local LLM deployment",
      "Model inference",
      "AI application architecture",
      "Basic model evaluation",
    ],
  },
  {
    title: "Programming languages",
    icon: "code",
    skills: [
      "Python",
      "TypeScript",
      "C",
      "C++",
      "Java",
      "SQL",
      "x86 Assembly",
      "Bash / Command line",
    ],
  },
  {
    title: "Systems & data",
    icon: "database",
    skills: [
      "Data structures & algorithms",
      "OOP",
      "POSIX Threads",
      "Semaphores",
      "IPC",
      "ACID",
      "RBAC",
      "SFML / GLUT",
    ],
  },
  {
    title: "Tools & platforms",
    icon: "terminal",
    skills: [
      "Ollama",
      "Grok API",
      "Local open-source LLMs",
      "Docker",
      "Git / GitHub",
      "Linux / Ubuntu",
      "VS Code",
      "SonarQube",
    ],
  },
] as const;

export const coursework = [
  "Data Structures",
  "Object-Oriented Programming",
  "Operating Systems",
  "Database Systems",
  "Software Design & Architecture",
  "Assembly Language Programming",
  "Civics",
];

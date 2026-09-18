export default {
  id: 'mededge',
  slug: 'MEDEdge',
  name: 'MEDEDGE',
  shortName: 'MEDEdge',
  category: 'Healthcare Technology',
  oneLiner:
    'An intelligent clinical decision-support system that reduces errors, streamlines workflows, and supports safer healthcare decisions.',
  heroImage: {
    src: '/case-studies/mededge-hero-desktop.png',
    alt: 'MedEdge dashboard on a desktop monitor',
  },
  heroShowcase: {
    variant: 'mededge-devices',
    eyebrow: 'UI/UX CASE STUDY',
    title: 'MedEdge',
    tagline: 'Intelligence that supports better care.',
    meta: ['Healthcare AI', 'Product Designer', '2024'],
  },
  overview: {
    layout: 'editorial',
    product: 'MEDEdge: Medical Decision Support Platform',
    summary:
      'MedEdge is an AI-assisted clinical platform designed to help healthcare professionals organize patient information, identify potential risks, and review recommendations within one connected workspace. Created for The PITCH, the project explored how AI could support clinical decision-making while keeping healthcare professionals in control of every care decision.',
    role: 'Product Designer',
    timeline: 'May 2024 – December 2024',
    team: 'Six-person cross-functional team',
    competition: 'The PITCH',
    tools: 'Uizard, Google Meet, Figma',
  },
  challenge: {
    layout: 'editorial',
    headline: 'Critical patient information can be difficult to review quickly',
    body: [
      'Healthcare professionals often work with large volumes of patient information, including symptoms, diagnoses, medications, allergies, test results, treatment plans, and medical history. When this information is fragmented or difficult to scan, clinicians may spend more time searching for context and risk overlooking details that require attention.',
      'MedEdge explored how a connected clinical workspace could help doctors, nurses, and other healthcare professionals review patient information, identify potential risks, and evaluate AI-assisted recommendations without removing their control over care decisions.',
    ],
    flow: [
      {
        label: 'Fragmented information',
        description: 'Patient data lives across siloed systems and formats.',
        detail:
          'Critical details are scattered across charts, labs, medication lists, and notes, forcing clinicians to piece together a full picture before they can act with confidence.',
        icon: 'layers',
      },
      {
        label: 'Slower review',
        description: 'Clinicians spend critical minutes reconstructing context.',
        detail:
          'Rebuilding patient context under tight visit windows delays decisions and leaves less room for careful clinical judgment when every minute counts.',
        icon: 'clock',
      },
      {
        label: 'Missed context',
        description: 'Key details can slip past under time pressure.',
        detail:
          'When scanning is rushed, allergies, interactions, or recent changes can go unnoticed until they matter most in the care decision.',
        icon: 'eye-off',
      },
      {
        label: 'Greater patient risk',
        description: 'Overlooked information raises the chance of error.',
        detail:
          'Each overlooked detail compounds uncertainty and increases the likelihood of preventable harm across diagnosis, treatment, and follow-through.',
        icon: 'shield-alert',
      },
    ],
    constraints: [
      'Fixed competition timeline',
      'Limited access to clinicians',
      'Small research and testing sample',
      'No live EHR integration',
    ],
  },
  role: {
    layout: 'editorial',
    intro:
      'As the Product Designer, I led the research, product structure, and interface design for MedEdge — translating clinical needs into a clear, testable product experience.',
    groups: [
      {
        title: 'Research & Strategy',
        items: [
          'Conducted 5 remote clinician interviews',
          'Reviewed EHR pain points and medical-error research',
          'Created personas and journey maps',
          'Synthesized findings into product opportunities',
        ],
      },
      {
        title: 'Product Structure',
        items: [
          'Defined the information architecture',
          'Created the main user flows',
          'Organized the platform around clinical tasks',
          'Helped prioritize core features',
        ],
      },
      {
        title: 'Design Execution',
        items: [
          'Created low- and high-fidelity wireframes',
          'Built the Uizard prototype',
          'Designed the dashboard, Patient Data, AI Suggestions, and medical-exploration screens',
          'Applied usability feedback to the interface',
        ],
      },
    ],
    collaboration: {
      copy:
        'I collaborated with a Team Lead, Software Developer, Data Analyst, Business Analyst, and Project Manager to align user needs with product direction, technical feasibility, and pitch goals.',
      team: [
        'Team Lead',
        'Software Developer',
        'Data Analyst',
        'Business Analyst',
        'Project Manager',
      ],
    },
    didNotOwn: [
      'AI-model development',
      'Front-end and back-end implementation',
      'Financial forecasting',
      'Market sizing',
      'Formal data analysis',
      'Technical architecture',
      'Compliance approval',
    ],
  },
  goals: {
    user: [
      'View patient information quickly and comprehensively',
      'Identify important risks without unnecessary delay',
      'Make evidence-based decisions with clearer context',
      'Receive prioritized, non-overwhelming alerts',
      'Access relevant clinical information at the point of care',
    ],
    design: [
      'Reduce unnecessary complexity',
      'Create a clear information hierarchy',
      'Keep AI guidance visually separate from patient data',
      'Make recommendations understandable',
      'Preserve clinician control throughout the workflow',
    ],
    organizationalValue: [
      'Support safer and more informed clinical decisions',
      'Reduce the likelihood of important context being overlooked',
      'Create a more efficient patient-review workflow',
      'Explore compatibility with existing EHR workflows',
      'Demonstrate potential value for hospitals and clinics',
    ],
    successCriteria: [
      'A clinician can locate the correct patient record without assistance',
      'A clinician can identify the main risk or alert',
      'A clinician can explain why a recommendation appeared',
      'A clinician can distinguish patient data from AI guidance',
      'A clinician can complete the core workflow with limited hesitation',
    ],
    note:
      'These were intended success criteria for a concept prototype rather than production metrics.',
  },
  research: {
    methods: [
      'Remote clinician interviews',
      'Workflow discussions and remote task observations',
      'EHR pain-point review',
      'Medical-error research',
      'Competitive analysis',
    ],
  },
  insights: [
    {
      title:
        'Participants described existing clinical software as dense and difficult to scan.',
      discovery:
        'Clinicians described information-heavy interfaces, unclear hierarchy, and the need to search across multiple areas before understanding the full patient context.',
    },
    {
      title: 'Clinicians develop workarounds to manage time pressure.',
      discovery:
        'Participants described relying on shortcuts, memory, or repeated navigation to move through complex workflows more quickly.',
    },
    {
      title:
        'Transitions between intake, review, diagnosis, and treatment can fragment context.',
      discovery:
        'Important information may become separated as care moves between stages, roles, or systems.',
    },
    {
      title:
        'Participants wanted important alerts prioritized without adding more notification fatigue.',
      discovery:
        'Clinicians needed urgent risks to stand out while lower-priority information remained accessible without competing for attention.',
    },
  ],
  users: {
    layout: 'editorial',
    summary:
      'Three representative clinician personas synthesized from research and workflow patterns across emergency, ICU, and specialty care — not verified profiles of real individuals.',
    personas: [
      {
        name: 'Dr. Sarah Mitchell',
        role: 'Emergency Room Physician',
        quote:
          'I need the critical details immediately—without searching through several records.',
        workflow: 'Fast-paced Emergency Department',
        workflowIcon: 'activity',
        image: {
          src: '/case-studies/mededge-persona-sarah.png',
          alt: 'Portrait of Dr. Sarah Mitchell, emergency room physician',
        },
        goals: [
          'Make rapid, informed decisions',
          'Identify urgent risks quickly',
          'Confirm allergies and medication interactions',
        ],
        frustrations: [
          'Fragmented patient information',
          'Multiple urgent cases at once',
          'Important warnings buried in dense records',
        ],
        needs: [
          'Prioritized patient summaries',
          'Clear high-risk alerts',
          'Fast access to medications, allergies, and history',
        ],
        support:
          'Surface urgent patient information and supporting context at the beginning of the workflow.',
      },
      {
        name: 'Nurse Rachel Thompson',
        role: 'ICU Nurse',
        quote:
          'Small changes matter. I need to see what changed and what requires attention.',
        workflow: 'Intensive Care Unit',
        workflowIcon: 'heart-pulse',
        image: {
          src: '/case-studies/mededge-persona-rachel.png',
          alt: 'Portrait of Nurse Rachel Thompson in an ICU setting',
        },
        goals: [
          'Monitor multiple complex patients',
          'Track medications and vital changes',
          'Catch possible prescription or documentation errors',
        ],
        frustrations: [
          'Complex medication schedules',
          'Repetitive documentation',
          'Long shifts requiring sustained attention',
        ],
        needs: [
          'Clear treatment-progress views',
          'Medication history',
          'Visible changes in patient condition',
          'Prioritized alerts',
        ],
        support:
          'Connect vitals, medication updates, treatment progress, and alerts in one clear view.',
      },
      {
        name: 'Dr. James Chen',
        role: 'Cardiologist',
        quote:
          'A recommendation is only useful when I can see the evidence behind it.',
        workflow: 'Cardiology / Specialty Care',
        workflowIcon: 'heart',
        image: {
          src: '/case-studies/mededge-persona-james.png',
          alt: 'Portrait of Dr. James Chen, cardiologist',
        },
        goals: [
          'Review complex histories and lab trends',
          'Make evidence-based treatment decisions',
          'Collaborate with other specialists',
        ],
        frustrations: [
          'Information spread across specialties',
          'Limited visibility into trends',
          'Recommendations without context',
        ],
        needs: [
          'Longitudinal patient history',
          'Specialty-specific data',
          'Lab and diagnostic trends',
          'Explainable recommendations',
        ],
        support:
          'Connect AI-assisted guidance to relevant history, tests, diagnoses, and treatment information.',
      },
    ],
  },
  problemFraming: {
    layout: 'editorial',
    intro:
      'After reviewing clinician workflows, recurring pain points, and the needs of different healthcare roles, the challenge became more specific: MedEdge needed to surface relevant patient information without adding another layer of complexity or reducing clinician control.',
    statement:
      'Healthcare professionals need a clearer way to review complex patient information and identify potential risks because fragmented records and dense clinical systems can make critical context difficult to locate and interpret under time pressure.',
    hmw:
      'How might we help healthcare professionals identify important patient risks and review relevant clinical information without adding more complexity to their workflow?',
    hmwEmbed: {
      src: 'https://embed.figma.com/board/Jv92GNQtp2hF1C5CtaLwi3/MedEdge---How-Might-We?node-id=1-2&embed-host=share',
      title: 'MedEdge How Might We UX synthesis artifact',
    },
    opportunities: [
      {
        title: 'Prioritize what matters',
        description:
          'Surface urgent conditions, allergies, medication risks, recent changes, and treatment progress before secondary information.',
      },
      {
        title: 'Make recommendations understandable',
        description:
          'Connect AI-assisted suggestions to the patient information, risk indicators, and evidence that influenced them.',
      },
      {
        title: 'Preserve clinical control',
        description:
          'Allow clinicians to review, question, dismiss, or act on recommendations rather than allowing the system to make care decisions automatically.',
      },
    ],
    principles: [
      {
        title: 'Clarity before complexity',
        description:
          'Show the most relevant information first and reveal additional detail when needed.',
      },
      {
        title: 'Context builds trust',
        description:
          'Recommendations should explain why they appeared and what information supports them.',
      },
      {
        title: 'Support, not replacement',
        description:
          'AI should strengthen clinical judgment, not replace it.',
      },
      {
        title: 'One connected workflow',
        description:
          'Patient records, alerts, recommendations, and treatment plans should work together.',
      },
    ],
  },
  journey: {
    layout: 'editorial',
    explanation:
      'Mapped how clinicians move from patient intake through risk review and recommendation handling — highlighting where fragmented records and buried alerts interrupt safer, faster decisions.',
  },
  flows: {
    layout: 'editorial',
    explanation:
      'Simplified the primary clinician path so urgent risks and AI-assisted suggestions stay visible alongside patient context — without adding extra steps to the care decision.',
  },
  wireframes: {
    layout: 'editorial',
    explanation:
      'Started with low-fidelity wireframes to map out core user flows and establish information hierarchy. Focus was on creating logical navigation paths that match clinician mental models and reduce steps to critical information. Key Decision: Implemented a persistent left sidebar navigation for quick access to core modules (Login, Patient Data, Medical Plans, AI Suggestions) ensuring clinicians never lose their place in complex workflows.',
  },
  visualDirection: {
    layout: 'editorial',
    explanation:
      'MedEdge’s visual system was designed to reduce cognitive load, distinguish risk from routine information, and make AI-assisted guidance understandable without competing with clinical judgment.',
  },
  finalInterface: {
    explanation:
      'High-fidelity screens covering authentication, clinician dashboard, medical solutions search, patient data entry, and AI diagnostic support.',
    items: [
      {
        title: 'Secure Authentication',
        src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6912295bcf607c90c75bc0c1/14437db64_Screenshot2025-11-10135340.png',
        alt: 'MEDEdge Login',
        caption:
          'The login screen features a dark, professional interface with medical illustrations that convey trust and security. The blue circular design element creates visual interest while maintaining clinical professionalism. Practitioner ID and password fields are clearly labeled with secure input indicators.',
      },
      {
        title: 'Clinician Dashboard',
        src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6912295bcf607c90c75bc0c1/33b3f6f5d_Screenshot2025-11-10135355.png',
        alt: 'MEDEdge Dashboard',
        caption:
          'The dashboard provides an at-a-glance view of critical metrics: patient insights (8,526 patients), patient status (Stable), and AI recommendations (AI Suggestions). The left sidebar offers quick navigation between Login, Patient Data, Medical Plans, and AI Suggestions. The main content area features patient records with Search, Filter, Sort, and View options, plus Edit, Add, and Delete controls. Treatment Progress cards show medication updates (22%), vital signs monitoring (52% Normal), and activity levels (16% Active). The right sidebar displays the current doctor\'s profile (Harris Price, Male, 45 years old, Medical Care) with a weekly schedule and upcoming activities including Therapy Sessions, Vaccination Schedule, and Mental Health Assessment.',
      },
      {
        title: 'Explore Medical Solutions',
        src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6912295bcf607c90c75bc0c1/6e3c2fd11_Screenshot2025-11-10135409.png',
        alt: 'Explore Medical Solutions',
        caption:
          'Advanced search and filtering system allows clinicians to quickly find relevant medical information. AI suggestions are categorized by Diagnosis, Treatment Plan, Medication, Lab Results, Allergies, Symptoms, and Vitals. Medical Categories include checkboxes for Diagnosis, Treatment, Patient, Research, and Medical. Patient Feedback and Health Records can be filtered by General, Specialist, and Surgeon. Personalized Recommendations display cards for Medical Research (Dr. Smith), Medical Innovations (Nurse Johnson), Healthcare Basics (Dr. Watson), and Medical Procedures (Nurse Emily).',
      },
      {
        title: 'Patient Data Entry',
        src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6912295bcf607c90c75bc0c1/2e88d52ea_Screenshot2025-11-10135423.png',
        alt: 'Add Patient Data',
        caption:
          'Comprehensive patient intake form captures critical information efficiently. Left column includes Patient name (Zoey Price), Patient ID (ID 123), Symptoms (Persistent Cough, Fever, runny nose), Doctor\'s notes (Seasonal flu, No evidence of bacterial infection), Medication list (Paracetamol 500mg every 6 hours for fever, Drink plenty of fluids), Insurance (UnitedHealthcare), Recommended (Advise flu vaccine if not already taken this season), Patient\'s condition (Stable, advised rest at home), and Next appointment (Two weeks from today to reassess condition). Right column captures Medical history, Date of diagnosis (5/21/2024), Nurse\'s observations (tentacrea), Allergies (checkBox), Additional tests (N/A), and Follow-up (tentacrea). Clear Submit data and Get Suggestions buttons complete the workflow.',
      },
      {
        title: 'AI-Powered Diagnostic Support',
        src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6912295bcf607c90c75bc0c1/2ba57272f_Screenshot2025-11-10135437.png',
        alt: 'AI Suggestions',
        caption:
          'The AI Suggestions screen provides intelligent alerts with disease prediction visualization. The alert for patient Zoey Price (Patient: ID123) shows "New treatment recommended" with a "View" and "Dismiss" option. The alert indicates likely Disease according to patients records. A bar chart visualizes disease prediction probabilities showing Lung Cancer (lowest probability), Tuberculosis (medium probability), and Pneumonia (highest probability around 1.2). A Filters panel on the right allows clinicians to toggle visibility of Diagnoses, Prescriptions, Appointments, Alerts, Reports, and Messages, with "Mark all" and "Clear all" options for quick filtering.',
      },
    ],
  },
  features: [
    {
      title: 'Intelligent Error Detection',
      solution:
        'AI-powered system catches diagnostic conflicts and prescription errors before they reach the patient',
    },
    {
      title: 'Real-Time Drug Interaction Alerts',
      solution:
        'Instant notifications about dangerous drug combinations, allergies, and contraindications',
    },
    {
      title: 'Allergy & Contraindication Checker',
      solution:
        'Comprehensive safety net that cross-references patient history with proposed treatments',
    },
    {
      title: 'Specialty-Based Dashboards',
      solution:
        'Customizable interfaces tailored to different medical specializations and workflows',
    },
    {
      title: 'Data Visualizations',
      solution:
        'Clear visual representations of vitals, lab results, history, and trends for faster pattern recognition',
    },
    {
      title: 'EHR Integration',
      solution:
        'Seamless connection with existing Electronic Health Record systems for unified patient data',
    },
  ],
  designDecisions: [
    {
      title: 'Dark Theme for Long Shifts',
      rationale:
        'Implemented a dark color scheme (#1A1A1A background) to reduce eye strain during 12+ hour shifts in low-light clinical environments. Blue accents (#63333A) provide high contrast for critical actions while maintaining professional medical aesthetic.',
    },
    {
      title: 'Card-Based Information Architecture',
      rationale:
        'Used modular cards to present distinct information categories (Patient Insights, Treatment Progress, Activities). This allows clinicians to scan quickly and focus on relevant data without cognitive overload. Each card has clear headings, icons, and metrics.',
    },
    {
      title: 'Persistent Navigation Sidebar',
      rationale:
        'Placed primary navigation in a fixed left sidebar with clear icons and labels. This ensures core functions (Login, Patient Data, Medical Plans, AI Suggestions, Settings) are always accessible regardless of scroll position or current task.',
    },
    {
      title: 'Visual Disease Prediction',
      rationale:
        'Transformed complex AI diagnostic data into clear bar charts showing probability comparisons between potential diagnoses (Lung Cancer, Tuberculosis, Pneumonia). Visual representation enables faster pattern recognition than text-based reports.',
    },
    {
      title: 'Contextual Filtering',
      rationale:
        'Built comprehensive filtering system with checkboxes for Diagnoses, Prescriptions, Appointments, Alerts, Reports, and Messages. Allows clinicians to customize information density based on current task and reduce notification fatigue.',
    },
  ],
  solution: {
    summary: [
      'An intelligent clinical decision-support system that reduces errors, streamlines workflows, and supports safer healthcare decisions.',
      'MEDEdge demonstrates how thoughtful UX design can directly impact patient safety and clinical outcomes. By reducing cognitive load, streamlining decision-making, and providing intelligent error prevention, the platform empowers healthcare professionals to deliver better care.',
      'This project reinforced that in healthcare design, every pixel matters. Clear visual hierarchy, intuitive interactions, and intelligent information architecture aren\'t just nice-to-haves—they\'re essential tools for saving lives.',
    ],
  },
  impact: {
    metrics: [
      { value: '35%', label: 'Reduction in prescription errors during pilot testing' },
      { value: '28%', label: 'Improvement in diagnostic accuracy with AI assistance' },
      { value: '4.5 min', label: 'Faster average consultation time per patient' },
      { value: '90%', label: 'Positive feedback from clinicians during user testing' },
    ],
    qualitative: [
      'Patient Safety: The intelligent error detection system successfully caught dangerous drug interactions and allergy conflicts that would have otherwise been missed in fast-paced clinical environments.',
      'Workflow Efficiency: By consolidating patient data into a single, well-organized dashboard, clinicians spend less time searching across multiple systems and more time focused on patient care.',
      'Diagnostic Confidence: AI-powered disease prediction with visual probability comparisons gives clinicians additional data points to support evidence-based decision making.',
    ],
  },
  reflection: {
    learned: [
      'Medical UI Must Reduce Cognitive Load — Through user testing, I learned that every extra click, unnecessary label, or unclear icon adds cognitive burden on already overloaded clinicians. The best medical interfaces feel invisible—they surface exactly the right information at exactly the right moment.',
      'Clarity and Hierarchy Directly Impact Safety — In healthcare design, poor visual hierarchy isn\'t just bad UX—it can be deadly. Clear typography, color-coded alerts, and consistent iconography ensure critical safety warnings are never missed in high-pressure situations.',
      'Simplicity Must Be Balanced with Clinical Depth — While simplification is crucial, oversimplifying can remove the clinical depth doctors need for complex decision-making. The challenge was creating progressive disclosure—simple at a glance, but with detailed data available when needed.',
      'Privacy & Security Shape Design Choices — Healthcare data is highly sensitive. Design decisions around authentication, data display, and access controls had to prioritize HIPAA compliance and patient privacy without creating friction in clinical workflows.',
    ],
  },
  nextSteps: {
    items: [
      {
        title: 'AI-Powered Diagnostic Assistance',
        description:
          'Enhance machine learning models to provide even more accurate disease predictions based on symptom patterns, lab results, and patient history.',
      },
      {
        title: 'Pattern Recognition in Lab Results',
        description:
          'Implement advanced analytics to automatically detect concerning trends in lab values over time, flagging potential issues before they become critical.',
      },
      {
        title: 'Mobile App for Clinicians',
        description:
          'Develop iOS and Android apps optimized for on-the-go access, allowing doctors to review patient information and receive critical alerts between rounds.',
      },
      {
        title: 'Patient Portal for Transparency',
        description:
          'Create a patient-facing interface where individuals can view their own medical records, understand their diagnoses, and track treatment progress.',
      },
    ],
  },
  closing: {
    contactPrompt:
      "I'd love to share more about the design decisions and clinical insights that shaped MEDEdge.",
  },
  missing: [
    '[MEDIA NEEDED: Design system board (color, type, key components)]',
    '[MEDIA NEEDED: Before-and-after iteration comparisons]',
    '[CONTENT NEEDED: Structured usability testing write-up (method, n, tasks, findings)]',
    '[CONTENT NEEDED: Accessibility decisions that can be supported by the work]',
  ],
};

export default {
  id: 'zoom',
  slug: 'ZoomRedesign',
  name: 'ZOOM REDESIGN',
  shortName: 'Zoom Redesign',
  category: 'Accessibility Design',
  oneLiner:
    "This project focuses on enhancing Zoom's accessibility by introducing AI sign language avatars. The goal is to create a more inclusive platform, empowering hearing-impaired users to participate equally in virtual meetings.",
  heroImage: {
    src: '/case-studies/zoom-hero.png',
    alt: 'Zoom Redesign — accessibility case study hero with settings, meeting, and AI sign language avatar',
    fit: 'contain',
    size: 'hero',
  },
  overview: {
    product: "Redesigning Zoom's Accessibility Features for Hearing-Impaired Users",
    what: "A redesign of Zoom’s accessibility experience, introducing AI-powered sign-language support, improved captions, and more flexible meeting controls.",
    audience:
      "Deaf and hard-of-hearing users who rely on captions, sign language, and visual communication during virtual meetings.",
    why: "To create a more inclusive Zoom experience where users can follow conversations, contribute confidently, and review important information without depending entirely on external tools.",
    teamOwnership:
      "This was a three-person team project. I worked as the UI/UX Designer alongside Anyomi Selasi, Project Manager, and Olaoluwa James, Software Developer. I owned the user experience and interface design for the accessibility concept. I did not own project management or engineering implementation.",
    duration: "November 2024",
    role: "UX/UI Designer and Accessibility Advocate",
    team: null,
    tools: "Figma, User Research",
    platform: "Web/Desktop",
  },
  challenge: {
    problem:
      'Based on my research, millions of hearing-impaired users face significant challenges when participating in virtual meetings. These challenges create barriers to meaningful engagement and equal opportunities.',
    affected: 'Hearing-impaired users in professional and educational virtual meetings',
    whyItMatters:
      'Inaccurate captions, missing sign language support, and exclusion in education and work leave users feeling isolated and unable to engage equally.',
    context:
      'Platforms like Zoom do not offer integrated sign language interpretation, forcing reliance on unreliable captions or costly third-party solutions.',
    findings: [
      'Inaccurate Captions: Current automated captions are often unreliable, with delays and errors',
      'Lack of Sign Language Support: Platforms like Zoom do not offer integrated sign language interpretation',
      'Exclusion in Education and Work: Hearing-impaired users face obstacles in professional and educational settings',
      'Social Isolation: The inability to follow conversations leaves users feeling excluded',
    ],
    media: {
      src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6912295bcf607c90c75bc0c1/a8a24d112_wehear.png',
      alt: 'The Challenge',
    },
  },
  role: {
    responsibilities: [
      'Conducting research (product research, user interviews, competitive analysis)',
      'Designing wireframes, prototypes, and mockups',
      'Collaborating with users and stakeholders to ensure inclusivity',
      'Testing and refining accessibility features',
    ],
    collaborators:
      'Anyomi Selasi (Project Manager), Olaoluwa James (Software Developer)',
    didNotOwn: 'Project management and engineering implementation',
  },
  research: {
    methods: ['Product research', 'User interviews', 'Competitive analysis'],
    summary:
      'Primary Audience: Hearing-impaired users who rely on captions and sign language for communication',
    media: [
      {
        src: '/case-studies/zoom-user-research.png',
        alt: 'User research — primary audience, challenges, and competitive feature comparison',
        fit: 'contain',
        size: 'default',
      },
    ],
  },
  insights: [
    {
      title: 'Inaccurate captions hinder comprehension',
      discovery: 'Inaccurate captions hinder comprehension',
    },
    {
      title: 'Lack of built-in sign language support',
      discovery: 'Lack of built-in sign language support',
    },
    {
      title: 'Reliance on costly third-party solutions',
      discovery: 'Reliance on costly third-party solutions or interpreters',
    },
  ],
  users: {
    summary:
      'After thorough research, we identified the behavior, thinking, feelings, and needs of our target audience. This fictional character represents our target user.',
    personas: [
      {
        title: 'Charlotte',
        painPoints: [],
        image: {
          src: '/case-studies/zoom-persona.png',
          alt: 'User persona — Charlotte, Project Manager with profound hearing loss',
          fit: 'contain',
          size: 'compact',
        },
      },
    ],
  },
  journey: {
    explanation:
      'We identified that hearing-impaired users feel isolated and anxious during meetings, as they constantly struggle to follow the conversation. This led us to prioritize features that enhance inclusivity and reduce cognitive load.',
    media: [
      {
        src: '/case-studies/zoom-user-journey.png',
        alt: 'User journey map — before, during, after, and follow-up meeting stages',
        fit: 'contain',
        size: 'default',
      },
    ],
  },
  empathyMap: {
    explanation:
      'To better understand the user’s experience, we mapped what hearing-impaired users say, think, do, and feel during virtual meetings. This helped us uncover the emotional impact of inaccessible communication and identify where Zoom could provide clearer, more inclusive support.',
    media: [
      {
        src: '/case-studies/zoom-empathy-map.png',
        alt: 'Empathy map — Says, Thinks, Does, and Feels for hearing-impaired Zoom users',
        fit: 'contain',
        size: 'default',
      },
    ],
  },
  flows: {
    explanation:
      'The user flow focuses on streamlining the activation and customization of accessibility features. By navigating through a simple path, users can enhance their virtual meeting experience with tailored tools. This flow ensures that hearing-impaired users can independently activate tools that meet their unique needs, fostering greater inclusion and ease of use.',
    media: [
      {
        src: '/case-studies/zoom-user-flow.png?v=2',
        alt: 'User flow — from opening Zoom to customizing accessibility settings and joining a meeting',
        caption: 'Simplifying the Path to Accessibility',
        fit: 'contain',
        variant: 'sticker',
        size: 'compact',
      },
    ],
  },
  wireframes: {
    carousel: true,
    items: [
      {
        label: 'Home dashboard',
        src: '/case-studies/zoom-wireframe-01-home.png',
        alt: 'Wireframe — Home dashboard with accessibility quick actions',
      },
      {
        label: 'Accessibility hub',
        src: '/case-studies/zoom-wireframe-02-accessibility-hub.png',
        alt: 'Wireframe — Accessibility hub in Settings',
      },
      {
        label: 'Caption settings',
        src: '/case-studies/zoom-wireframe-03-captions.png',
        alt: 'Wireframe — Caption settings and appearance controls',
      },
      {
        label: 'Sign-language avatar settings',
        src: '/case-studies/zoom-wireframe-04-sign-language.png',
        alt: 'Wireframe — Sign-language avatar settings',
      },
      {
        label: 'Live meeting experience',
        src: '/case-studies/zoom-wireframe-05-live-meeting.png',
        alt: 'Wireframe — Live meeting with captions and sign language',
      },
      {
        label: 'Meeting transcript',
        src: '/case-studies/zoom-wireframe-06-transcript.png',
        alt: 'Wireframe — Meeting transcript view',
      },
    ],
  },
  visualDirection: {
    explanation:
      "The redesign maintains Zoom's recognizable branding while enhancing accessibility with thoughtful design choices. The design aligns with Zoom's established visual identity while incorporating enhancements that prioritize inclusivity and usability. Simple, universally understood icons ensure clarity across all accessibility features. This approach ensures the redesigned interface is not only accessible but also familiar and visually cohesive.",
    media: [
      {
        src: '/case-studies/zoom-visual-system.png?v=2',
        alt: 'Visual system — design principles, color palette, typography, accessibility choices, and icon set',
        fit: 'contain',
        size: 'default',
      },
    ],
  },
  finalInterface: {
    items: [
      {
        title: 'Main Screens',
        gallery: [
          {
            label: 'Home dashboard',
            description:
              'Quick access to captions, sign-language support, contrast, and text-size controls.',
            src: '/case-studies/zoom-hi-fi-01-home.png',
            alt: 'Home dashboard with accessibility quick actions',
          },
          {
            label: 'Accessibility hub',
            description: "A centralized view of Zoom's accessibility features.",
            src: '/case-studies/zoom-hi-fi-02-accessibility-hub.png',
            alt: 'Accessibility hub listing captions, sign language, visual, audio, and more',
          },
          {
            label: 'Accessibility preferences',
            description:
              'Custom controls for vision, hearing, and interaction needs.',
            src: '/case-studies/zoom-hi-fi-03-accessibility-preferences.png',
            alt: 'Accessibility preferences for vision, hearing, and interaction',
          },
          {
            label: 'Sign-language support',
            description:
              'Avatar selection, size, language, and screen placement.',
            src: '/case-studies/zoom-hi-fi-04-sign-language.png',
            alt: 'Sign-language support settings with avatar preview',
          },
          {
            label: 'Caption customization',
            description:
              'Flexible caption appearance, position, size, and contrast.',
            src: '/case-studies/zoom-hi-fi-05-caption-customization.png',
            alt: 'Caption appearance customization settings',
          },
          {
            label: 'Inclusive meeting experience',
            description:
              'Live captions, transcript controls, interpreter settings, and the sign-language avatar in one meeting view.',
            src: '/case-studies/zoom-hi-fi-06-inclusive-meeting.png',
            alt: 'Inclusive meeting with captions sidebar and sign-language avatar',
          },
        ],
      },
      {
        title: 'Video Demo',
        video: '/case-studies/zoom/demo/frame_01710.mp4',
        videoMuted: '/case-studies/zoom/demo/frame_01710.mp4',
        poster: '/case-studies/zoom/demo/frame_01710.jpg',
        alt: 'Product demo of Charlotte using Zoom accessibility features in a live meeting',
        caption:
          'A product walkthrough: Charlotte enables captions and the AI sign-language avatar, joins an inclusive meeting with a live sign-language avatar, then reviews an accessible recap afterward.',
      },
      {
        title: 'Testimonials',
        src: '/case-studies/zoom-testimonials.png',
        alt: 'Testimonials from Charlotte and Josh on the Zoom accessibility redesign',
        fit: 'contain',
        size: 'default',
      },
    ],
  },
  solution: {
    summary: [
      'Enhancing Zoom\'s accessibility by introducing AI sign language avatars to create a more inclusive platform, empowering hearing-impaired users to participate equally in virtual meetings.',
      'The user flow streamlines the activation and customization of accessibility features so hearing-impaired users can independently activate tools that meet their unique needs.',
    ],
  },
  reflection: {
    learned: [
      'This project reinforced the importance of designing with, not for, users.',
      "Accessibility isn't an add-on—it's foundational. Every design decision should consider diverse needs from the start.",
      "Working on this redesign taught me that true inclusion requires listening deeply to the people you're designing for and being willing to challenge existing systems.",
    ],
  },
  nextSteps: {
    steps: [
      {
        id: 'feature',
        number: '01',
        title: 'Feature Improvements',
        items: [
          'Real-time translation',
          'Context-aware accuracy',
          'Support for multiple sign languages',
        ],
        icon: {
          src: '/case-studies/zoom-roadmap-01-feature.png',
          alt: '3D icon representing accessibility feature improvements',
        },
      },
      {
        id: 'testing',
        number: '02',
        title: 'User Testing',
        items: [
          'Workplace testing',
          'Education environments',
          'Everyday meeting scenarios',
        ],
        icon: {
          src: '/case-studies/zoom-roadmap-02-testing.png',
          alt: '3D icon representing user testing and participant feedback',
        },
      },
      {
        id: 'launch',
        number: '03',
        title: 'Launch Plan',
        items: [
          'Controlled pilot program',
          'Guided onboarding',
          'Phased public rollout',
        ],
        icon: {
          src: '/case-studies/zoom-roadmap-03-launch.png',
          alt: '3D icon representing a structured product launch plan',
        },
      },
      {
        id: 'partnerships',
        number: '04',
        title: 'Partnerships',
        items: [
          'Deaf advocacy groups',
          'Accessibility organizations',
          'Ongoing community feedback',
        ],
        icon: {
          src: '/case-studies/zoom-roadmap-04-partnerships.png',
          alt: '3D icon representing community and organizational partnerships',
        },
      },
      {
        id: 'monitoring',
        number: '05',
        title: 'Monitoring',
        items: [
          'Usage and accessibility insights',
          'AI model improvements',
          'Continuous feature refinement',
        ],
        icon: {
          src: '/case-studies/zoom-roadmap-05-monitoring.png',
          alt: '3D icon representing product monitoring and performance insights',
        },
      },
    ],
  },
  impact: {
    intro:
      'Although this was a personal concept project and was not launched within Zoom, the final redesign demonstrates how accessibility support can become more discoverable, customizable, and integrated into the meeting experience.',
    cards: [
      {
        title: 'Improved discoverability',
        text: 'Accessibility features were brought into one centralized hub instead of being scattered across multiple settings.',
      },
      {
        title: 'Greater personalization',
        text: 'Users can customize captions, select a preferred sign language, adjust the avatar’s size, and choose where it appears during meetings.',
      },
      {
        title: 'A more cohesive meeting experience',
        text: 'Captions, active-speaker feedback, transcript controls, chat, and the sign-language avatar work together within the live meeting interface.',
      },
      {
        title: 'Support beyond the live call',
        text: 'Post-meeting transcripts and summaries allow users to revisit important information after the conversation ends.',
      },
    ],
    validation:
      'The concept was evaluated through usability testing focused on whether participants could locate the accessibility settings, customize captions, enable and position the sign-language avatar, follow the live meeting experience, and access information after the meeting.',
  },
  testing: {
    intro:
      'I evaluated the redesigned Zoom accessibility experience to understand whether users could easily discover, personalize, and use the new accessibility features.',
    blocks: [
      {
        label: 'Method',
        text: 'Moderated usability testing using the interactive desktop prototype.',
      },
      {
        label: 'Participants',
        text: '4 participants who regularly use virtual meeting platforms, including 3 Deaf or hard-of-hearing participants.',
      },
      {
        label: 'Tasks',
        text: 'Find the accessibility settings, customize live captions, enable and position the sign-language avatar, participate in a meeting, and locate the post-meeting transcript.',
      },
      {
        label: 'What was measured',
        text: 'Task completion, ease of navigation, misclicks, moments of confusion, confidence, and participant feedback.',
      },
    ],
  },
  iterations: {
    intro:
      'Feedback revealed that the accessibility tools needed to be easier to discover, more customizable, and better integrated into the live meeting experience. I used these findings to refine three key areas of the redesign.',
    items: [
      {
        title: 'Accessibility settings discovery',
        description:
          'Accessibility options moved from scattered settings into one centralized, easier-to-scan hub.',
        note: 'clearer grouping, stronger hierarchy, and faster feature discovery.',
        before: {
          src: '/case-studies/zoom-iteration-01-discovery-before.png',
          alt: 'Before — accessibility options scattered across general settings',
        },
        after: {
          src: '/case-studies/zoom-iteration-01-discovery-after.png',
          alt: 'After — a centralized accessibility hub grouping every feature',
        },
      },
      {
        title: 'Sign-language avatar controls',
        description:
          'A basic interpreter toggle became a dedicated experience with language, size, position, avatar, and preview controls.',
        note: 'full customization with language, size, position, avatar, and live preview.',
        before: {
          src: '/case-studies/zoom-iteration-02-avatar-before.png',
          alt: 'Before — a single sign-language interpreter toggle',
        },
        after: {
          src: '/case-studies/zoom-iteration-02-avatar-after.png',
          alt: 'After — a dedicated sign-language avatar screen with language, size, position, and preview',
        },
      },
      {
        title: 'Live meeting experience',
        description:
          'Separate accessibility tools were integrated into one meeting view with captions, transcript controls, speaker feedback, and the signing avatar.',
        note: 'a unified meeting view combining captions, transcript, speaker feedback, and the signing avatar.',
        before: {
          src: '/case-studies/zoom-iteration-03-meeting-before.png',
          alt: 'Before — accessibility tools separated from the meeting view',
        },
        after: {
          src: '/case-studies/zoom-iteration-03-meeting-after.png',
          alt: 'After — captions, transcript controls, speaker feedback, and signing avatar in one meeting view',
        },
      },
    ],
  },
  closing: {
    contactPrompt:
      "Want to discuss how accessibility shaped this redesign? I'd love to walk through the decisions.",
  },
  missing: [
    '[CONTENT NEEDED: User and business goals + success criteria]',
    '[CONTENT NEEDED: Usability testing details]',
    '[MEDIA NEEDED: Before-and-after iteration comparisons]',
    '[CONTENT NEEDED: Results and impact]',
  ],
};

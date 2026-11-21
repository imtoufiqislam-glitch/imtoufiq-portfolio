export const PORTFOLIO_ASSETS = {
  heroStudioPortrait: '/assets/toufiq-hero-cutout.png',
  heroSculptAvatar: '/src/assets/images/toufiq_creative_3d_avatar_1795287822406.jpg',
  aboutStudioPortrait: '/src/assets/images/toufiq_about_studio_1795287823619.jpg',
  projectBoikhujistore: '/src/assets/images/project_boikhujistore_1795287819501.jpg',
  projectVipbazer: '/src/assets/images/project_vipbazer_1795287819743.jpg',
  projectVideoMotion: '/src/assets/images/project_video_motion_1795287821986.jpg',
};

export const personalInfo = {
  name: 'Toufiq',
  firstName: 'Toufiq',
  brandName: 'Toufiq',
  title: 'Developer & Digital Marketer',
  location: 'Bangladesh · Available Worldwide',
  summary:
    'Web developer and growth-focused digital marketer building custom coded websites, profitable Meta Ads funnels, technical SEO architectures, short-form video edits, and social media brand systems.',
};

export const socialLinks = {
  emailPrimary: 'hello@imtoufiq.xyz',
  emailContact: 'contact@imtoufiq.xyz',
  emailHref: 'mailto:hello@imtoufiq.xyz',
  emailContactHref: 'mailto:contact@imtoufiq.xyz',
  whatsappNumber: '+8801316586101',
  whatsapp: 'https://wa.me/8801316586101',
  telegramHandle: '@ToufiqOnChain',
  telegram: 'https://t.me/ToufiqOnChain',
  discord: 'https://discord.com/users/1137590266530906202',
  facebook: '',
  instagram: '',
};

export const heroContent = {
  greeting: "Hi, I'm Toufiq",
  titleHighlight: 'Developer & Digital Marketer',
  subtitle:
    'I build modern coded websites and scale brands with Meta Ads, SEO, video editing, and social media management.',
  ctaPrimary: { text: 'View My Work', href: '#projects' },
  ctaSecondary: { text: 'Contact Me', href: '#contact' },
  ctaResume: { text: 'Download Resume' },
};

export const aboutContent = {
  heading: 'Hello!',
  nameHighlight: 'Toufiq',
  bioPrefix: 'Hi, my name is',
  bioSuffix:
    'a creative web developer and digital marketer dedicated to building eye-catching coded websites and scaling real businesses through Meta Ads, SEO, engaging video edits, and consistent social media management.',
};

export const technicalSkills = {
  categories: [
    {
      title: 'Web Development',
      skills: [
        { name: 'React & TypeScript', level: 92 },
        { name: 'HTML5 / CSS3 / Tailwind', level: 95 },
        { name: 'JavaScript (ES6+)', level: 90 },
        { name: 'Three.js / 3D Web UI', level: 82 },
      ],
    },
    {
      title: 'Meta Ads & Performance',
      skills: [
        { name: 'Meta Ads Manager', level: 94 },
        { name: 'Pixel & CAPI Tracking', level: 90 },
        { name: 'Audience & Funnel Strategy', level: 92 },
        { name: 'ROAS & CPA Scaling', level: 89 },
      ],
    },
    {
      title: 'SEO & Analytics',
      skills: [
        { name: 'Technical & On-Page SEO', level: 90 },
        { name: 'Keyword & Competitor Research', level: 92 },
        { name: 'Google Search Console', level: 88 },
        { name: 'GA4 & Conversion Insights', level: 86 },
      ],
    },
    {
      title: 'Video Editing & Motion',
      skills: [
        { name: 'Short-Form Reels & Ads', level: 88 },
        { name: 'Hook Pacing & Storytelling', level: 90 },
        { name: 'Motion Captions & Subtitles', level: 86 },
        { name: 'Color Grading & Sound Sync', level: 82 },
      ],
    },
    {
      title: 'Social Media Management',
      skills: [
        { name: 'Content Calendar Strategy', level: 92 },
        { name: 'Facebook & Instagram Growth', level: 94 },
        { name: 'Brand Visual Direction', level: 87 },
        { name: 'Community & DM Funnels', level: 88 },
      ],
    },
    {
      title: 'Tools & Engineering Workflow',
      skills: [
        { name: 'Node.js & Express Basics', level: 80 },
        { name: 'Git & Modern Deployment', level: 88 },
        { name: 'UI Prototyping & Responsive QA', level: 91 },
        { name: 'Speed & Core Web Vitals', level: 89 },
      ],
    },
  ],
};

export const processContent = {
  badge: 'My Process',
  heading: "Here's how I turn ideas into high-growth digital brands",
  description:
    'I combine custom code, conversion design, and data-driven marketing so your website looks sharp and brings real customers.',
  cards: [
    {
      number: '01',
      title: 'Research & Audit',
      text: 'Understanding your brand goals, target audience, competitors, and funnel bottlenecks to lay a high-converting foundation.',
    },
    {
      number: '02',
      title: 'Design & Creative',
      text: 'Crafting standout web interfaces, eye-catching visuals, and scroll-stopping video ad creatives tailored to your brand identity.',
    },
    {
      number: '03',
      title: 'Build & Launch',
      text: 'Writing clean, fast, SEO-ready frontend code with Meta Pixel, analytics events, and mobile-first responsiveness baked in.',
    },
    {
      number: '04',
      title: 'Market & Scale',
      text: 'Launching structured Meta Ads campaigns, ranking priority keywords on search, and growing active social channels every week.',
    },
  ],
  endText: 'Ready to grow!',
};

export interface PortfolioProject {
  id: string;
  number: string;
  badge: string | null;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  image: string;
  techTags: string[];
  isFlagship: boolean;
}

export const projects: PortfolioProject[] = [
  {
    id: 'boikhujistore',
    number: '01',
    badge: 'Flagship Project',
    title: 'Boikhujistore',
    subtitle: 'E-Commerce Bookstore & Meta Ads Scaling',
    description:
      'Custom e-commerce web storefront built for fast mobile browsing, clean book discovery, and frictionless checkout—paired directly with full-funnel Meta Ads campaigns and Pixel conversion tracking that sustained 4.8x ROAS.',
    challenge:
      'Slow mobile browsing and unsegmented ad boosts caused high cart abandonment and weak return on ad spend.',
    solution:
      'Built a lightweight responsive storefront with structured product filtering, Meta Pixel event tracking, and fresh vertical ad reels.',
    impact: '4.8x ROAS · +240% revenue growth over 90 days',
    image: PORTFOLIO_ASSETS.projectBoikhujistore,
    techTags: ['React', 'TypeScript', 'Tailwind CSS', 'Meta Ads', 'Pixel Tracking', 'Technical SEO'],
    isFlagship: true,
  },
  {
    id: 'vipbazer',
    number: '02',
    badge: null,
    title: 'VIPBazer',
    subtitle: 'Multi-Vendor Marketplace & Organic SEO',
    description:
      'Scalable online marketplace interface featuring clean category merchandising, vendor analytics overviews, and technical on-page SEO architecture engineered to capture high-intent search traffic.',
    challenge:
      'Multi-category listings lacked structured metadata and clean URL hierarchy, limiting organic search visibility.',
    solution:
      'Designed modular product grids, optimized Core Web Vitals, and deployed structured schema across priority buyer categories.',
    impact: '+180% organic search clicks · Top-3 buyer keywords',
    image: PORTFOLIO_ASSETS.projectVipbazer,
    techTags: ['Next.js', 'React', 'Node.js', 'On-Page SEO', 'GA4 Analytics', 'UI Design'],
    isFlagship: false,
  },
  {
    id: 'meta-growth-engine',
    number: '03',
    badge: null,
    title: 'Meta Ads & Reels Growth Engine',
    subtitle: 'Performance Ad Creatives + Social Media Management',
    description:
      'End-to-end paid social creative pipeline combining short-form video editing, 3-second hook testing, color grading, and weekly Facebook/Instagram page management to cut cost-per-acquisition and scale orders.',
    challenge:
      'Static product posts suffered rapid ad fatigue and low click-through rates across Facebook and Instagram feeds.',
    solution:
      'Produced 40+ dynamic short-form video edits with kinetic captions and ran structured retargeting + prospecting ad sets.',
    impact: '6.2% avg CTR · 1.8M+ social & reel impressions',
    image: PORTFOLIO_ASSETS.projectVideoMotion,
    techTags: ['Meta Ads Manager', 'Video Editing', 'Reels Hooks', 'Social Media', 'Creative Testing'],
    isFlagship: false,
  },
];

export const contentCreation = {
  badge: 'Video & Social Creative',
  heading: 'Creative Direction, Video Edits & Social Growth',
  description:
    'Beyond writing code, I edit engaging short-form videos, craft high-converting Meta ad creatives, and manage social pages that build real audience trust.',
  categories: [
    {
      title: 'Performance Ad Creatives',
      description:
        'Scroll-stopping 15–30 second product promos engineered with strong 3-second hooks designed specifically to convert on Meta Ads.',
      stats: '40+ Ad Edits',
      key: 'ads',
    },
    {
      title: 'Instagram & Facebook Reels',
      description:
        'Crisp pacing, clean transitions, motion captions, and rhythmic cuts that boost watch-time retention and organic reach.',
      stats: '1.8M+ Views',
      key: 'reels',
    },
    {
      title: 'Social Media Management',
      description:
        'End-to-end page management including monthly content calendars, visual grid direction, posting cadence, and audience growth.',
      stats: 'Full Page Growth',
      key: 'social',
    },
    {
      title: 'Brand Visuals & 3D Web Motion',
      description:
        'Combining custom studio portraits, interactive 3D web elements, and cohesive visual storytelling so brands look unforgettable.',
      stats: 'Custom Direction',
      key: 'visuals',
    },
  ],
};

export const experienceList = [
  {
    organization: 'Freelance Web & 3D Builds',
    role: 'Custom Website Developer',
    duration: 'Ongoing · Client Projects',
    badge: 'Development',
    skills: [
      'Responsive React & TypeScript Websites',
      'Interactive 3D Portfolio & Landing Pages',
      'E-Commerce Storefront Architecture',
      'Speed & Mobile Conversion Optimization',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js'],
  },
  {
    organization: 'E-Commerce & Local Brands',
    role: 'Meta Ads & SEO Growth Specialist',
    duration: 'Ongoing · Retainers',
    badge: 'Marketing',
    skills: [
      'Full-Funnel Facebook & Instagram Ads',
      'Meta Pixel & Conversion Event Setup',
      'Technical & On-Page SEO Audits',
      'Weekly ROAS & Traffic Reporting',
    ],
    tech: ['Meta Ads', 'SEO', 'GA4', 'Search Console'],
  },
  {
    organization: 'Digital Brands & Creators',
    role: 'Video Editor & Social Media Manager',
    duration: 'Ongoing · Creative',
    badge: 'Creative',
    skills: [
      'Short-Form Reels & Ad Hook Editing',
      'Color Grading & Motion Captions',
      'Monthly Content Calendar Execution',
      'Organic Engagement & Funnel Growth',
    ],
    tech: ['Video Editing', 'Reels', 'Social Strategy', 'Branding'],
  },
];

export const journeyTimeline = [
  {
    title: 'Full-Stack & Interactive Web Engineering',
    role: 'Modern Coded Websites',
    badge: 'Web Dev',
    description:
      'Building custom websites with React, TypeScript, Tailwind CSS, and interactive Three.js motion—moving beyond rigid templates into fast, standout digital products.',
  },
  {
    title: 'Meta Ads & Performance Scaling Systems',
    role: 'Paid Acquisition Specialist',
    badge: 'Meta Ads',
    description:
      'Designing structured prospecting and retargeting funnels on Facebook and Instagram backed by clean tracking, creative testing, and profitable ROAS targets.',
  },
  {
    title: 'Technical SEO & Search Visibility',
    role: 'Organic Growth Architect',
    badge: 'SEO',
    description:
      'Pairing clean frontend code with structured metadata, keyword mapping, and page-speed tuning so client websites earn compounding organic traffic.',
  },
  {
    title: 'Short-Form Video Editing & Creative Direction',
    role: 'Reels & Promo Editor',
    badge: 'Video Editing',
    description:
      'Editing punchy reels, product showcases, and ad hooks with crisp captions and rhythm tailored for high retention on mobile feeds.',
  },
  {
    title: 'End-to-End Social Media Management',
    role: 'Brand Growth Partner',
    badge: 'Social Media',
    description:
      'Managing Facebook and Instagram presence with cohesive visuals, consistent scheduling, and campaign alignment that turns followers into buyers.',
  },
];

export const credentialsList = [
  {
    name: 'Modern Frontend & React Development',
    issuer: 'Custom Coded Web Builds',
    code: 'DEV',
  },
  {
    name: 'Meta Ads & Conversion Funnel Strategy',
    issuer: 'Facebook & Instagram Performance',
    code: 'ADS',
  },
  {
    name: 'Technical & On-Page SEO Optimization',
    issuer: 'Search Ranking & Core Web Vitals',
    code: 'SEO',
  },
  {
    name: 'Short-Form Video Editing & Ad Hooks',
    issuer: 'Reels, Shorts & Promo Production',
    code: 'VID',
  },
  {
    name: 'Social Media Brand Management',
    issuer: 'Content Strategy & Audience Growth',
    code: 'SMM',
  },
  {
    name: 'Analytics, Tracking & Pixel Attribution',
    issuer: 'GA4 · Search Console · Meta Pixel',
    code: 'DATA',
  },
];

export const softSkillsList = [
  {
    name: 'Growth Mindset',
    desc: 'Every website and campaign is designed around measurable business outcomes, not just aesthetics.',
  },
  {
    name: 'Visual Storytelling',
    desc: 'Blending clean web UI with short-form video pacing to capture attention in the first three seconds.',
  },
  {
    name: 'Client Communication',
    desc: 'Clear updates, transparent reporting, and straightforward collaboration from kickoff to launch.',
  },
  {
    name: 'Problem Solving',
    desc: 'Diagnosing code bugs, slow pages, or high ad CPAs and fixing root causes directly.',
  },
  {
    name: 'Creative Adaptability',
    desc: 'Switching smoothly between frontend code, ad analytics, video timelines, and social calendars.',
  },
  {
    name: 'Data Discipline',
    desc: 'Testing creative hooks, CTR, and search rankings systematically rather than guessing.',
  },
  {
    name: 'Execution Speed',
    desc: 'Shipping clean websites, ad batches, and edited reels reliably on tight commercial schedules.',
  },
  {
    name: 'Ownership',
    desc: 'Treating every client store, ad budget, and brand page with long-term care and accountability.',
  },
];

export const footerContent = {
  taglines: [
    'Web Development & 3D UI',
    'Meta Ads · SEO · Video Editing',
    'Social Media Management',
  ],
  credential: 'Developer & Digital Marketer',
  copyright: `© ${new Date().getFullYear()} Toufiq · Built with React & Three.js`,
};

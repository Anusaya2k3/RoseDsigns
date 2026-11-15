export type ServiceId = 'branding' | 'websites' | 'content' | 'marketing';

export type WorkCategory = 'All' | 'Websites' | 'Social & Reels' | 'Brand Identity';

export interface ServiceItem {
  id: ServiceId;
  number: string;
  title: string;
  shortLabel: string;
  summary: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
  deliverables: string[];
  typicalTimeline: string;
  outcomeNote: string;
}

export interface WorkProject {
  id: string;
  title: string;
  category: Exclude<WorkCategory, 'All'>;
  channelLabel: string;
  url: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
  accentBg: string;
  year: string;
  clientSector: string;
  headlineMetric: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  featured?: boolean;
}

export interface ProcessPhase {
  step: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  outputs: string[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  detail: string;
}

export const CYCLING_HEADLINE_WORDS = ['bloom.', 'stand out.', 'go viral.', 'grow.'];

export const MARQUEE_ITEMS = [
  'BRANDING',
  'WEBSITES',
  'CONTENT',
  'DIGITAL MARKETING',
  'BRANDS THAT BLOOM',
];

export const STUDIO_STATS: StatItem[] = [
  {
    value: 129,
    suffix: 'K',
    label: 'views on a single reel',
    detail: 'Organic hospitality storytelling',
  },
  {
    value: 4,
    suffix: '',
    label: 'core studio disciplines',
    detail: 'Branding, web, content & growth',
  },
  {
    value: 3,
    suffix: '',
    label: 'step creative process',
    detail: 'Discover, create & connect',
  },
  {
    value: 100,
    suffix: '%',
    label: 'responsive architecture',
    detail: 'Crafted for every screen width',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'branding',
    number: '01',
    title: 'Branding',
    shortLabel: 'Branding',
    summary: 'Logos, palettes and guidelines that make your brand instantly recognisable.',
    ctaLabel: 'Start a brand',
    image: '/assets/original/img_3.jpg',
    imageAlt: 'RoseDsigns branding mockup: business cards and colour palette',
    objectPosition: '50% 50%',
    deliverables: [
      'Primary & secondary logo suite',
      'Curated colour system & typography pairing',
      'Tactile stationery & packaging direction',
      'Comprehensive brand style guide',
    ],
    typicalTimeline: '2–3 weeks',
    outcomeNote: 'Cohesive visual recognition across print and digital touchpoints.',
  },
  {
    id: 'websites',
    number: '02',
    title: 'Websites',
    shortLabel: 'Websites',
    summary: 'Fast, responsive, purposeful sites designed to convert visitors into customers.',
    ctaLabel: 'Plan a site',
    image: '/assets/original/img_4.jpg',
    imageAlt: 'RoseDsigns project showcase displayed on a laptop',
    objectPosition: '50% 38%',
    deliverables: [
      'Custom responsive UI/UX architecture',
      'Interactive motion & micro-interactions',
      'SEO-ready semantic markup & speed tuning',
      'Conversion-focused enquiry & menu flows',
    ],
    typicalTimeline: '3–5 weeks',
    outcomeNote: 'Tailored web experiences engineered for effortless navigation on mobile and desktop.',
  },
  {
    id: 'content',
    number: '03',
    title: 'Content',
    shortLabel: 'Content',
    summary: 'Reels, videos and social creative that tell your story with energy.',
    ctaLabel: 'Explore reels',
    image: '/assets/original/img_5.jpg',
    imageAlt: 'Reels and stories content mockup for a culinary brand',
    objectPosition: '50% 50%',
    deliverables: [
      'Short-form vertical Reels & story pacing',
      'Editorial food, hospitality & product art direction',
      'Grid aesthetic planning & carousel systems',
      'Hook scripting & visual rhythm editing',
    ],
    typicalTimeline: 'Monthly or campaign sprint',
    outcomeNote: 'Proven viral reach including 129K+ organic views on a single restaurant reel.',
  },
  {
    id: 'marketing',
    number: '04',
    title: 'Digital Marketing',
    shortLabel: 'Marketing',
    summary: 'Campaigns across social and search that connect you with the right audience.',
    ctaLabel: 'Grow with us',
    image: '/assets/original/img_6.jpg',
    imageAlt: 'Digital marketing dashboard and sponsored campaign preview',
    objectPosition: '50% 50%',
    deliverables: [
      'Meta & Instagram paid social creatives',
      'Local search & seasonal launch campaigns',
      'Audience segmentation & creative testing',
      'Clear performance reporting & iteration',
    ],
    typicalTimeline: 'Ongoing growth cycles',
    outcomeNote: 'Targeted visibility that turns local discovery into repeat bookings and orders.',
  },
];

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    step: '01',
    title: 'Discover',
    tagline: 'Your story, audience and ambitions.',
    description:
      'We audit your current brand footprint, map competitor white-space, and uncover the emotional hook that sets your business apart.',
    duration: 'Week 1',
    outputs: ['Brand discovery workshop', 'Audience & positioning notes', 'Creative direction moodboard'],
  },
  {
    step: '02',
    title: 'Create',
    tagline: 'A distinctive identity and digital presence.',
    description:
      'Typography, botanical-inspired palettes, responsive web builds, and kinetic video stories crafted together as one unified system.',
    duration: 'Weeks 2–4',
    outputs: ['Identity & visual system', 'Responsive interactive build', 'Launch content kit'],
  },
  {
    step: '03',
    title: 'Connect',
    tagline: 'Bring your brand to the people who matter.',
    description:
      'We roll out your brand across web, social reels, and targeted local campaigns—refining creative based on real audience engagement.',
    duration: 'Launch & Beyond',
    outputs: ['Campaign activation', 'Reel & social cadence', 'Engagement optimisation'],
  },
];

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: 'a2b-perth-web',
    title: 'A2B Perth',
    category: 'Websites',
    channelLabel: 'WEBSITE',
    url: 'https://a2bperth.com.au/',
    image: '/assets/original/img_7.jpg',
    imageAlt: 'South Indian dosa, idli and vada served on a banana leaf for A2B Perth',
    objectPosition: '50% 62%',
    accentBg: '#3a1522',
    year: '2025',
    clientSector: 'Hospitality & Dining',
    headlineMetric: 'Flagship Digital Dining Home',
    summary:
      'A rich, appetising web experience bringing authentic South Indian vegetarian dining in Perth to life with effortless menu discovery.',
    challenge:
      'Translate the warmth and heritage of a beloved South Indian culinary icon into a crisp, fast digital storefront for local diners.',
    solution:
      'Designed high-contrast editorial food framing, clear category navigation, and mobile-first reservation and location cues.',
    deliverables: ['Responsive Website Design', 'Culinary Visual Direction', 'Menu & Location Architecture'],
    featured: true,
  },
  {
    id: 'biriyani-box',
    title: 'Biriyani Box',
    category: 'Websites',
    channelLabel: 'WEBSITE',
    url: 'https://biriyanibox.com.au/',
    image: '/assets/original/img_8.jpg',
    imageAlt: 'Aromatic chicken biryani garnished with crispy fried onions and fresh mint',
    objectPosition: '50% 55%',
    accentBg: '#2a1a0f',
    year: '2025',
    clientSector: 'Fast-Casual Culinary',
    headlineMetric: 'High-Contrast Order Flow',
    summary:
      'Bold culinary photography paired with streamlined web architecture built to make signature dum biriyani dishes irresistible at first scroll.',
    challenge:
      'Stand out in a crowded takeaway market with an immediate appetite-appeal first screen and friction-free ordering journey.',
    solution:
      'Crafted warm spiced colour accents, crisp typography, and instant above-the-fold product spotlighting.',
    deliverables: ['Website Design & Layout', 'Menu Highlight System', 'Mobile Speed Optimisation'],
  },
  {
    id: 'a2b-perth-ig',
    title: 'A2B Perth Social',
    category: 'Social & Reels',
    channelLabel: 'INSTAGRAM',
    url: 'https://www.instagram.com/a2bperth/',
    image: '/assets/original/img_9.jpg',
    imageAlt: 'Curated Instagram feed showcasing A2B Perth dishes and reels',
    objectPosition: '50% 40%',
    accentBg: '#1f0f2e',
    year: '2025',
    clientSector: 'Hospitality Content',
    headlineMetric: '129K Views on a Single Reel',
    summary:
      'Cohesive Instagram grid direction, vibrant festival campaigns, and dynamic short-form Reels engineered for high local shareability.',
    challenge:
      'Build organic momentum and turn casual food lovers across Perth into repeat dine-in guests.',
    solution:
      'Produced rhythmic plating & pouring reels paired with warm, consistent grid templates and cultural storytelling.',
    deliverables: ['Short-Form Reels Production', 'Instagram Grid Art Direction', 'Seasonal Campaign Graphics'],
  },
  {
    id: 'thirai-flicks',
    title: 'Thirai Flicks',
    category: 'Social & Reels',
    channelLabel: 'FACEBOOK',
    url: 'https://www.facebook.com/thiraiflicks1',
    image: '/assets/original/img_10.jpg',
    imageAlt: 'Hands holding a cinema clapperboard for Thirai Flicks entertainment',
    objectPosition: '20% 50%',
    accentBg: '#0f1b2e',
    year: '2025',
    clientSector: 'Film & Entertainment',
    headlineMetric: 'Audience-First Film Promo',
    summary:
      'Cinema-forward social branding, trailer launch creative, and community engagement assets for an entertainment and film distribution channel.',
    challenge:
      'Keep film releases visually electric across fast-moving social feeds while preserving strong brand recall.',
    solution:
      'Developed bold poster-inspired social templates, teaser cutdowns, and high-contrast announcement layouts.',
    deliverables: ['Social Campaign Visuals', 'Entertainment Key Art', 'Community Feed Direction'],
  },
  {
    id: 'rosedsigns-site',
    title: 'rosedsigns.com',
    category: 'Brand Identity',
    channelLabel: 'FULL SITE',
    url: 'https://rosedsigns.com/',
    image: '/assets/original/img_11.jpg',
    imageAlt: 'RoseDsigns studio brand identity and flagship website showcase',
    objectPosition: '30% 30%',
    accentBg: '#2a0f19',
    year: '2025',
    clientSector: 'Creative Studio Flagship',
    headlineMetric: 'Complete Studio Identity',
    summary:
      'The complete RoseDsigns brand world—uniting botanical rose-and-D monogram craft, editorial serif voice, and full-stack studio presence.',
    challenge:
      'Create a studio identity that feels both timelessly editorial and unmistakably modern across every client touchpoint.',
    solution:
      'Anchored the visual language in deep rose burgundy, warm cream paper, brushed gold accents, and kinetic interactions.',
    deliverables: ['Brand Identity & Monogram', 'Full Website Architecture', 'Interactive Motion System'],
  },
];

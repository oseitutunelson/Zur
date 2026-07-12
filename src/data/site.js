// Central content/config for the ZUR Construction website.

export const COMPANY = {
  name: 'ZUR',
  full: 'ZUR Construction',
  tagline: 'Building Excellence From Design To Completion',
  phone: '0554331810',
  phone2: '0501951251',
  // International format for WhatsApp / tel deep-links (Ghana +233).
  whatsapp: '233554331810',
  email: 'info@zurconstruction.com',
  address: 'East Legon, Ogbojo, Accra, Ghana',
  coverage: 'Nationwide Construction Services across Ghana',
  hours: 'Mon – Fri · 8:00 AM – 6:00 PM',
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'X', href: '#' },
  ],
}

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

export const STATS = [
  { value: 18, suffix: '+', label: 'Years of Experience' },
  { value: 350, suffix: '+', label: 'Projects Completed' },
  { value: 60, suffix: '+', label: 'Skilled Professionals' },
  { value: 100, suffix: '%', label: 'Happy Clients' },
]

// Full service taxonomy from the brief.
export const SERVICE_CATEGORIES = [
  {
    slug: 'design',
    title: 'Architectural Design',
    short: 'Design',
    icon: 'compass',
    blurb:
      'From concept sketches to construction-ready drawings, our architects translate vision into buildable precision.',
    items: [
      'Architectural Design',
      'House Plans & Floor Plans',
      '2D & 3D Building Designs',
      '3D Visualization / Rendering',
      'Interior & Exterior Design',
      'Structural Drawings',
    ],
  },
  {
    slug: 'construction',
    title: 'Construction Services',
    short: 'Build',
    icon: 'crane',
    blurb:
      'Ground-up construction delivered to international quality standards, on schedule and on budget.',
    items: [
      'Residential Building Construction',
      'Commercial Building Construction',
      'Luxury Homes Construction',
      'Apartments & Multi-Family Housing',
      'Schools, Churches & Office Buildings',
      'Turnkey Construction',
    ],
  },
  {
    slug: 'renovation',
    title: 'Renovation & Remodeling',
    short: 'Renovate',
    icon: 'cube',
    blurb:
      'Transform existing spaces into something new, functional and beautiful with expert remodeling.',
    items: [
      'Home Renovation',
      'Building Remodeling',
      'Roofing Works & Repairs',
      'Property Upgrades & Extensions',
    ],
  },
  {
    slug: 'project-management',
    title: 'Project Management & Supervision',
    short: 'Manage',
    icon: 'clipboard',
    blurb:
      'Rigorous site supervision and coordination that keeps every stakeholder aligned and accountable.',
    items: [
      'Site Supervision',
      'Construction Project Management',
      'Contractor Coordination',
      'Quality Control & Monitoring',
      'Timeline & Progress Management',
    ],
  },
  {
    slug: 'cost-estimation',
    title: 'BOQ & Cost Estimation',
    short: 'Estimate',
    icon: 'calculator',
    blurb:
      'Transparent quantities and costing so you know exactly where every cedi is invested.',
    items: [
      'Bill of Quantities Preparation',
      'Construction Cost Estimation',
      'Material Estimation',
      'Budget Planning',
      'Cost Consultation',
    ],
  },
  {
    slug: 'interior-finishing',
    title: 'Interior Finishing Works',
    short: 'Finish',
    icon: 'brush',
    blurb:
      'The finishing touches that turn a structure into a refined, livable space.',
    items: [
      'POP / Gypsum Ceiling',
      'Painting Services',
      'Floor & Wall Tiling',
      'Kitchen Cabinet Installation',
      'Wardrobe Installation',
      'Lighting & Finishing Touches',
    ],
  },
  {
    slug: 'exterior-works',
    title: 'Exterior Works',
    short: 'Exterior',
    icon: 'tree',
    blurb:
      'Landscaping, paving and outdoor systems that complete the property envelope.',
    items: [
      'Landscaping',
      'Compound Paving',
      'Fence Wall Construction',
      'Gate Installation',
      'Drainage Systems',
      'Outdoor Space Enhancement',
    ],
  },
  {
    slug: 'engineering',
    title: 'Engineering Services',
    short: 'Engineer',
    icon: 'bolt',
    blurb:
      'Structural, mechanical and electrical engineering backed by certified specialists.',
    items: [
      'Structural Engineering Consultation',
      'Plumbing Installation',
      'Electrical Installation',
      'Water Systems Installation',
      'Security Systems',
      'Smart Home Installation',
    ],
  },
  {
    slug: 'consultancy',
    title: 'Consultancy Services',
    short: 'Consult',
    icon: 'chat',
    blurb:
      'Expert guidance at every decision point, from feasibility to material selection.',
    items: [
      'Construction Consultation',
      'Site Inspection',
      'Building Planning Guidance',
      'Material Selection Advice',
      'Property Development Consultation',
    ],
  },
]

// Compact home services — clean portrait cards with elegant icons.
export const HOME_SERVICE_CARDS = [
  {
    icon: 'crane',
    title: 'New Construction',
    text: 'Ground-up residential and commercial builds, engineered to last and delivered turnkey.',
  },
  {
    icon: 'compass',
    title: 'Architectural Design',
    text: 'House plans, 2D & 3D designs and structural drawings ready for construction.',
  },
  {
    icon: 'cube',
    title: 'Renovation & Remodeling',
    text: 'Upgrade, extend or transform existing buildings into modern, functional spaces.',
  },
  {
    icon: 'clipboard',
    title: 'Project Management',
    text: 'Disciplined site supervision that keeps quality, budget and timeline on track.',
  },
  {
    icon: 'brush',
    title: 'Interior Finishing',
    text: 'POP ceilings, tiling, painting and fittings executed to a premium standard.',
  },
  {
    icon: 'calculator',
    title: 'BOQ & Cost Estimation',
    text: 'Transparent bills of quantities so you know where every cedi is invested.',
  },
]

export const PROCESS = [
  { n: '01', title: 'Consultation', text: 'We listen to your goals, site constraints and budget to frame the project.' },
  { n: '02', title: 'Planning', text: 'Feasibility, scheduling and a clear roadmap to delivery.' },
  { n: '03', title: 'Design', text: 'Architectural and structural design, visualized in 2D & 3D.' },
  { n: '04', title: 'Cost Estimation', text: 'Detailed BOQ and transparent costing — no surprises.' },
  { n: '05', title: 'Construction', text: 'Skilled crews build to spec with premium materials.' },
  { n: '06', title: 'Supervision', text: 'On-site quality control and progress monitoring throughout.' },
  { n: '07', title: 'Finishing', text: 'Interior and exterior finishing executed to a luxury standard.' },
  { n: '08', title: 'Delivery', text: 'A turnkey handover of a project built to last.' },
]

// Seven reasons clients choose ZUR Construction — concise, icon-led.
export const WHY_US = [
  { icon: 'team', title: 'Experienced Professionals', text: 'Certified engineers, architects and craftsmen with years of proven experience.' },
  { icon: 'brush', title: 'Quality Craftsmanship', text: 'Premium materials and meticulous workmanship on every single build.' },
  { icon: 'clock', title: 'Timely Project Delivery', text: 'Disciplined scheduling and supervision keep your project firmly on track.' },
  { icon: 'chat', title: 'Transparent Communication', text: 'Clear updates and honest costing so you always know where things stand.' },
  { icon: 'bolt', title: 'Modern Construction Methods', text: 'Contemporary techniques and smart building practices on every project.' },
  { icon: 'star', title: 'Client Satisfaction', text: 'We measure success by the trust and satisfaction of the clients we serve.' },
  { icon: 'shield', title: 'Safety First', text: 'A zero-compromise safety culture protects our teams and your investment.' },
]

export const PROJECTS = [
  {
    slug: 'the-aseda-residence',
    name: 'The Aseda Residence',
    category: 'Modern Homes',
    year: '2026',
    location: 'Accra, Ghana',
    cover: 'aseda-3.jpeg',
    blurb:
      'A contemporary flat-roof residence wrapped in natural stone cladding, floor-to-ceiling black-framed glazing and a marble-finished portico, set on a fully paved compound with soft pebble landscaping.',
    scope: ['Architectural Design', 'Construction', 'Interior Finishing', 'Landscaping'],
    gallery: ['aseda-3.jpeg', 'aseda-1.jpeg', 'aseda-2.jpeg'],
    status: 'Completed',
    featured: true,
  },
  {
    slug: 'the-gold-coast-collection',
    name: 'The Gold Coast Collection',
    category: 'Modern Homes',
    year: '2025',
    location: 'Oyarifa, Accra',
    cover: 'aurora-1.jpeg',
    blurb: 'A striking contemporary residence defined by a floating flat-roof portico, recessed LED lighting and a split-level garden approach.',
    scope: ['Architectural Design', 'Construction', 'Interior Finishing', 'Landscaping'],
    size: '410 m²',
    duration: '13 months',
    budget: 'GH₵ 2.7M',
    gallery: ['aurora-1.jpeg', 'aurora-2.jpeg', 'aurora-3.jpeg', 'aurora-4.jpeg', 'aurora-5.jpeg'],
    challenge: 'Achieving a bold, minimalist silhouette while keeping the entrance sequence dramatic on a gently terraced plot.',
    solution: 'A cantilevered portico with concealed LED coves and stone-clad steps gives the home a signature identity by day and night.',
    status: 'Interior Finishing',
  },
  {
    slug: 'the-asomdwee-portfolio',
    name: 'The Asomdwee Portfolio',
    category: 'Modern Homes',
    year: '2024',
    location: 'Spintex, Accra',
    cover: 'ivory-1.jpeg',
    blurb: 'A crisp, all-white contemporary bungalow with a natural stone feature pillar, full-height glazing and a fully paved courtyard.',
    scope: ['Architectural Design', 'Turnkey Construction', 'Interior Finishing'],
    size: '340 m²',
    duration: '10 months',
    budget: 'GH₵ 1.8M',
    gallery: ['ivory-1.jpeg', 'ivory-2.jpeg', 'ivory-3.jpeg', 'ivory-interior.jpeg'],
    challenge: 'Delivering a clean, gallery-white finish that stays sharp in a dusty, high-sun environment.',
    solution: 'Textured weather-grade render, deep porch overhangs and a stone accent column keep the home bright, cool and low-maintenance.',
    status: 'Completed',
  },
  {
    slug: 'the-akwaaba-series',
    name: 'The Akwaaba Series',
    category: 'Luxury Villas',
    year: '2025',
    location: 'East Legon Hills, Accra',
    cover: 'ashford-1.jpeg',
    blurb: 'A grand two-storey manor with a classical columned portico, moulded cornices and a double-height entrance.',
    scope: ['Architectural Design', 'Structural Engineering', 'Luxury Construction'],
    size: '720 m²',
    duration: '20 months',
    budget: 'GH₵ 6.4M',
    gallery: ['ashford-1.jpeg', 'ashford-2.jpeg'],
    challenge: 'Executing ornate classical detailing — columns, cornices and mouldings — to a flawless standard at scale.',
    solution: 'Custom formwork and specialist plasterers crafted the columns and trims in place for a seamless, high-end result.',
    status: 'Finishing Phase',
  },
  {
    slug: 'the-sankofa-legacy',
    name: 'The Sankofa Legacy',
    category: 'Luxury Villas',
    year: '2024',
    location: 'Trasacco, Accra',
    cover: 'crown-ridge-1.jpeg',
    blurb: 'An imposing two-storey villa crowned with a deep charcoal stone-coated roof and twin colonnaded verandahs.',
    scope: ['Architectural Design', 'Structural Engineering', 'Luxury Construction', 'Roofing'],
    size: '680 m²',
    duration: '18 months',
    budget: 'GH₵ 5.9M',
    gallery: ['crown-ridge-1.jpeg'],
    challenge: 'Framing a complex multi-hip roof over a wide colonnaded footprint without compromising the elevation.',
    solution: 'A precision-engineered timber roof structure and stone-coated tiles delivered a bold, watertight crown.',
    status: 'Roofing Complete',
  },
  {
    slug: 'the-ayekoo-projects',
    name: 'The Ayekoo Projects',
    category: 'Residential Estates',
    year: '2025',
    location: 'Kwabenya, Accra',
    cover: 'slate-court-1.jpeg',
    blurb: 'A gated cluster of connected family units with charcoal stone-coated roofs, private courtyards and a fully walled compound.',
    scope: ['Architectural Design', 'Turnkey Construction', 'Exterior Works'],
    size: '1,150 m² (multi-unit)',
    duration: '16 months',
    budget: 'GH₵ 4.6M',
    gallery: ['slate-court-1.jpeg', 'slate-court-2.jpeg', 'slate-court-3.jpeg'],
    challenge: 'Coordinating several near-identical units to a consistent quality within one secured compound.',
    solution: 'A repeatable unit module and staged roofing sequence kept every home on-spec and on schedule.',
    status: 'Completed',
  },
  {
    slug: 'the-edwumawura-projects',
    name: 'The Edwumawura Projects',
    category: 'Residential Estates',
    year: '2024',
    location: 'Prampram, Greater Accra',
    cover: 'palm-grove-1.jpeg',
    blurb: 'A terrace of white-rendered bungalows with tiled hip roofs, timber eaves and elegant black steel windows.',
    scope: ['Architectural Design', 'Construction', 'Interior Finishing'],
    size: '980 m² (multi-unit)',
    duration: '15 months',
    budget: 'GH₵ 3.9M',
    gallery: ['palm-grove-1.jpeg', 'palm-grove-2.jpeg'],
    challenge: 'Giving each bungalow in a continuous terrace its own sense of arrival and privacy.',
    solution: 'Staggered entrance porches and individual paved forecourts give every home a distinct, welcoming frontage.',
    status: 'Finishing Phase',
  },
  {
    slug: 'the-nkosuo-series',
    name: 'The Nkosuo Series',
    category: 'Modern Homes',
    year: '2024',
    location: 'Aburi, Eastern Region',
    cover: 'terracotta-1.jpeg',
    blurb: 'A warm family home wrapped in a bold terracotta stone-coated roof, set within a fully walled garden plot.',
    scope: ['Architectural Design', 'Construction', 'Roofing', 'Exterior Works'],
    size: '390 m²',
    duration: '12 months',
    budget: 'GH₵ 2.3M',
    gallery: ['terracotta-1.jpeg', 'terracotta-2.jpeg', 'terracotta-3.jpeg'],
    challenge: 'Delivering a warm, characterful roofline that stands out against the green hillside setting.',
    solution: 'Terracotta stone-coated tiles over a well-braced multi-hip structure gave the home a rich, durable crown.',
    status: 'Roofing Complete',
  },
  {
    slug: 'the-adom-projects',
    name: 'The Adom Projects',
    category: 'Modern Homes',
    year: '2025',
    location: 'Dodowa, Greater Accra',
    cover: 'vantage-1.jpeg',
    blurb: 'A contemporary flat-roof bungalow with clean parapet lines, generous paved frontage and a walled private yard.',
    scope: ['Architectural Design', 'Construction', 'Interior Finishing'],
    size: '320 m²',
    duration: '11 months',
    budget: 'GH₵ 1.7M',
    gallery: ['vantage-1.jpeg'],
    challenge: 'Creating a modern flat-roof look that stays cool and comfortable under strong sun.',
    solution: 'A well-insulated concrete roof deck and wide paved surrounds keep interiors shaded, calm and easy to maintain.',
    status: 'Nearing Completion',
  },
  {
    slug: 'the-oye-excellence-series',
    name: 'The Oye (Excellence) Series',
    category: 'Ongoing Builds',
    year: '2025',
    location: 'Amasaman, Greater Accra',
    cover: 'milestone-1.jpeg',
    blurb: 'A family residence captured mid-build — from block-work walls and lintels to a fully secured, framed shell.',
    scope: ['Structural Engineering', 'Construction', 'Site Supervision'],
    size: '360 m²',
    duration: 'In progress',
    budget: 'GH₵ 2.1M',
    gallery: ['milestone-1.jpeg', 'milestone-2.jpeg', 'milestone-3.jpeg', 'milestone-4.jpeg'],
    challenge: 'Maintaining precise setting-out and quality control through the early structural stages.',
    solution: 'Disciplined site supervision and staged inspections keep the block-work true and the build firmly on track.',
    status: 'Under Construction',
  },
]

export const PROJECT_CATEGORIES = [
  'All',
  'Luxury Villas',
  'Modern Homes',
  'Residential Estates',
  'Ongoing Builds',
]

export const TESTIMONIALS = [
  {
    quote:
      'ZUR Construction brought my dream home to life. From the first drawing to the day I got my keys, the team kept me in the loop and delivered quality I am proud to stand in front of.',
    name: 'Desmond Akyea',
    role: 'Homeowner, Palm Heights',
    rating: 5,
    photo: 'testimonial-desmond.jpeg',
  },
  {
    quote:
      'ZUR Construction built our family home in East Legon exactly as promised. The workmanship is excellent and they handed over right on schedule. We felt informed and respected at every stage.',
    name: 'Kwame Mensah',
    role: 'Homeowner, East Legon',
    rating: 5,
    photo: 'photo-1507003211169-0a1dd7228f2d',
  },
  {
    quote:
      'Their transparency around cost and their bill of quantities gave us complete confidence. ZUR Construction feels like a true engineering partner, not just a contractor.',
    name: 'Ama Owusu',
    role: 'Property Developer, Accra',
    rating: 5,
    photo: 'photo-1494790108377-be9c29b29330',
  },
  {
    quote:
      'From design to delivery, ZUR Construction managed every detail with precision. Our office complex came in on time and the quality is simply exceptional.',
    name: 'Kofi Asante',
    role: 'Managing Director, Ridge',
    rating: 5,
    photo: 'photo-1500648767791-00dcc994a43e',
  },
  {
    quote:
      'They delivered our church auditorium beautifully and safely. The attention to quality and the respect they showed our congregation left a lasting impression.',
    name: 'Rev. Daniel Boateng',
    role: 'Church Board, Spintex',
    rating: 5,
    photo: 'photo-1438761681033-6461ffad8d80',
  },
]

// Familiar Ghanaian brands & institutions shown as clean branded placeholders.
export const PARTNERS = [
  'Ghacem', 'Dzata Cement', 'K. Ofori Ltd.', 'Melcom', 'Chokmah Construction',
  'Shipman Global', 'M&N', 'Ecobank Ghana', 'Stanbic Bank Ghana', 'Doxa Streams',
]

export const FAQS = [
  {
    q: 'What types of projects does ZUR Construction take on?',
    a: 'We deliver residential homes, luxury villas, apartments, commercial buildings, office complexes, schools, churches, hostels, warehouses and shopping centres — across Ghana.',
  },
  {
    q: 'Do you handle both design and construction?',
    a: 'Yes. ZUR Construction is an end-to-end partner. We can take a project from concept and architectural design through engineering, cost estimation, construction, finishing and final handover.',
  },
  {
    q: 'How do you keep projects on budget?',
    a: 'Every project begins with a detailed Bill of Quantities and transparent cost estimation. We monitor spend against budget throughout and flag variations early so there are no surprises.',
  },
  {
    q: 'Can I see progress while construction is underway?',
    a: 'Absolutely. We provide regular progress reporting, site supervision updates and milestone reviews so you always know exactly where your project stands.',
  },
  {
    q: 'Do you provide cost estimates before I commit?',
    a: 'Yes — we offer free initial consultations and can prepare preliminary estimates to help you plan before any commitment is made.',
  },
  {
    q: 'Where do you operate?',
    a: 'We are based in Accra (East Legon, Ogbojo) with a branch in Tamale, and we provide nationwide construction services across Ghana. Reach out with your location and we will confirm availability.',
  },
]

export const VALUES = [
  { title: 'Integrity', text: 'We do what we say, and we build what we promise.' },
  { title: 'Precision', text: 'Engineering rigour applied to every millimetre and every milestone.' },
  { title: 'Safety', text: 'Zero-compromise safety culture on every site, every day.' },
  { title: 'Craft', text: 'A relentless pursuit of quality in materials and execution.' },
  { title: 'Partnership', text: 'We treat your project as if it were our own.' },
  { title: 'Sustainability', text: 'Responsible building for the long term.' },
]

// Company history milestones (Ghana).
export const MILESTONES = [
  { year: '2008', title: 'Founded in Accra', text: 'ZUR Construction opens its doors with a small crew and an uncompromising standard for craft.' },
  { year: '2012', title: 'First Commercial Build', text: 'Completed our first major commercial building in Accra, ahead of schedule.' },
  { year: '2016', title: 'Engineering Division', text: 'Launched in-house structural and MEP engineering capability.' },
  { year: '2019', title: 'Design Studio', text: 'Opened a full architectural design and 3D visualization studio.' },
  { year: '2022', title: '300+ Projects', text: 'Surpassed 300 completed projects across Ghana.' },
  { year: '2025', title: 'Nationwide Delivery', text: 'Grew from Accra and Tamale into nationwide construction services across Ghana.' },
]

// Company commitments shown on the About page.
export const COMMITMENTS = [
  {
    icon: 'shield',
    title: 'Commitment to Quality',
    text: 'We build with premium materials and rigorous quality control at every milestone — from foundation to finishing — so every project stands the test of time.',
  },
  {
    icon: 'team',
    title: 'Health & Safety Standards',
    text: 'A zero-compromise safety culture protects our workforce, clients and communities. Every site follows strict safety procedures, day in and day out.',
  },
  {
    icon: 'tree',
    title: 'Sustainability Practices',
    text: 'We build responsibly — efficient designs, durable materials and mindful use of resources that reduce waste and running costs over a building’s life.',
  },
  {
    icon: 'chat',
    title: 'Client-Centered Approach',
    text: 'You have one accountable partner and clear communication throughout. We listen, advise honestly and keep you informed at every stage of the build.',
  },
]

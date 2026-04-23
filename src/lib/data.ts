export const SITE = {
  name: 'Saksham Khatod',
  role: 'Software Development Engineer',
  company: 'Amazon Web Services',
  location: 'Seattle, WA',
  email: 'hello@sakshamkhatod.com',
  links: {
    github: 'https://github.com/GreyNinja92',
    linkedin: 'https://www.linkedin.com/in/saksham-khatod-83b997181/',
    twitter: 'https://twitter.com/sakshamkhatod',
    resume: '/resume.pdf',
    current: 'https://greyninja92.github.io',
  },
  about: [
    "I'm a Software Development Engineer at AWS in Seattle, where I build and scale cloud infrastructure serving millions of customers.",
    'M.S. in Computer Science from UIC (4.0 GPA). B.Tech in Computer Engineering from NMIMS Mumbai. Graduate work spanned distributed systems, ML, and AR/VR.',
    "I'm drawn to problems at the intersection of systems and intelligence — distributed pipelines, full-stack products, and what LLMs can do when given real infrastructure to work with.",
  ],
  skills: ['Distributed Systems', 'Cloud Infrastructure', 'Machine Learning', 'Full Stack', 'AR / VR', 'LLMs'],
  stack: ['Python', 'TypeScript', 'Rust', 'Scala', 'Swift', 'C++', 'Next.js', 'GraphQL', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'PyTorch', 'Flutter', 'Figma'],
  experience: [
    {
      when: '2024 — Present',
      role: 'Software Development Engineer',
      org: 'Amazon Web Services',
      blurb: 'Building and scaling cloud infrastructure serving millions of customers.',
      detail: 'On a data-plane team for a core AWS service. My day-to-day is deep in ECS/EC2 orchestration, async Kinesis pipelines, and the unglamorous work of keeping p99 latency flat while traffic grows. Owned one full launch end-to-end, including the design doc, op-readiness review, and the 3am on-call that followed.',
      stack: ['ECS', 'EC2', 'Kinesis', 'Lambda', 'S3', 'IAM', 'Route53', 'CloudWatch'],
    },
    {
      when: 'Feb 2023 — Dec 2023',
      role: 'Graduate Assistant',
      org: 'UIC College of Engineering',
      blurb: 'Built and maintained web applications used by UIC faculty and staff.',
      detail: 'Shipped four internal portals: HR Recruitment, Travel Request, PhD Evaluation, and Research Expenditure. Multi-tenant, auth-gated, PDF-heavy. Migrated two from Laravel monolith to a Node/GraphQL backend without downtime.',
      stack: ['Laravel', 'PHP', 'React', 'Node', 'GraphQL', 'Apollo', 'Sequelize', 'MySQL', 'Docker'],
    },
    {
      when: 'Aug 2021 — Jan 2022',
      role: 'Software Engineer',
      org: 'Wednesday Solutions',
      blurb: 'Frontend and backend projects. Raised test coverage by 40%.',
      detail: 'Client work — mostly React/Redux fronts on Node/GraphQL APIs. Introduced a Jest + Playwright baseline that the rest of the team adopted. Shipped CRON jobs for scheduled outbound email.',
      stack: ['React', 'Redux', 'Node', 'GraphQL', 'Sequelize', 'PostgreSQL', 'Docker', 'AWS'],
    },
  ],
  education: [
    { school: 'University of Illinois, Chicago', degree: 'M.S. Computer Science', when: '2022 — 2023', note: 'GPA 4.0 / 4.0' },
    { school: 'NMIMS Mukesh Patel School of Tech', degree: 'B.Tech Computer Engineering', when: '2017 — 2021', note: '' },
  ],
  projects: [
    {
      n: '01', slug: 'slam', name: 'SLAM',
      blurb: 'Real-time area mapping from video using SLAM.',
      detail: 'Feature extraction with OpenCV, RANSAC for camera pose estimation, Pygame for live visualization. Handled ~30fps on a laptop. Learned more about matrix math than I strictly needed to.',
      stack: ['Python', 'OpenCV', 'Pygame'],
      link: 'https://github.com/GreyNinja92',
    },
    {
      n: '02', slug: 'tweetbot', name: 'TweetBot',
      blurb: 'Full-stack social app with GraphQL, Apollo, MikroORM.',
      detail: 'Learning project for GraphQL mutations and the Apollo cache. Cookie-session auth, subscriptions for the feed, PostgreSQL under MikroORM.',
      stack: ['TypeScript', 'React', 'GraphQL', 'PostgreSQL'],
      link: 'https://github.com/GreyNinja92',
    },
    {
      n: '03', slug: 'dist-graph', name: 'Distributed Graph Compute',
      blurb: 'MapReduce graph comparison in Scala/Guava.',
      detail: 'Computes node and edge similarity between two large graphs using MapReduce on AWS EMR. 80% agreement with ground-truth on the benchmark set.',
      stack: ['Scala', 'Hadoop', 'AWS EMR'],
      link: 'https://github.com/GreyNinja92',
    },
    {
      n: '04', slug: 'mitm', name: 'MitM Attack Simulation',
      blurb: 'Parallelized random walks on Spark analyzing graph traceability.',
      detail: '86% detection accuracy, 100% attack success on synthetic adversarial topologies. The scariest homework I ever wrote up.',
      stack: ['Scala', 'Spark', 'AWS EMR'],
      link: 'https://github.com/GreyNinja92',
    },
    {
      n: '05', slug: 'police-thief', name: 'Police & Thief',
      blurb: 'Graph-based game with Akka HTTP REST APIs.',
      detail: 'Two auto-play strategies (greedy and MCTS-lite), a thin REST layer to replay games, and a dashboard that compared win-rates across map configurations.',
      stack: ['Scala', 'Akka HTTP', 'EC2'],
      link: 'https://github.com/GreyNinja92',
    },
    {
      n: '06', slug: 'metalcv', name: 'MetalCV',
      blurb: 'GPU-accelerated computer vision library for Apple Silicon.',
      detail: 'A small library of CV kernels (Sobel, Gaussian, Canny, cornerdetect) implemented in Metal Shading Language, with a C++ and Python front-end. Sobel on 4K runs 6.2× faster than vanilla OpenCV on the same M2.',
      stack: ['C++', 'Metal', 'Python', 'CMake'],
      link: 'https://github.com/GreyNinja92',
    },
  ],
  publications: [
    {
      n: '01', field: 'Computer Vision',
      title: 'Comparison of Monocular Depth Estimation Algorithms on 2D Images',
      venue: 'IJATCSE · 2021',
      href: 'http://www.warse.org/IJATCSE/static/pdf/file/ijatcse021012021.pdf',
    },
    {
      n: '02', field: 'Web',
      title: 'React to the React App: Hard-Reloading a React Web App Using Error Boundary',
      venue: 'Wednesday Engineering · 2022',
      href: 'https://www.wednesday.is/writing-tutorials/react-to-the-react-app-how-to-hard-reload-your-react-web-app-using-error-boundary',
    },
  ],
};

export type PostKind = 'deep-dive' | 'til' | 'case-study' | 'reflection' | 'reading';

export type PostBlock =
  | { k: 'p'; t: string }
  | { k: 'h'; t: string }
  | { k: 'q'; t: string }
  | { k: 'code'; t: string; lang: string }
  | { k: 'link'; t: string };

export interface Post {
  slug: string;
  title: string;
  kind: PostKind;
  tags: string[];
  date: string;
  updated?: string;
  readMin: number;
  views: number;
  pinned?: boolean;
  dek: string;
  toc: string[];
  body: PostBlock[];
  footnotes: string[];
}

export const POSTS: Post[] = [
  {
    slug: 'distributed-traces-at-aws',
    title: 'What I learned building distributed tracing for a service at AWS',
    kind: 'deep-dive', tags: ['distributed-systems', 'aws', 'observability'],
    date: '2026-04-12', updated: '2026-04-18', readMin: 14, views: 1840, pinned: true,
    dek: 'Sampling strategies, context propagation across async boundaries, and the weird failure modes nobody tells you about.',
    toc: ['The naive approach', 'Why sampling is hard', 'Cross-account propagation', 'What actually broke', 'What we shipped'],
    body: [
      { k: 'p', t: "When I joined the team, tracing coverage on our service sat at roughly 40%. Not 40% of requests — 40% of the call graph. Entire async pathways were invisible." },
      { k: 'p', t: "This post is the eight-month version of what we learned." },
      { k: 'h', t: 'The naive approach' },
      { k: 'p', t: "Our first pass was head-sample at 1%, propagate the decision, aggregate in X-Ray. This is the textbook answer, and the textbook answer is wrong at our volume." },
      { k: 'code', lang: 'rust', t: "fn should_trace(req: &Request) -> bool {\n    let seed = hash(&req.id);\n    (seed % 100) < SAMPLE_RATE\n}" },
      { k: 'p', t: "The 1% we kept was overwhelmingly the successful, cheap path. Expensive, slow, errored-out paths were statistically absent." },
      { k: 'h', t: 'Why sampling is hard' },
      { k: 'p', t: "Tail-based sampling fixes this but shifts the problem: you have to buffer the whole trace somewhere until you know it was interesting. That somewhere becomes a new SPOF." },
      { k: 'q', t: "You cannot sample what you have not yet decided matters." },
      { k: 'h', t: 'Cross-account propagation' },
      { k: 'p', t: "We span three accounts. W3C traceparent works fine within an account; across accounts our IAM boundaries strip headers in exactly the moment you need them." },
      { k: 'h', t: 'What actually broke' },
      { k: 'p', t: "Two weeks after rollout, traces were doubling. A retry interceptor on the client side was re-generating trace IDs." },
      { k: 'h', t: 'What we shipped' },
      { k: 'p', t: "Hybrid sampling (head + tail), a thin propagation shim, and — the unglamorous win — a test harness that fails if trace coverage for any endpoint drops below 95%." },
    ],
    footnotes: ['Numbers above are rounded/anonymized.', 'Ask offline for the propagation-shim design doc.'],
  },
  {
    slug: 'scala-to-rust-notes',
    title: 'Notes on moving a Spark job from Scala to Rust',
    kind: 'deep-dive', tags: ['rust', 'scala', 'performance'],
    date: '2026-03-02', readMin: 9, views: 920,
    dek: 'Why we did it, what got faster, and what we did not gain.',
    toc: ['Motivation', 'What got faster', 'What did not'],
    body: [
      { k: 'p', t: "Not every workload should be in Rust. Most shouldn't. This one wanted to be — a graph-walk that was 80% allocator time in Scala." },
      { k: 'h', t: 'Motivation' },
      { k: 'p', t: "Our graph-similarity job spent its wall-clock time in the JVM's young gen. A Rust inner loop via JNI cut p99 by 3.1×." },
      { k: 'code', lang: 'rust', t: "pub fn similarity(a: &[u64], b: &[u64]) -> f32 {\n    let mut shared = 0;\n    for (x, y) in a.iter().zip(b) { if x == y { shared += 1; } }\n    shared as f32 / a.len().max(b.len()) as f32\n}" },
      { k: 'h', t: 'What got faster' },
      { k: 'p', t: "Allocation. Tight loops. Anything where the JVM wanted boxed doubles and we wanted raw f32s." },
      { k: 'h', t: 'What did not' },
      { k: 'p', t: "Dev velocity. Scala took two afternoons. Rust took a week." },
    ],
    footnotes: [],
  },
  {
    slug: 'til-postgres-toast',
    title: 'TIL: Postgres TOAST is why your query got fast for no reason',
    kind: 'til', tags: ['postgres', 'til'],
    date: '2026-04-05', readMin: 3, views: 412,
    dek: "I spent a morning convinced I'd found a new query plan. I had not.",
    toc: [],
    body: [
      { k: 'p', t: "A query dropped from 2.1s to 180ms overnight with no code change and no plan change. I was briefly heroic." },
      { k: 'p', t: "Culprit: TOAST decompression. A wide JSONB column had been auto-compressed on VACUUM FULL; reads got cheaper because on-disk pages shrank." },
      { k: 'code', lang: 'sql', t: "SELECT pg_column_compression(metadata) FROM events LIMIT 5;" },
      { k: 'p', t: "Postgres does a lot of work you never asked it to, and that's usually good." },
    ],
    footnotes: [],
  },
  {
    slug: 'metalcv-journey',
    title: 'MetalCV: building a GPU computer-vision library for Apple Silicon',
    kind: 'case-study', tags: ['metal', 'computer-vision', 'project'],
    date: '2026-01-28', readMin: 11, views: 2100,
    dek: "A side project that started as 'can I port OpenCV kernels to Metal?' and ended as a library.",
    toc: ['Why Metal', 'The kernel API', 'Benchmarks', 'What next'],
    body: [
      { k: 'p', t: "Three months of nights and weekends. This is the post-mortem." },
      { k: 'h', t: 'Why Metal' },
      { k: 'p', t: "OpenCV has a CUDA backend. Apple Silicon doesn't. So: fallback to CPU, bend through CoreML, or write Metal." },
      { k: 'h', t: 'The kernel API' },
      { k: 'code', lang: 'cpp', t: 'auto img = mcv::Image::load("frame.png");\nauto gray = mcv::rgb_to_gray(img);\nauto edges = mcv::sobel(gray);\nedges.save("edges.png");' },
      { k: 'h', t: 'Benchmarks' },
      { k: 'p', t: "Sobel on 4K: 11ms on M2 vs 68ms in vanilla OpenCV. 6.2× on the hot path." },
      { k: 'h', t: 'What next' },
      { k: 'p', t: "More kernels. Better Python bindings. Possibly a tensor-ops layer that composes with CoreML." },
    ],
    footnotes: [],
  },
  {
    slug: 'llm-infra-lessons',
    title: 'What happens when you give an LLM real infrastructure',
    kind: 'reflection', tags: ['llms', 'systems', 'thoughts'],
    date: '2026-02-20', readMin: 7, views: 3050,
    dek: "Notes from six months of putting an LLM in front of a real production control plane.",
    toc: [],
    body: [
      { k: 'p', t: "If you give an LLM a shell and a credential, it will, eventually, confidently break something. The lesson isn't 'LLMs are dangerous' — it's 'your blast-radius controls were already wrong, and an LLM just found them faster than humans did.'" },
      { k: 'q', t: 'An LLM is a fuzzer for your authorization model.' },
      { k: 'p', t: "Everything I now believe about agentic infra comes from watching one such agent try, in good faith, to delete our staging database because it thought 'prod' was a typo." },
    ],
    footnotes: [],
  },
  {
    slug: 'reading-mar-2026',
    title: 'What I\u2019m reading — March 2026',
    kind: 'reading', tags: ['reading', 'links'],
    date: '2026-03-31', readMin: 2, views: 180,
    dek: 'A short link log.',
    toc: [],
    body: [
      { k: 'link', t: 'Designing Data-Intensive Applications — re-reading ch. 5.' },
      { k: 'link', t: 'Barbara Liskov\u2019s 2020 retrospective on abstraction.' },
      { k: 'link', t: 'Ted Chiang, The Lifecycle of Software Objects — for the fourth time.' },
      { k: 'link', t: 'Tigerbeetle\u2019s engineering blog — all of it, in order.' },
    ],
    footnotes: [],
  },
  {
    slug: 'first-year-aws',
    title: 'One year at AWS: what I got wrong',
    kind: 'reflection', tags: ['career', 'aws'],
    date: '2025-12-15', readMin: 6, views: 4200,
    dek: "Advice to a version of me who just got the badge.",
    toc: [],
    body: [
      { k: 'p', t: "First thing I got wrong: assuming 'systems at scale' meant mostly systems. It's mostly people, mostly tickets, mostly deciding which fire is actually a fire." },
      { k: 'p', t: "Second: I underused writing. Everything decided at Amazon is a document. Ship the doc first, code second." },
    ],
    footnotes: [],
  },
  {
    slug: 'til-dns-ttl',
    title: 'TIL: your DNS TTL is probably lying to you',
    kind: 'til', tags: ['dns', 'networking', 'til'],
    date: '2026-03-11', readMin: 2, views: 280,
    dek: "Resolvers round up. Clients round up. You rounded up. Nobody is honest.",
    toc: [],
    body: [
      { k: 'p', t: "Set a 60s TTL. Measure actual observed cache expiration. It is 900s, because your upstream resolver thinks 60s is disrespectful." },
    ],
    footnotes: [],
  },
];

export const POST_KINDS: Record<PostKind, { label: string; color: string }> = {
  'deep-dive':  { label: 'deep-dive',  color: '#6bd49a' },
  'til':        { label: 'til',        color: '#d4c46b' },
  'case-study': { label: 'case-study', color: '#9a8fe3' },
  'reflection': { label: 'reflection', color: '#e37b6b' },
  'reading':    { label: 'reading',    color: '#6ba9d4' },
};

export const FORTUNES = [
  '"Everything fails, all the time." — Werner Vogels',
  '"Worse is better." — Richard Gabriel',
  '"The best code is no code at all." — Jeff Atwood',
  '"Do. Or do not. There is no try." — Yoda, on deploys',
  '"Cache invalidation and naming things." — Phil Karlton (almost)',
  '"In distributed systems, there is no now." — Justin Sheehy',
  '"Always code as if the guy maintaining it is you, three months from now." — adapted',
  '"An LLM is a fuzzer for your authorization model." — me, apparently',
];

export function sortedPosts(): Post[] {
  return [...POSTS].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.date.localeCompare(a.date));
}

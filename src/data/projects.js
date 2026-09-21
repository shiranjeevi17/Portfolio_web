// ============================================================
// VERIFIED PROJECT DATA
// ============================================================

export const projects = [
  {
    id: 1,
    title: 'Job Portal',
    description:
      'A full-stack recruitment platform with job search, candidate applications, recruiter controls, and secured Spring Boot APIs.',
    technologies: ['React', 'Spring Boot', 'MySQL', 'JWT'],
    category: ['React', 'Spring Boot', 'Java', 'Full Stack'],
    features: ['Job search', 'Applications', 'Recruiter dashboard', 'JWT authentication'],
    image: 'jobportal-1.png',
    github: 'https://github.com/shiranjeevi17/Job-Portal',
    liveDemo: 'https://job-portal-sigma-liard.vercel.app/',
    sample: false,
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description:
      'A full-stack shopping platform with catalog, search, cart, checkout, orders, reviews, admin tools, and a Spring Boot backend.',
    technologies: ['React', 'Java', 'Spring Boot', 'MySQL'],
    category: ['React', 'Java', 'Spring Boot', 'Full Stack'],
    features: ['Product catalog', 'Search & filters', 'Cart & checkout', 'Orders & reviews'],
    image: 'e-commerce-1.png',
    github: 'https://github.com/shiranjeevi17/E-commerce-Platform',
    liveDemo: 'https://e-commerce-platform-sooty-chi.vercel.app/',
    sample: false,
  },
  {
    id: 3,
    title: 'Instagram Clone',
    description:
      'A frontend Instagram-style social application with feed, stories, reels, profiles, search, messaging, settings, and theme support.',
    technologies: ['React', 'Vite', 'Context API', 'localStorage'],
    category: ['React'],
    features: ['Authentication', 'Posts & feed', 'Stories & reels', 'Profiles & messaging'],
    image: 'instaclone-1.png',
    github: 'https://github.com/shiranjeevi17/Insta_Clone',
    liveDemo: 'https://instaclone-ivory.vercel.app/',
    sample: false,
  },
  {
    id: 4,
    title: 'Movie Recommendation System',
    description:
      'A movie recommendation system using content-based and demographic filtering with cosine similarity and popularity analysis.',
    technologies: ['Recommendation System', 'Content-Based Filtering', 'Demographic Filtering', 'Cosine Similarity'],
    category: [],
    features: ['Movie recommendations', 'Content-based filtering', 'Demographic filtering', 'Popularity analysis'],
    image: '/projects/movie-1.jpg',
    gallery: [
      '/projects/movie-1.jpg',
      '/projects/movie-2.jpg',
      '/projects/movie-3.jpg',
      '/projects/movie-4.jpg',
    ],
    github: null,
    liveDemo: null,
    sample: false,
  },
  {
    id: 5,
    title: 'To-Do List',
    description:
      'A frontend-only JavaScript task manager for adding, completing, filtering, and clearing daily tasks with a clean responsive interface.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: [],
    features: ['Add tasks', 'Complete tasks', 'All / Active / Completed filters', 'Clear completed'],
    image: '/projects/todo-list.png',
    github: 'https://github.com/shiranjeevi17/My-To-Do-List',
    liveDemo: 'https://my-to-do-list-cyan-tau.vercel.app/',
    sample: false,
  },
]

export const projectFilters = ['All', 'React', 'Java', 'Spring Boot', 'Full Stack']

export type ProjectStatus = 'Idea' | 'Draft' | 'Developing' | 'Paused' | 'Testing' | 'Deploying' | 'Completed';
export type Priority = 'Urgent' | 'High' | 'Medium' | 'Low';
export type ProjectTag = 'Website' | 'App' | 'API' | 'Extension' | 'Tool' | 'Research';
export type TaskStatus = 'Todo' | 'Doing' | 'Blocked' | 'Done';
export type TaskTag = 'UI' | 'FE' | 'BE' | 'API' | 'Research' | 'Bug' | 'Optimization';
export type IdeaStatus = 'New' | 'In Progress' | 'Completed';

export interface Project {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  createdAt: string;
  updatedAt: string;
  progress: number;
  status: ProjectStatus;
  priority: Priority;
  tags: ProjectTag[];
  githubUrl: string;
  deployUrl: string;
  techStack: string[];
  deadline?: string;
  coverImage?: string;
  archived: boolean;
}

export interface Task {
  id: string;
  projectId?: string;
  title: string;
  description: string;
  tags: TaskTag[];
  priority: Priority;
  status: TaskStatus;
  estimatedTime: string;
  actualTime: string;
  createdAt: string;
  deadline?: string;
  progress: number;
}

export interface Idea {
  id: string;
  projectId?: string;
  title: string;
  description: string;
  priority: Priority;
  category: string;
  status: IdeaStatus;
  createdAt: string;
  completed: boolean;
}

export interface Milestone {
  id: string;
  projectId: string;
  version: string;
  goal: string;
  tasks: string[];
  status: 'Planning' | 'In Progress' | 'Completed';
  releaseUrl?: string;
}

export interface Note {
  id: string;
  projectId: string;
  type: 'Decision Log' | 'Bug Note' | 'Dev Diary' | 'Temporary Idea';
  content: string;
  createdAt: string;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce with payment integration',
    detailedDescription: 'A comprehensive e-commerce platform featuring product management, shopping cart, payment gateway integration, and admin dashboard. Built with modern technologies for scalability and performance.',
    createdAt: '2024-01-15',
    updatedAt: '2024-11-20',
    progress: 75,
    status: 'Developing',
    priority: 'High',
    tags: ['Website', 'API'],
    githubUrl: 'https://github.com/username/ecommerce',
    deployUrl: 'https://ecommerce-demo.vercel.app',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    deadline: '2024-12-31',
    archived: false
  },
  {
    id: '2',
    name: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    detailedDescription: 'A powerful task management application with team collaboration features, real-time synchronization, and advanced filtering capabilities.',
    createdAt: '2024-03-10',
    updatedAt: '2024-11-25',
    progress: 90,
    status: 'Testing',
    priority: 'Urgent',
    tags: ['App', 'API'],
    githubUrl: 'https://github.com/username/taskapp',
    deployUrl: 'https://taskapp-demo.vercel.app',
    techStack: ['React', 'Firebase', 'TypeScript', 'Material-UI'],
    deadline: '2024-11-30',
    archived: false
  },
  {
    id: '3',
    name: 'Weather API Service',
    description: 'RESTful API for weather data aggregation',
    detailedDescription: 'Microservice API that aggregates weather data from multiple sources and provides unified interface with caching and rate limiting.',
    createdAt: '2024-05-20',
    updatedAt: '2024-11-22',
    progress: 100,
    status: 'Completed',
    priority: 'Medium',
    tags: ['API'],
    githubUrl: 'https://github.com/username/weather-api',
    deployUrl: 'https://api.weather-service.com',
    techStack: ['Node.js', 'Express', 'Redis', 'MongoDB'],
    archived: false
  },
  {
    id: '4',
    name: 'Chrome DevTools Extension',
    description: 'Performance monitoring extension for developers',
    detailedDescription: 'Browser extension that helps developers monitor and optimize website performance with detailed metrics and suggestions.',
    createdAt: '2024-07-01',
    updatedAt: '2024-10-15',
    progress: 45,
    status: 'Paused',
    priority: 'Low',
    tags: ['Extension', 'Tool'],
    githubUrl: 'https://github.com/username/devtools-ext',
    deployUrl: '',
    techStack: ['JavaScript', 'Chrome API', 'Webpack'],
    archived: false
  },
  {
    id: '5',
    name: 'AI Code Assistant',
    description: 'ML-powered code completion and suggestion tool',
    detailedDescription: 'Research project exploring AI-driven code assistance using machine learning models trained on open-source repositories.',
    createdAt: '2024-08-15',
    updatedAt: '2024-11-18',
    progress: 30,
    status: 'Draft',
    priority: 'Medium',
    tags: ['Tool', 'Research'],
    githubUrl: 'https://github.com/username/ai-assistant',
    deployUrl: '',
    techStack: ['Python', 'TensorFlow', 'FastAPI'],
    archived: false
  },
  {
    id: '6',
    name: 'Portfolio Website',
    description: 'Personal portfolio with blog and projects showcase',
    detailedDescription: 'Modern portfolio website with integrated blog, project showcase, and contact form. Features smooth animations and responsive design.',
    createdAt: '2024-09-01',
    updatedAt: '2024-11-26',
    progress: 85,
    status: 'Deploying',
    priority: 'High',
    tags: ['Website'],
    githubUrl: 'https://github.com/username/portfolio',
    deployUrl: 'https://myportfolio.dev',
    techStack: ['Next.js', 'Tailwind CSS', 'MDX', 'Vercel'],
    deadline: '2024-12-01',
    archived: false
  }
];

export const tasks: Task[] = [
  {
    id: 't1',
    projectId: '1',
    title: 'Implement payment gateway integration',
    description: 'Integrate Stripe payment API for checkout process',
    tags: ['BE', 'API'],
    priority: 'Urgent',
    status: 'Doing',
    estimatedTime: '8h',
    actualTime: '6h',
    createdAt: '2024-11-20',
    deadline: '2024-11-28',
    progress: 60
  },
  {
    id: 't2',
    projectId: '1',
    title: 'Design product listing page',
    description: 'Create responsive product grid with filters and sorting',
    tags: ['UI', 'FE'],
    priority: 'High',
    status: 'Done',
    estimatedTime: '12h',
    actualTime: '14h',
    createdAt: '2024-11-15',
    progress: 100
  },
  {
    id: 't3',
    projectId: '2',
    title: 'Fix drag-drop bug in task board',
    description: 'Tasks not updating position correctly after drag',
    tags: ['Bug', 'FE'],
    priority: 'Urgent',
    status: 'Todo',
    estimatedTime: '4h',
    actualTime: '0h',
    createdAt: '2024-11-24',
    deadline: '2024-11-27',
    progress: 0
  },
  {
    id: 't4',
    projectId: '6',
    title: 'Optimize image loading',
    description: 'Implement lazy loading and WebP format',
    tags: ['Optimization', 'FE'],
    priority: 'Medium',
    status: 'Doing',
    estimatedTime: '6h',
    actualTime: '3h',
    createdAt: '2024-11-22',
    progress: 50
  },
  {
    id: 't5',
    title: 'Learn Docker fundamentals',
    description: 'Complete Docker course and create sample containers',
    tags: ['Research'],
    priority: 'Low',
    status: 'Todo',
    estimatedTime: '20h',
    actualTime: '0h',
    createdAt: '2024-11-20',
    progress: 0
  },
  {
    id: 't6',
    title: 'Review pull requests',
    description: 'Review open PRs in team repositories',
    tags: ['BE', 'FE'],
    priority: 'Medium',
    status: 'Todo',
    estimatedTime: '2h',
    actualTime: '0h',
    createdAt: '2024-11-25',
    deadline: '2024-11-26',
    progress: 0
  }
];

export const ideas: Idea[] = [
  {
    id: 'i1',
    projectId: '1',
    title: 'Add wishlist feature',
    description: 'Allow users to save products to wishlist for later purchase',
    priority: 'Medium',
    category: 'Feature',
    status: 'New',
    createdAt: '2024-11-18',
    completed: false
  },
  {
    id: 'i2',
    projectId: '1',
    title: 'Implement product recommendations',
    description: 'Show related products based on user browsing history',
    priority: 'Low',
    category: 'Feature',
    status: 'New',
    createdAt: '2024-11-20',
    completed: false
  },
  {
    id: 'i3',
    title: 'Mobile app for habit tracking',
    description: 'Cross-platform mobile app to track daily habits and goals',
    priority: 'High',
    category: 'App',
    status: 'New',
    createdAt: '2024-11-22',
    completed: false
  },
  {
    id: 'i4',
    title: 'VSCode theme pack',
    description: 'Create a set of beautiful dark themes for VSCode',
    priority: 'Low',
    category: 'Tool',
    status: 'New',
    createdAt: '2024-11-15',
    completed: false
  },
  {
    id: 'i5',
    projectId: '6',
    title: 'Add dark mode toggle',
    description: 'Implement theme switcher with system preference detection',
    priority: 'High',
    category: 'Feature',
    status: 'In Progress',
    createdAt: '2024-11-10',
    completed: false
  }
];

export const milestones: Milestone[] = [
  {
    id: 'm1',
    projectId: '1',
    version: 'v1.0',
    goal: 'MVP Launch - Basic e-commerce functionality',
    tasks: ['t1', 't2'],
    status: 'In Progress',
  },
  {
    id: 'm2',
    projectId: '1',
    version: 'v1.1',
    goal: 'Add user reviews and ratings',
    tasks: [],
    status: 'Planning',
  },
  {
    id: 'm3',
    projectId: '2',
    version: 'v2.0',
    goal: 'Team collaboration features',
    tasks: ['t3'],
    status: 'In Progress',
  }
];

export const notes: Note[] = [
  {
    id: 'n1',
    projectId: '1',
    type: 'Decision Log',
    content: 'Decided to use Stripe over PayPal for better API documentation and developer experience.',
    createdAt: '2024-11-18'
  },
  {
    id: 'n2',
    projectId: '1',
    type: 'Bug Note',
    content: 'Cart items disappearing on page refresh - need to implement session storage.',
    createdAt: '2024-11-20'
  },
  {
    id: 'n3',
    projectId: '2',
    type: 'Dev Diary',
    content: 'Spent 4 hours debugging websocket connection issues. Turned out to be CORS configuration.',
    createdAt: '2024-11-22'
  },
  {
    id: 'n4',
    projectId: '6',
    type: 'Temporary Idea',
    content: 'Consider adding animated SVG illustrations to hero section.',
    createdAt: '2024-11-25'
  }
];

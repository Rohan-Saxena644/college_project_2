/**
 * defaults.js
 * Seed data — used only when localStorage is empty (first visit).
 */

export const DEFAULT_PROJECTS = [
  {
    id:          'proj-1',
    title:       'React Assignment',
    description: 'Build a multi-page React app covering JSX, components, hooks, routing and more.',
    color:       '#7c6aff',
  },
  {
    id:          'proj-2',
    title:       'UI Design',
    description: 'Design wireframes and high-fidelity mockups for the web application.',
    color:       '#ff5a7a',
  },
  {
    id:          'proj-3',
    title:       'Backend API',
    description: 'Set up REST API endpoints and connect to the database.',
    color:       '#4dd9ac',
  },
];

export const DEFAULT_TASKS = [
  // React Assignment tasks
  { id: 'task-1',  projectId: 'proj-1', title: 'Set up React project with CRA',           description: '',                                    completed: true,  priority: 'high'   },
  { id: 'task-2',  projectId: 'proj-1', title: 'Build NavBar with React Router NavLink',  description: 'Active link highlighting via CSS Module', completed: true,  priority: 'high'   },
  { id: 'task-3',  projectId: 'proj-1', title: 'Create ProjectCard class component',       description: 'Include constructor and lifecycle methods', completed: true,  priority: 'high'   },
  { id: 'task-4',  projectId: 'proj-1', title: 'Add PropTypes to TaskItem',                description: 'Validate priority as oneOf low/medium/high', completed: false, priority: 'medium' },
  { id: 'task-5',  projectId: 'proj-1', title: 'Implement useContext for theme',           description: 'Dark / light mode toggle',                completed: false, priority: 'medium' },
  { id: 'task-6',  projectId: 'proj-1', title: 'Write custom useLocalStorage hook',        description: '',                                    completed: false, priority: 'low'    },
  { id: 'task-7',  projectId: 'proj-1', title: 'Deploy to Netlify / Vercel',               description: 'Run npm run build and upload dist',   completed: false, priority: 'high'   },

  // UI Design tasks
  { id: 'task-8',  projectId: 'proj-2', title: 'Create low-fidelity wireframes',           description: '',                                    completed: true,  priority: 'medium' },
  { id: 'task-9',  projectId: 'proj-2', title: 'Pick color palette and typography',        description: 'Syne + DM Sans combination',          completed: true,  priority: 'low'    },
  { id: 'task-10', projectId: 'proj-2', title: 'Design dashboard layout',                  description: '',                                    completed: false, priority: 'high'   },
  { id: 'task-11', projectId: 'proj-2', title: 'Design mobile responsive breakpoints',     description: '',                                    completed: false, priority: 'medium' },

  // Backend tasks
  { id: 'task-12', projectId: 'proj-3', title: 'Set up Express server',                    description: '',                                    completed: false, priority: 'high'   },
  { id: 'task-13', projectId: 'proj-3', title: 'Design database schema',                   description: 'Projects and Tasks tables',           completed: false, priority: 'high'   },
  { id: 'task-14', projectId: 'proj-3', title: 'Write GET /projects endpoint',             description: '',                                    completed: false, priority: 'medium' },
];

// ─── HOOKS: useParams ────────────────────────────────────────────
// useParams reads the dynamic part of the URL.
// When the route is /projects/:id and the user visits /projects/proj-1
// then useParams() returns { id: "proj-1" }.
// ─────────────────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskItem    from '../../components/TaskItem/TaskItem';
import useLocalStorage from '../../hooks/useLocalStorage';
import { DEFAULT_PROJECTS, DEFAULT_TASKS } from '../../data/defaults';
import styles from './ProjectDetail.module.css';

const PRIORITY_OPTIONS = ['low', 'medium', 'high'];

function ProjectDetail() {
  const { id } = useParams();    // reads :id from the URL
  const navigate = useNavigate();

  const [projects] = useLocalStorage('taskflow-projects', DEFAULT_PROJECTS);
  const [tasks, setTasks] = useLocalStorage('taskflow-tasks', DEFAULT_TASKS);

  const [filter, setFilter]     = useState('all');   // 'all' | 'active' | 'done'
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState({ title: '', description: '', priority: 'medium' });

  const project = projects.find(p => p.id === id);

  // Redirect back if project doesn't exist
  useEffect(() => {
    if (projects.length > 0 && !project) navigate('/projects');
  }, [project, projects, navigate]);

  if (!project) return null;

  const projectTasks   = tasks.filter(t => t.projectId === id);
  const completedCount = projectTasks.filter(t => t.completed).length;
  const progress       = projectTasks.length
    ? Math.round((completedCount / projectTasks.length) * 100) : 0;

  // Apply the active filter to decide which tasks to display
  const visibleTasks = projectTasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'done')   return t.completed;
    return true;
  });

  const handleAddTask = () => {
    if (!form.title.trim()) return;
    const newTask = {
      id:          `task-${Date.now()}`,
      projectId:   id,
      title:       form.title.trim(),
      description: form.description.trim(),
      completed:   false,
      priority:    form.priority,
    };
    setTasks(prev => [newTask, ...prev]);
    setForm({ title: '', description: '', priority: 'medium' });
    setShowForm(false);
  };

  const handleToggle = (taskId) =>
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));

  const handleDelete = (taskId) =>
    setTasks(prev => prev.filter(t => t.id !== taskId));

  return (
    <div className="page-wrapper">
      <button className={`btn-secondary ${styles.back}`} onClick={() => navigate('/projects')}>
        ← Back to Projects
      </button>

      {/* Project header */}
      <div className={styles.projectHeader}>
        <div className={styles.colorBar} style={{ background: project.color }} />
        <div>
          <h1 className={styles.projectTitle}>{project.title}</h1>
          <p className={styles.projectDesc}>{project.description}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progressSection}>
        <div className={styles.progressInfo}>
          <span>{completedCount} / {projectTasks.length} tasks done</span>
          <span>{progress}%</span>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{
              width: `${progress}%`,
              background: progress === 100 ? 'var(--success)' : 'var(--accent)',
            }}
          />
        </div>
      </div>

      {/* Filter tabs + Add button */}
      <div className={styles.controls}>
        <div className={styles.filterTabs}>
          {['all', 'active', 'done'].map(f => (
            <button
              key={f}
              className={`${styles.filterTab} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button className="btn-primary" onClick={() => setShowForm(s => !s)}>
          {showForm ? '✕ Cancel' : '+ Add Task'}
        </button>
      </div>

      {/* Add task form */}
      {showForm && (
        <div className={`${styles.form} fade-in-up`}>
          <input
            className={styles.input}
            placeholder="Task title *"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          />
          <input
            className={styles.input}
            placeholder="Description (optional)"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
          <div className={styles.formRow}>
            <select
              className={styles.select}
              value={form.priority}
              onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
            >
              {PRIORITY_OPTIONS.map(p => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)} Priority
                </option>
              ))}
            </select>
            <button className="btn-primary" onClick={handleAddTask}>Add Task</button>
          </div>
        </div>
      )}

      {/* Task list – each TaskItem receives task + handler functions as props */}
      {visibleTasks.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📋</div>
          <h3>No tasks here</h3>
          <p>{filter === 'all' ? 'Add your first task above.' : `No ${filter} tasks.`}</p>
        </div>
      ) : (
        <div className={styles.taskList}>
          {visibleTasks.map((task, index) => (
            <div key={task.id} className="fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
              <TaskItem task={task} onToggle={handleToggle} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;

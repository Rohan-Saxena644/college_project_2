// ─── HOOKS: useState & useEffect ─────────────────────────────────
//
//  useState  → stores a value that the component needs to remember.
//              When the value changes, React re-renders the component.
//
//  useEffect → runs code AFTER the component renders.
//              The dependency array [] controls when it re-runs:
//                []          → runs once on mount only
//                [someValue] → runs every time someValue changes
//
// ─────────────────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import StatCard  from '../../components/StatCard/StatCard';
import TaskItem  from '../../components/TaskItem/TaskItem';
import { DEFAULT_PROJECTS, DEFAULT_TASKS } from '../../data/defaults';
import styles from './Dashboard.module.css';

function Dashboard() {
  const navigate = useNavigate();

  // ── CUSTOM HOOK ───────────────────────────────────────────────
  // useLocalStorage behaves just like useState but also saves to
  // and loads from localStorage automatically.
  // ─────────────────────────────────────────────────────────────
  const [projects] = useLocalStorage('taskflow-projects', DEFAULT_PROJECTS);
  const [tasks, setTasks] = useLocalStorage('taskflow-tasks', DEFAULT_TASKS);

  // ── useState ─────────────────────────────────────────────────
  // greeting is local state – it only belongs to this component.
  // setGreeting is the function used to update it.
  // ─────────────────────────────────────────────────────────────
  const [greeting, setGreeting] = useState('Hello');
  const [recentTasks, setRecentTasks] = useState([]);

  // ── useEffect (runs once on mount) ───────────────────────────
  // Sets the greeting based on the current time of day.
  // Empty dependency array [] means "run this once when the
  // component first appears on screen".
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12)      setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else                setGreeting('Good evening');
  }, []);

  // ── useEffect (runs when tasks change) ───────────────────────
  // Re-calculates the list of pending tasks shown on the dashboard
  // every time the tasks array is updated.
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const pending = tasks.filter(t => !t.completed).slice(0, 5);
    setRecentTasks(pending);
  }, [tasks]);

  // Event handlers – passed as props into TaskItem
  const handleToggle = (id) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const handleDelete = (id) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  // Derived values calculated from state
  const totalTasks     = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount   = totalTasks - completedCount;

  return (
    <div className="page-wrapper">
      <div className={styles.header}>
        <p className={styles.greeting}>{greeting} 👋</p>
        <h1 className={styles.title}>Dashboard</h1>
      </div>

      {/* StatCard receives data as PROPS (value, label, icon, accent) */}
      <div className={styles.statsGrid}>
        <StatCard label="Projects"  value={projects.length} icon="◫" accent="var(--accent-light)" />
        <StatCard label="Total"     value={totalTasks}       icon="☰" accent="var(--text-primary)" />
        <StatCard label="Completed" value={completedCount}   icon="✓" accent="var(--success)" />
        <StatCard label="Pending"   value={pendingCount}     icon="◑" accent="var(--warning)" />
      </div>

      {/* Pending tasks section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Pending Tasks</h2>
          <button className="btn-secondary" onClick={() => navigate('/projects')}>
            All Projects →
          </button>
        </div>

        {recentTasks.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🎉</div>
            <h3>All caught up!</h3>
            <p>No pending tasks. Head over to Projects to add more.</p>
          </div>
        ) : (
          <div className={styles.taskList}>
            {recentTasks.map((task, index) => (
              // TaskItem receives task data + handler functions as PROPS
              <div key={task.id} className="fade-in-up" style={{ animationDelay: `${index * 0.06}s` }}>
                <TaskItem
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;

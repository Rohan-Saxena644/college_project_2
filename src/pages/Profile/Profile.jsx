import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { DEFAULT_PROJECTS, DEFAULT_TASKS } from '../../data/defaults';
import styles from './Profile.module.css';

function Profile() {
  const [projects] = useLocalStorage('taskflow-projects', DEFAULT_PROJECTS);
  const [tasks]    = useLocalStorage('taskflow-tasks',    DEFAULT_TASKS);
  const [name, setName] = useLocalStorage('taskflow-name', 'Student');

  const [editingName, setEditingName] = useState(false);
  const [nameInput,   setNameInput]   = useState(name);

  const saveName = () => {
    if (nameInput.trim()) setName(nameInput.trim());
    setEditingName(false);
  };

  const completed  = tasks.filter(t => t.completed).length;
  const pending    = tasks.length - completed;
  const completion = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  // Summary of every React concept used in the project
  const concepts = [
    { name: 'JSX',               desc: 'HTML-like syntax used in every component' },
    { name: 'Class Component',   desc: 'ProjectCard — extends React.Component' },
    { name: 'Constructor',       desc: 'ProjectCard — initialises state, binds methods' },
    { name: 'Component API',     desc: 'render(), setState(), this.props, this.state' },
    { name: 'Lifecycle Methods', desc: 'componentDidMount, componentDidUpdate, componentWillUnmount' },
    { name: 'Functional Comp.',  desc: 'TaskItem, StatCard, NavBar, all pages' },
    { name: 'useState',          desc: 'Tasks, projects, form inputs, filters' },
    { name: 'useEffect',         desc: 'Greeting on mount, task list on tasks change' },
    { name: 'Custom Hook',       desc: 'useLocalStorage — reusable stateful logic' },
    { name: 'Props',             desc: 'Data passed into TaskItem, ProjectCard, StatCard' },
    { name: 'Props Validation',  desc: 'PropTypes in TaskItem & ProjectCard' },
    { name: 'CSS Modules',       desc: 'Every component has its own .module.css file' },
    { name: 'Inline Styles',     desc: 'Priority dot colour & progress bar width' },
    { name: 'React Router',      desc: 'BrowserRouter, Routes, Route, NavLink' },
    { name: 'useNavigate',       desc: 'Programmatic navigation in NavBar & pages' },
    { name: 'useParams',         desc: 'Reads :id from URL in ProjectDetail' },
  ];

  return (
    <div className="page-wrapper">
      <h1 className={styles.pageTitle}>Profile</h1>

      {/* Avatar + editable name */}
      <div className={styles.avatarSection}>
        <div className={styles.avatar}>{name.charAt(0).toUpperCase()}</div>
        <div>
          {editingName ? (
            <div className={styles.nameEdit}>
              <input
                className={styles.nameInput}
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveName()}
                autoFocus
              />
              <button className="btn-primary" onClick={saveName}>Save</button>
            </div>
          ) : (
            <div className={styles.nameRow}>
              <h2 className={styles.name}>{name}</h2>
              <button
                className={styles.editBtn}
                onClick={() => { setNameInput(name); setEditingName(true); }}
              >
                ✎ Edit
              </button>
            </div>
          )}
          <p className={styles.subtitle}>TaskFlow User</p>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Your Stats</h3>
        <div className={styles.statsGrid}>
          {[
            { label: 'Projects',  value: projects.length },
            { label: 'Tasks',     value: tasks.length },
            { label: 'Completed', value: completed },
            { label: 'Pending',   value: pending },
          ].map(s => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.progressInfo}>
          <span>Overall Completion</span><span>{completion}%</span>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} style={{ width: `${completion}%` }} />
        </div>
      </div>

      {/* React concepts reference – useful for presentation */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>React Concepts in This Project</h3>
        <div className={styles.conceptGrid}>
          {concepts.map(c => (
            <div key={c.name} className={styles.conceptCard}>
              <div className={styles.conceptName}>{c.name}</div>
              <div className={styles.conceptDesc}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;

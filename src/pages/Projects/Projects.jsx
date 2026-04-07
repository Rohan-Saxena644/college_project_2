import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard   from '../../components/ProjectCard/ProjectCard';
import useLocalStorage from '../../hooks/useLocalStorage';
import { DEFAULT_PROJECTS, DEFAULT_TASKS } from '../../data/defaults';
import styles from './Projects.module.css';

const PROJECT_COLORS = [
  '#7c6aff','#ff5a7a','#4dd9ac','#ffb347','#60c8ff','#e879a6',
];

function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useLocalStorage('taskflow-projects', DEFAULT_PROJECTS);
  const [tasks]                 = useLocalStorage('taskflow-tasks',    DEFAULT_TASKS);

  // Local UI state – controls whether the create-project form is visible
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', color: PROJECT_COLORS[0] });

  // Enrich each project with live task counts from the tasks array
  const enrichedProjects = projects.map(p => ({
    ...p,
    taskCount:      tasks.filter(t => t.projectId === p.id).length,
    completedCount: tasks.filter(t => t.projectId === p.id && t.completed).length,
  }));

  const handleCreate = () => {
    if (!form.title.trim()) return;
    const newProject = {
      id:          `proj-${Date.now()}`,
      title:       form.title.trim(),
      description: form.description.trim() || 'No description provided.',
      color:       form.color,
    };
    setProjects(prev => [newProject, ...prev]);
    setForm({ title: '', description: '', color: PROJECT_COLORS[0] });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="page-wrapper">
      <div className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <button className="btn-primary" onClick={() => setShowForm(s => !s)}>
          {showForm ? '✕ Cancel' : '+ New Project'}
        </button>
      </div>

      {/* Create project form – conditionally rendered via showForm state */}
      {showForm && (
        <div className={`${styles.form} fade-in-up`}>
          <h2 className={styles.formTitle}>Create New Project</h2>
          <div className={styles.formFields}>
            <input
              className={styles.input}
              placeholder="Project title *"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
            <input
              className={styles.input}
              placeholder="Short description (optional)"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
            <div className={styles.colorRow}>
              <span className={styles.colorLabel}>Colour:</span>
              {PROJECT_COLORS.map(c => (
                <button
                  key={c}
                  className={`${styles.colorSwatch} ${form.color === c ? styles.colorActive : ''}`}
                  style={{ background: c }}
                  onClick={() => setForm(f => ({ ...f, color: c }))}
                />
              ))}
            </div>
          </div>
          <button className="btn-primary" onClick={handleCreate}>
            Create Project
          </button>
        </div>
      )}

      {/* Projects grid – each ProjectCard receives project, onClick, onDelete as PROPS */}
      {enrichedProjects.length === 0 ? (
        <div className="empty-state">
          <div className="icon">◫</div>
          <h3>No projects yet</h3>
          <p>Create your first project above.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {enrichedProjects.map((project, index) => (
            <div key={project.id} className="fade-in-up" style={{ animationDelay: `${index * 0.07}s` }}>
              <ProjectCard
                project={project}
                onClick={(id) => navigate(`/projects/${id}`)}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;

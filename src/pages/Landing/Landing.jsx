import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';

function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: '◫', title: 'Projects',    desc: 'Organise work into focused project boards.' },
    { icon: '✓',  title: 'Tasks',       desc: 'Create, prioritise, and track every task.' },
    { icon: '◑',  title: 'Progress',    desc: 'Visual progress bars keep you motivated.' },
    { icon: '⏾',  title: 'Dark & Light', desc: 'Theme preference saved automatically.' },
  ];

  return (
    <div className={styles.page}>
      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.badge}>Personal Productivity</div>
        <h1 className={styles.headline}>
          Get your work<br />
          <span className={styles.accent}>done with flow.</span>
        </h1>
        <p className={styles.sub}>
          TaskFlow is a minimal project & task manager built to keep you
          focused — no noise, just progress.
        </p>
        <div className={styles.cta}>
          <button className="btn-primary" onClick={() => navigate('/dashboard')}>
            Open Dashboard →
          </button>
          <button className="btn-secondary" onClick={() => navigate('/projects')}>
            View Projects
          </button>
        </div>
      </header>

      {/* Features grid */}
      <section className={styles.features}>
        {features.map(f => (
          <div key={f.title} className={styles.featureCard}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        Built with React • TaskFlow 2025
      </footer>
    </div>
  );
}

export default Landing;

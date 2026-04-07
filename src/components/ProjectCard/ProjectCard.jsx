// ─── REACT COMPONENTS: CLASS COMPONENT ──────────────────────────
//
//  This file demonstrates:
//   1. CLASS COMPONENT  – extends React.Component
//   2. CONSTRUCTOR      – initialises local state, binds methods
//   3. COMPONENT API    – this.setState(), this.props, render()
//   4. LIFECYCLE METHODS
//        componentDidMount    → runs once after component appears on screen
//        componentDidUpdate   → runs every time props or state change
//        componentWillUnmount → runs just before component is removed
//   5. PROPS & PROPTYPE VALIDATION (bottom of file)
//
// ─────────────────────────────────────────────────────────────────
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ProjectCard.module.css';

class ProjectCard extends Component {

  // ── CONSTRUCTOR ──────────────────────────────────────────────
  // Called before the component mounts.
  // Must call super(props) first so React.Component sets up this.props.
  // We initialise local state here (isHovered).
  // ─────────────────────────────────────────────────────────────
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
    // Binding makes sure "this" inside the method refers to this component
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  // ── LIFECYCLE: componentDidMount ────────────────────────────
  // Runs ONCE after the component is added to the DOM.
  // Good place to fetch data or set up timers.
  // ─────────────────────────────────────────────────────────────
  componentDidMount() {
    console.log(`[ProjectCard] "${this.props.project.title}" is now on screen.`);
  }

  // ── LIFECYCLE: componentDidUpdate ───────────────────────────
  // Runs every time props or state change.
  // prevProps lets you compare old vs new values.
  // ─────────────────────────────────────────────────────────────
  componentDidUpdate(prevProps) {
    if (prevProps.project.taskCount !== this.props.project.taskCount) {
      console.log(
        `[ProjectCard] Task count changed: ${prevProps.project.taskCount} → ${this.props.project.taskCount}`
      );
    }
  }

  // ── LIFECYCLE: componentWillUnmount ─────────────────────────
  // Runs just before the component is removed from the DOM.
  // Use it to clean up (clear timers, cancel requests, etc.).
  // ─────────────────────────────────────────────────────────────
  componentWillUnmount() {
    console.log(`[ProjectCard] "${this.props.project.title}" removed from screen.`);
  }

  // ── COMPONENT API: setState ──────────────────────────────────
  // this.setState() is how class components update their state.
  // It triggers a re-render automatically.
  // ─────────────────────────────────────────────────────────────
  handleMouseEnter() { this.setState({ isHovered: true }); }
  handleMouseLeave() { this.setState({ isHovered: false }); }

  // Helper – calculates % completion from props
  getProgressPercent() {
    const { taskCount, completedCount } = this.props.project;
    if (!taskCount) return 0;
    return Math.round((completedCount / taskCount) * 100);
  }

  // ── COMPONENT API: render ────────────────────────────────────
  // render() is the ONLY required method in a class component.
  // It returns JSX describing what should appear on screen.
  // ─────────────────────────────────────────────────────────────
  render() {
    // Destructure props for cleaner JSX below
    const { project, onClick, onDelete } = this.props;
    const { isHovered } = this.state;
    const progress = this.getProgressPercent();

    // Inline style – dynamic width driven by calculated progress value
    const progressBarStyle = {
      width: `${progress}%`,
      background: progress === 100 ? 'var(--success)' : 'var(--accent)',
    };

    return (
      <div
        className={`${styles.card} ${isHovered ? styles.hovered : ''}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={() => onClick(project.id)}
      >
        {/* Colour accent bar – colour comes from a prop */}
        <div className={styles.colorBar} style={{ background: project.color }} />

        <div className={styles.cardBody}>
          <div className={styles.header}>
            <h3 className={styles.title}>{project.title}</h3>
            <button
              className={styles.deleteBtn}
              onClick={e => { e.stopPropagation(); onDelete(project.id); }}
            >
              ✕
            </button>
          </div>

          <p className={styles.description}>{project.description}</p>

          <div className={styles.stats}>
            <span className={styles.stat}>
              <span className={styles.statNum}>{project.taskCount}</span> tasks
            </span>
            <span className={styles.stat}>
              <span className={styles.statNum}>{project.completedCount}</span> done
            </span>
          </div>

          {/* Progress bar – width set via inline style */}
          <div className={styles.progressTrack}>
            <div className={styles.progressBar} style={progressBarStyle} />
          </div>
          <div className={styles.progressLabel}>{progress}% complete</div>
        </div>
      </div>
    );
  }
}

// ─── PROPS VALIDATION ────────────────────────────────────────────
// PropTypes checks that the correct type of data is passed in.
// If a required prop is missing or wrong type, React shows a
// warning in the browser console (helps catch bugs early).
// ─────────────────────────────────────────────────────────────────
ProjectCard.propTypes = {
  project: PropTypes.shape({
    id:             PropTypes.string.isRequired,
    title:          PropTypes.string.isRequired,
    description:    PropTypes.string,
    taskCount:      PropTypes.number.isRequired,
    completedCount: PropTypes.number.isRequired,
    color:          PropTypes.string,
  }).isRequired,
  onClick:  PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// Default values used when optional props are not provided
ProjectCard.defaultProps = {
  project: {
    description: 'No description provided.',
    color: '#7c6aff',
  },
};

export default ProjectCard;

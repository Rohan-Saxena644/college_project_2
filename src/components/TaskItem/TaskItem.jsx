// ─── REACT DATAFLOW: PROPS & PROPS VALIDATION ───────────────────
//
//  This file demonstrates:
//   1. PROPS        – data passed IN from the parent component
//                     (task, onToggle, onDelete are all props here)
//   2. PROPTYPE VALIDATION – PropTypes.shape(), .string, .bool,
//                     .func, .isRequired, .oneOf()
//   3. JSX          – conditional rendering, inline styles, className
//   4. STYLING      – CSS Module (TaskItem.module.css) + inline styles
//
// ─────────────────────────────────────────────────────────────────
import React from 'react';
import PropTypes from 'prop-types';
import styles from './TaskItem.module.css';

// ── FUNCTIONAL COMPONENT ─────────────────────────────────────────
// Receives props as a single argument and destructures them.
// Props are READ-ONLY – this component never modifies them directly.
// ─────────────────────────────────────────────────────────────────
function TaskItem({ task, onToggle, onDelete }) {

  // ── INLINE STYLE ─────────────────────────────────────────────
  // A plain JavaScript object used as a style prop.
  // The colour changes dynamically based on the "priority" prop value.
  // ─────────────────────────────────────────────────────────────
  const priorityDotStyle = {
    background:
      task.priority === 'high'   ? 'var(--priority-high)'   :
      task.priority === 'medium' ? 'var(--priority-medium)' :
                                   'var(--priority-low)',
  };

  // ── JSX ───────────────────────────────────────────────────────
  // JSX looks like HTML but it is JavaScript.
  // {} lets us embed any JS expression inside JSX.
  // ─────────────────────────────────────────────────────────────
  return (
    <div className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>

      {/* Custom checkbox button – calls onToggle prop when clicked */}
      <button
        className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
        onClick={() => onToggle(task.id)}
      >
        {/* Conditional rendering – only shows ✓ when task is completed */}
        {task.completed && <span className={styles.checkmark}>✓</span>}
      </button>

      {/* Task text content */}
      <div className={styles.content}>
        <span className={styles.title}>{task.title}</span>
        {/* Short-circuit rendering – description only shows if it exists */}
        {task.description && (
          <span className={styles.description}>{task.description}</span>
        )}
      </div>

      {/* Priority badge – colour set via inline style object */}
      <div className={styles.meta}>
        <span className={styles.priorityDot} style={priorityDotStyle} />
        <span className={`badge badge-${task.priority}`}>{task.priority}</span>
      </div>

      {/* Delete button – calls onDelete prop when clicked */}
      <button className={styles.deleteBtn} onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </div>
  );
}

// ─── PROPS VALIDATION ────────────────────────────────────────────
// PropTypes.shape() validates an object and its inner fields.
// .isRequired means React warns if that prop is missing.
// .oneOf() means the value must be one of the listed options.
// ─────────────────────────────────────────────────────────────────
TaskItem.propTypes = {
  task: PropTypes.shape({
    id:          PropTypes.string.isRequired,
    title:       PropTypes.string.isRequired,
    description: PropTypes.string,
    completed:   PropTypes.bool.isRequired,
    priority:    PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,   // function to toggle completion
  onDelete: PropTypes.func.isRequired,   // function to delete the task
};

TaskItem.defaultProps = {
  task: {
    description: '',
  },
};

export default TaskItem;

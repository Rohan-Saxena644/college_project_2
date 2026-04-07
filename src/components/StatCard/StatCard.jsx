// ── FUNCTIONAL COMPONENT — receiving Props ───────────────────
// StatCard is a simple presentational component.
// It receives label, value, icon, and accent as props
// and renders a styled card. No state needed here.
// ─────────────────────────────────────────────────────────────

import React from 'react';
import PropTypes from 'prop-types';
import styles from './StatCard.module.css';

function StatCard({ label, value, icon, accent }) {
  // Inline style to apply the dynamic accent colour passed via props
  const accentStyle = { color: accent || 'var(--accent-light)' };

  return (
    <div className={styles.card}>
      <div className={styles.icon} style={accentStyle}>{icon}</div>
      <div className={styles.value} style={accentStyle}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

// Props Validation
StatCard.propTypes = {
  label:  PropTypes.string.isRequired,
  value:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon:   PropTypes.string.isRequired,
  accent: PropTypes.string,
};

export default StatCard;

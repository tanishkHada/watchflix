import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ size = 4, color = 'var(--lime-green)' }) => {
  const style = {
    color,
    width: `${size}px`,
  };

  return <div className={styles.loader} style={style}></div>;
};

export default Loader;

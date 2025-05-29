import React from 'react';
import styles from './LoaderBounce.module.css';

const LoaderBounce = ({ size = 4, color = '#ffffff' }) => {
  const style = {
    color,
    width: `${size}px`,
  };

  return <div className={styles.loader} style={style}></div>;
};

export default LoaderBounce;

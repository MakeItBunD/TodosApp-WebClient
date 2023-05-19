import React from 'react';
import styles from './LazyLoaderUI.module.css';

interface LazyLoaderProps {
  height: number
  marginBottom: number
}

function LazyLoader({ height, marginBottom }: LazyLoaderProps) {
  return (
    <div className={styles.container} style={{ height, marginBottom }} />
  );
}

export default LazyLoader;

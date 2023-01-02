import React from 'react';

import styles from './MessageInputButton.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  classes?: string;
}

export default function MessageInputButton({ children, classes = '', ...attributes }: Props) {
  return (
    <button
      type="button"
      className={`${styles.inputButton} button is-rounded ${classes}`}
      {...attributes}
    >
      <span className="icon is-size-5">{children}</span>
    </button>
  );
}

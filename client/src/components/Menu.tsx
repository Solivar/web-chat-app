import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

import styles from './Menu.module.scss';

export default function Menu({
  leaveChat,
  children,
}: {
  leaveChat: () => void;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="is-hidden-tablet">
        <button
          onClick={() => {
            setIsOpen(oldState => !oldState);
          }}
          type="button"
          className={`${styles.control} button is-ghost`}
          aria-label={`${isOpen ? 'Close menu' : 'Open menu'}`}
        >
          <span className="icon is-size-4">{isOpen ? <FiX /> : <FiMenu />}</span>
        </button>
        <div
          role="dialog"
          aria-modal="true"
          className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`}
          aria-hidden={`${isOpen ? 'false' : 'true'}`}
        >
          <button
            onClick={leaveChat}
            type="button"
            className="button is-ghost p-0 mb-5"
          >
            Leave chat
          </button>
          {children}
        </div>
        {isOpen && (
          <div
            className={`${styles.backdrop}`}
            onClick={() => {
              setIsOpen(false);
            }}
            aria-hidden="true"
          ></div>
        )}
      </div>
      <div className="is-hidden-mobile">
        <button
          onClick={leaveChat}
          type="button"
          className="button is-ghost p-0"
        >
          Leave chat
        </button>
      </div>
    </>
  );
}

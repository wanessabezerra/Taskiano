import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer} />
      {children}
    </div>
  );
};

export default Modal;

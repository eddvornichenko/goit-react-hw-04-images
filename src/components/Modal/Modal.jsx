import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ handleClose, children }) => {
  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      handleClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      handleClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return createPortal(
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalContent>{children}</ModalContent>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;

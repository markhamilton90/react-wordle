import { useRef, useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
}

function Modal({ children }: ModalProps) {
  const modalRef = useRef<any>(null);

  useEffect(() => {
    modalRef.current.showModal();
  }, []);

  return <dialog ref={modalRef}>{children}</dialog>;
}

export default Modal;

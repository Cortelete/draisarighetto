

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CloseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
)

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-[#E6A4B4] via-[#F3D7CA] to-[#C88EA7] animated-gradient rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative transform transition-all duration-300 scale-95 animate-scale-in border border-white/10 backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-rose-950 hover:text-rose-700 transition-colors duration-200 z-10"
          aria-label="Close modal"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

// Add a simple animation for the modal scaling in
const style = document.createElement('style');
style.innerHTML = `
  @keyframes scale-in {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  .animate-scale-in {
    animation: scale-in 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);


export default Modal;
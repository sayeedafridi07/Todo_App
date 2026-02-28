import { Cross, X } from 'lucide-react';
import React, { useEffect } from 'react';

const Modal = ({ visible, onClose, children }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-white/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-8 cursor-pointer rounded-full bg-sky-500 p-2 text-white hover:bg-sky-600 focus:outline-2 focus:outline-offset-2 focus:outline-sky-500 active:bg-sky-700"
        >
          <X className="size-4" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;

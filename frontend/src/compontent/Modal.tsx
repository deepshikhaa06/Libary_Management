import type { JSX } from "react";

interface ModalProps {
  toggleModal(): void;
  content: JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({ toggleModal, content }) => {
  return (
<div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 animate-fadeIn shadow-2xl">
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={toggleModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold transition-colors"
        >
          ×
        </button>

        {/* Content */}
        <div className="mt-2">{content}</div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CongratulationsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#0F1729] bg-opacity-90 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#1B2537] rounded-lg shadow-xl w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-200"
        >
          <X size={20} />
        </button>

        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-[#FF5722] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-[#FF5722]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-4">
            Thank You For Registration
          </h2>

          <button
            onClick={onClose}
            className="bg-[#FF5722] text-white px-8 py-2 rounded-lg font-medium hover:bg-[#F4511E] transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsModal;

import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { ValidationError } from "../../utils/validations";
import toast from "react-hot-toast";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  handleClick: () => void;
  isLastStep: boolean;
  error: ValidationError | null;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  onBack,
  onNext,
  isLastStep,
  error,
  handleClick,
}) => {
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  return (
    <div className="space-y-4">
      <div className="flex justify-between pt-4">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </button>
        )}
        {!isLastStep ? (
          <button
            type="button"
            onClick={onNext}
            className="ml-auto inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 "
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            className="ml-auto inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
          >
            <Check className="h-4 w-4 mr-2" />
            Complete Registration
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;

import React from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { ValidationError } from "../../utils/validations";

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
  return (
    <div className="space-y-4">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error.message}
        </p>
      )}
      <div className="flex justify-between pt-4">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </button>
        )}
        {!isLastStep ? (
          <button
            type="button"
            onClick={onNext}
            className="ml-auto inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            className="ml-auto inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
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

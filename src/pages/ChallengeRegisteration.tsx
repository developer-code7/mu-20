import React, { useState } from "react";
import { Link } from "react-router-dom";
import StepIndicator from "../components/registration/StepIndicator";
import NavigationButtons from "../components/registration/NavigationButtons";
import ChallengeStep from "../components/registration/steps/ChallengeStep";
import CommitteeStep from "../components/registration/steps/CommitteeStep";
import TeamStep from "../components/registration/steps/TeamStep";
import ReviewStep from "../components/registration/steps/ReviewStep";
import { validateStep, ValidationError } from "../utils/validations";

interface FormData {
  challenge_id: string;
  committee_preferences: {
    [key: string]: string[];
  };
  team_name: string;
  team_members: string[];
}

const TOTAL_STEPS = 4;

const ChallengeRegisteration = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<ValidationError | null>(null);
  const [formData, setFormData] = useState<FormData>({
    challenge_id: "",
    committee_preferences: {},
    team_name: "",
    team_members: [],
  });


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "challenge_id") {
        return { ...prev, [name]: value, committee_preferences: {} };
      }
      if (name === "school_id") {
        return { ...prev, [name]: value, team_members: [] };
      }
      return { ...prev, [name]: value };
    });
    setError(null);
  };

  const handleCommitteeToggle = (committeeId: string) => {
    setFormData((prev) => {
      const newPreferences = { ...prev.committee_preferences };
      if (newPreferences[committeeId]) {
        delete newPreferences[committeeId];
      } else {
        newPreferences[committeeId] = [];
      }
      return { ...prev, committee_preferences: newPreferences };
    });
    setError(null);
  };

  const handlePortfolioChange = (committeeId: string, portfolioId: string) => {
    setFormData((prev) => {
      const newPreferences = { ...prev.committee_preferences };
      const currentPortfolios = newPreferences[committeeId] || [];
      const portfolioIndex = currentPortfolios.indexOf(portfolioId);

      if (portfolioIndex === -1) {
        newPreferences[committeeId] = [...currentPortfolios, portfolioId];
      } else {
        newPreferences[committeeId] = currentPortfolios.filter(
          (id) => id !== portfolioId
        );
      }

      return { ...prev, committee_preferences: newPreferences };
    });
    setError(null);
  };

  const handleTeamMemberToggle = (userId: string) => {
    setFormData((prev) => {
      const newMembers = prev.team_members.includes(userId)
        ? prev.team_members.filter((id) => id !== userId)
        : [...prev.team_members, userId];
      return { ...prev, team_members: newMembers };
    });
    setError(null);
  };

  const handleNext = () => {
    const validationError = validateStep(step, formData);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      setError(null);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateStep(step, formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    const formattedData = {
      user: {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        school_id: formData.school_id,
      },
      selected_challenge: {
        challenge_id: formData.challenge_id,
        committee_preference: Object.entries(
          formData.committee_preferences
        ).map(([committee_id, portfolios]) => ({
          committee_id,
          portfolio_preferences: portfolios.map((portfolio_id) => ({
            portfolio_id,
          })),
        })),
      },
      team_details: {
        team_name: formData.team_name,
        team_members: formData.team_members.map((user_id) => ({ user_id })),
      },
    };

    console.log("Formatted submission:", formattedData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ChallengeStep
            challengeId={formData.challenge_id}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <CommitteeStep
            challengeId={formData.challenge_id}
            committeePreferences={formData.committee_preferences}
            onCommitteeToggle={handleCommitteeToggle}
            onPortfolioChange={handlePortfolioChange}
          />
        );
      case 3:
        return (
          <TeamStep
            schoolId={formData.school_id}
            teamName={formData.team_name}
            teamMembers={formData.team_members}
            onChange={handleInputChange}
            onTeamMemberToggle={handleTeamMemberToggle}
          />
        );
      case 4:
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}

          <NavigationButtons
            currentStep={step}
            totalSteps={TOTAL_STEPS}
            onBack={handleBack}
            onNext={handleNext}
            isLastStep={step === TOTAL_STEPS}
            error={error}
          />
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeRegisteration;

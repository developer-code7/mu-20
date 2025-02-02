import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import StepIndicator from "../components/registration/StepIndicator";
import NavigationButtons from "../components/registration/NavigationButtons";
import ChallengeStep from "../components/registration/steps/ChallengeStep";
import CommitteeStep from "../components/registration/steps/CommitteeStep";
import TeamStep from "../components/registration/steps/TeamStep";
import ReviewStep from "../components/registration/steps/ReviewStep";
import { validateStep, ValidationError } from "../utils/validations";
import { registerForChallenge } from "../utils/registerForChallenge";
import { useDispatch } from "react-redux";
import { fetchChallengeById } from "../redux/features/challenges/challengesActions";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
interface ChallengeRegisterationProps {
  openModal: () => void;
  handleLoading: (val: boolean) => void;
}
interface FormData {
  challenge: {
    id: string;
    name: string;
    team_size: number;
    has_committee: boolean;
  } | null;
  committee_preferences: {
    [key: string]: {
      committee_name: string;
      portfolio_preferences: { portfolio_id: string; portfolio_name: string }[];
    };
  };
  team_name: string;
  team_members: { user_id: string; full_name: string }[];
}

const TOTAL_STEPS = 4;

const ChallengeRegisteration: React.FC<ChallengeRegisterationProps> = ({
  openModal,
  handleLoading,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<ValidationError | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    challenge: null,
    committee_preferences: {},
    team_name: "",
    team_members: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await dispatch(fetchChallengeById(id)).unwrap();
        if (response) {
          setFormData((prev) => ({
            ...prev,
            challenge: {
              id: response.challenge_id,
              name: response.challenge_name,
              team_size: response.team_size,
              has_committee: response.has_committee,
            },
          }));
        }
      }
    };

    fetchData();
  }, [id, dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
    setError(null);
  };
  const handleChallengeSelect = (challenge: {
    id: string;
    name: string;
    team_size: number;
    has_committee: boolean;
  }) => {
    setFormData((prev) => ({
      ...prev,
      challenge,
      committee_preferences: {},
      team_members: [],
    }));
    setError(null);
  };

  const handleCommitteeToggle = (
    committeeId: string,
    committeeName: string
  ) => {
    setFormData((prev) => {
      const newPreferences = { ...prev.committee_preferences };
      if (newPreferences[committeeId]) {
        delete newPreferences[committeeId];
      } else {
        newPreferences[committeeId] = {
          committee_name: committeeName,
          portfolio_preferences: [],
        };
      }
      return { ...prev, committee_preferences: newPreferences };
    });
    setError(null);
  };

  const handlePortfolioChange = (
    committeeId: string,
    portfolio_id: string,
    portfolio_name: string
  ) => {
    setFormData((prev) => {
      const newPreferences = { ...prev.committee_preferences };
      const currentPortfolios =
        newPreferences[committeeId]?.portfolio_preferences || [];
      const portfolioIndex = currentPortfolios.findIndex(
        (p) => p.portfolio_id === portfolio_id
      );

      if (portfolioIndex === -1) {
        currentPortfolios.push({ portfolio_id, portfolio_name });
      } else {
        currentPortfolios.splice(portfolioIndex, 1);
      }

      newPreferences[committeeId] = {
        ...newPreferences[committeeId],
        portfolio_preferences: currentPortfolios,
      };
      return { ...prev, committee_preferences: newPreferences };
    });
    setError(null);
  };

  const handleTeamMemberToggle = (user: {
    user_id: string;
    full_name: string;
  }) => {
    setFormData((prev) => {
      const newMembers = prev.team_members.find(
        (member) => member.user_id === user.user_id
      )
        ? prev.team_members.filter((member) => member.user_id !== user.user_id)
        : [...prev.team_members, user];
      return { ...prev, team_members: newMembers };
    });
    setError(null);
  };
  console.log(formData.challenge);
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
        id: user?.id,
        fullname: user?.fullName,
        email: user?.email,
        school_id: user?.schoolId,
      },
      selected_challenge: {
        challenge: formData.challenge,
        committee_preference: Object.entries(
          formData.committee_preferences
        ).map(([committee_id, { committee_name, portfolio_preferences }]) => ({
          committee_id,
          committee_name,
          portfolio_preferences,
        })),
      },
      team_details: {
        team_name: formData.team_name,
        team_members: formData.team_members,
      },
    };
    registerForChallenge(formattedData)
      .then(() => {
        openModal();
        navigate("/dashboard");
        handleLoading(false);
        toast.success(
          `Successfully Registered for ${formData.challenge?.name}`
        );
      })
      .catch((error) => toast.error(error.message || "Something went wrong"));

    handleLoading(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ChallengeStep
            id={user?.id}
            selectedChallenge={formData.challenge}
            onChallengeSelect={handleChallengeSelect}
          />
        );
      case 2:
        return (
          <CommitteeStep
            selectedChallenge={formData.challenge}
            committeePreferences={formData.committee_preferences}
            onCommitteeToggle={handleCommitteeToggle}
            onPortfolioChange={handlePortfolioChange}
          />
        );
      case 3:
        return (
          <TeamStep
            schoolId={user?.schoolId}
            teamLeader={user}
            selectedChallenge={formData.challenge}
            teamName={formData.team_name}
            teamMembers={formData.team_members}
            onChange={handleInputChange}
            onTeamMemberToggle={handleTeamMemberToggle}
          />
        );
      case 4:
        return <ReviewStep formData={formData} user={user} />;
      default:
        return null;
    }
  };
  const { conferenceId } = useParams();
  return (
    <div className=" min-h-screen flex flex-col  items-center justify-center p-4">
      <Link
        to={`/dashboard/conference/${conferenceId}`}
        className="text-xl inline-flex items-center text-[#FF5722] hover:text-[#F4511E] mb-6"
      >
        <ArrowLeft size={22} className="mr-2" />
        Back to Conferences
      </Link>

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
            handleClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default ChallengeRegisteration;

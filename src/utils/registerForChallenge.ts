import toast from "react-hot-toast";
import axiosInstance from "../helper/axiosInstance";

interface FormData {
  user: {
    id: string;
    fullname: string;
    email: string;
    school_id: string;
  };
  selected_challenge: {
    challenge: {
      id: string;
      name: string;
      has_committees: boolean;
    };
    committee_preference: {
      committee_id: string;
      committee_name: string;
      portfolio_preferences: {
        portfolio_id: string;
        portfolio_name: string;
      }[];
    }[];
  };
  team_details: {
    team_name: string;
    team_members: {
      user_id: string;
      full_name: string;
    }[];
  };
}

export const registerForChallenge = async (formData: FormData) => {
  try {
    // Helper: Create team
    const createTeam = async () => {
      try {
        const response = await axiosInstance.post("/teams/create-team", {
          team_name: formData.team_details.team_name,
          challenge_id: formData.selected_challenge.challenge.id,
          school_id: formData.user.school_id,
        });

        return response?.data.data;
      } catch (error) {
        toast.error(error?.response.data.error);
        throw new Error(error?.response.data.error);
      }
    };

    // Helper: Add team members
    const addTeamMembers = async (teamId: string) => {
      const { team_members } = formData.team_details;
      team_members.push({
        user_id: formData.user.id,
        full_name: formData.user.fullname,
      });
      try {
        const response = await axiosInstance.post(
          "/team-members/add-team-members",
          {
            team_id: teamId,
            team_members,
          }
        );
        return response?.data.data;
      } catch (error) {
        toast.error(error?.response.data.error);
        throw new Error(error?.response.data.error);
      }
    };

    // Helper: Create registration
    const createRegistration = async (teamId: string) => {
      const registrationData = {
        challenge_id: formData.selected_challenge.challenge.id,
        team_id: teamId,
      };

      try {
        const response = await axiosInstance.post(
          "/registrations/register-challenge",
          {
            ...registrationData,
          }
        );
        return response?.data.data;
      } catch (error) {
        toast.error(error?.response.data.error);

        throw new Error(error?.response.data.error);
      }
    };

    // Helper: Fetch committee portfolio IDs
    // const fetchCommitteePortfolioIds = async () => {
    //   const preferences =
    //     formData.selected_challenge.committee_preference.flatMap((committee) =>
    //       committee.portfolio_preferences.map((portfolio) => ({
    //         committee_id: committee.committee_id,
    //         portfolio_id: portfolio.portfolio_id,
    //       }))
    //     );

    //   const ids = [];
    //   for (const preference of preferences) {
    //     const { data, error } = await supabase
    //       .from("committee_portfolio")
    //       .select("committee_portfolio_id")
    //       .eq("committee_id", preference.committee_id)
    //       .eq("portfolio_id", preference.portfolio_id)
    //       .single();

    //     if (error) {
    //       console.error(
    //         `Error fetching committee_portfolio_id for committee_id: ${preference.committee_id} and portfolio_id: ${preference.portfolio_id}`,
    //         error
    //       );
    //       throw error;
    //     }

    //     ids.push(data.committee_portfolio_id);
    //   }

    //   return ids;
    // };

    // Helper: Add team preferences
    const addTeamPreferences = async (registrationId: string) => {
      const preferences =
        formData.selected_challenge.committee_preference.flatMap((committee) =>
          committee.portfolio_preferences.map((portfolio) => ({
            committee_id: committee.committee_id,
            portfolio_id: portfolio.portfolio_id,
          }))
        );

      try {
        const response = await axiosInstance.post(
          "/team-preferences/add-preferences",
          {
            registration_id: registrationId,
            preferences,
          }
        );
        return response?.data.data;
      } catch (error) {
        toast.error(error?.response.data.error);

        throw new Error(error?.response.data.error);
      }
    };

    // Main process
    const data = await createTeam();
    await addTeamMembers(data?.id);
    const registration = await createRegistration(data?.id);

    if (formData.selected_challenge.challenge.has_committees) {
      await addTeamPreferences(registration?.id);
    }

    console.log("Registration process completed successfully.", registration);
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

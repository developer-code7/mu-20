import { supabase } from "../../supabase/supabase.client";

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
      has_committee: boolean
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
      const { data, error } = await supabase
        .from("teams")
        .insert({
          team_name: formData.team_details.team_name,
          challenge_id: formData.selected_challenge.challenge.id,
          school_id: formData.user.school_id,
        })
        .select("team_id")
        .single();

      if (error) throw new Error(`Failed to create team: ${error.message}`);
      return data.team_id;
    };

    // Helper: Add team members
    const addTeamMembers = async (teamId: string) => {
      const { team_members } = formData.team_details;
      team_members.push({
        user_id: formData.user.id,
        full_name: formData.user.fullname,
      });
      const { error } = await supabase.from("team_members").insert(
        team_members.map((member) => ({
          team_id: teamId,
          user_id: member.user_id,
        }))
      );

      if (error)
        throw new Error(`Failed to add team members: ${error.message}`);
    };

    // Helper: Create registration
    const createRegistration = async (teamId: string) => {
      const registrationData = {
        user_id: formData.user.id,
        challenge_id: formData.selected_challenge.challenge.id,
        team_id: teamId,
        registration_date: new Date().toISOString(),
        status: true,
      };

      // Insert into the "registration" table and return the full registration record
      const { data, error } = await supabase
        .from("registrations")
        .insert(registrationData)
        .select("*") // Fetch all columns from the inserted row
        .single();

      if (error) {
        throw new Error(`Failed to complete registration: ${error.message}`);
      }

      // Return the complete registration record
      return data;
    };

    // Helper: Fetch committee portfolio IDs
    const fetchCommitteePortfolioIds = async () => {
      const preferences =
        formData.selected_challenge.committee_preference.flatMap((committee) =>
          committee.portfolio_preferences.map((portfolio) => ({
            committee_id: committee.committee_id,
            portfolio_id: portfolio.portfolio_id,
          }))
        );

      const ids = [];
      for (const preference of preferences) {
        const { data, error } = await supabase
          .from("committee_portfolio")
          .select("committee_portfolio_id")
          .eq("committee_id", preference.committee_id)
          .eq("portfolio_id", preference.portfolio_id)
          .single();

        if (error) {
          console.error(
            `Error fetching committee_portfolio_id for committee_id: ${preference.committee_id} and portfolio_id: ${preference.portfolio_id}`,
            error
          );
          throw error;
        }

        ids.push(data.committee_portfolio_id);
      }

      return ids;
    };

    // Helper: Add team preferences
    const addTeamPreferences = async (
      registrationId: string,
      committeePortfolioIds: string[]
    ) => {
      const teamPreferences = committeePortfolioIds.map((id) => ({
        registration_id: registrationId,
        committee_portfolio_id: id,
      }));

      const { error } = await supabase
        .from("team_preferences")
        .insert(teamPreferences);

      if (error)
        throw new Error(`Failed to add team preferences: ${error.message}`);
    };

    // Main process
    const teamId = await createTeam();
    await addTeamMembers(teamId);
    const registration = await createRegistration(teamId);

    if (formData.selected_challenge.challenge.has_committee) {
      const committeePortfolioIds = await fetchCommitteePortfolioIds();
      await addTeamPreferences(
        registration.registration_id,
        committeePortfolioIds
      );
    }

    console.log("Registration process completed successfully.", registration);
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

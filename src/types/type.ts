export interface User {
  id: string;
  email: string;
  fullName: string;
  schoolId: string;
}

export interface Challenge {
  challenge_id: string;
  challenge_name: string;
  challenge_type: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  team_size: number;
  already_registered: boolean;
  time_conflict: boolean;
  has_committee: boolean
}

export interface Portfolio {
  portfolio_id: string;
  portfolio_name: string;
  description: string;
}

export interface Committee {
  committee_id: string;
  committee_name: string;
  description: string;
  portfolios: Array<Portfolio>;
  created_at: string;
}

export interface Conference {
  conference_id: string;
  conference_name: string;
  start_date: string;
  end_date: string;
  location: string;
  description: string;
}

export interface School {
  school_name: string;
  school_id: string;
}
export interface AuthState {
  session: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface RegistrationDetails {
  status: boolean;
  team_id: string;
  user_id: string;
  challenge_id: string;
  registration_id: string;
  registration_date: string;
}

export interface ChallengeDetails {
  end_date: string;
  is_active: boolean;
  start_date: string;
  challenge_name: string;
  challenge_type: string;
}

export interface TeamDetails {
  team_id: string;
  team_name: string;
}

export interface ChallengeRegistration {
  registration_details: RegistrationDetails;
  challenge_details: ChallengeDetails;
  team_details: TeamDetails;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  school_id: string;
  class: number;
  contact: string;
}

export interface Challenge {
  id: string;
  name: string;
  type: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  team_size: number;
  already_registered: boolean;
  time_conflict: boolean;
  has_committees: boolean;
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
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  location: string;
  image_url: string;
  description: string;
}

export interface School {
  name: string;
  id: string;
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
  allotment_details: AllotmentDetails | null;
}

export interface AllotmentDetails {
  committee_id: string;
  committee_name: string;
  portfolio_id: string;
  portfolio_name: string;
}

export interface RegistrationData {
  fullname: string;
  email: string;
  password: string;
  school_id: string;
  student_class: string;
  contact: string;
}
export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): ValidationError | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return { field: 'email', message: 'Email is required' };
  }
  if (!emailRegex.test(email)) {
    return { field: 'email', message: 'Please enter a valid email address' };
  }
  return null;
};

export const validatePassword = (password: string): ValidationError | null => {
  if (!password) {
    return { field: 'password', message: 'Password is required' };
  }
  if (password.length < 6 || password.length > 10) {
    return { field: 'password', message: 'Password must be between 6 and 10 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { field: 'password', message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { field: 'password', message: 'Password must contain at least one special character' };
  }
  return null;
};

export const validateStep = (step: number, formData: any): ValidationError | null => {
  switch (step) {
    case 1:
      if (!formData.challenge_id) {
        return { field: 'challenge_id', message: 'Please select a challenge' };
      }
      break;
    case 2:
      if (Object.keys(formData.committee_preferences).length === 0) {
        return { field: 'committee_preferences', message: 'Please select at least one committee' };
      }
      for (const committeeId in formData.committee_preferences) {
        if (formData.committee_preferences[committeeId].length === 0) {
          return { field: 'portfolio_preferences', message: 'Please select at least one portfolio for each selected committee' };
        }
      }
      break;
    case 3:
      if (!formData.team_name.trim()) {
        return { field: 'team_name', message: 'Team name is required' };
      }
      if (formData.team_members.length === 0) {
        return { field: 'team_members', message: 'Please select at least one team member' };
      }
      break;
  }
  return null;
};
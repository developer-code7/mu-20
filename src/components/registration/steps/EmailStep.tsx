import React from 'react';
import { RegistrationData } from '../../../types/type';

interface EmailStepProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Partial<RegistrationData>;
}

const EmailStep: React.FC<EmailStepProps> = ({ email, onChange,errors }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Email Address
      </label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        className="outline-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
        placeholder="Enter your email"
        required
      />
      {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
    </div>
  );
};

export default EmailStep;
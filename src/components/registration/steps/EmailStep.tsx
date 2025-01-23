import React from 'react';

interface EmailStepProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailStep: React.FC<EmailStepProps> = ({ email, onChange }) => {
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
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
        placeholder="Enter your email"
        required
      />
    </div>
  );
};

export default EmailStep;
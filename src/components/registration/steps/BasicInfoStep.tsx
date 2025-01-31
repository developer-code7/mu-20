import React from 'react';

interface BasicInfoStepProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ name, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Full Name
      </label>
      <input
        type="text"
        name="fullname"
        value={name}
        onChange={onChange}
        className="outline-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
        placeholder="Enter your full name"
        required
      />
    </div>
  );
};

export default BasicInfoStep;
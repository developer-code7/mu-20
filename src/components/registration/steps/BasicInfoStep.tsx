import React from "react";
import { RegistrationData } from "../../../types/type";

interface BasicInfoStepProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Partial<RegistrationData>;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  name,
  onChange,
  errors,
}) => {
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

      {/* <label className="mt-4 block text-sm font-medium text-gray-700 mb-2">
        Class
      </label>
      <input
        type="text"
        name="fullname"
        value={name}
        onChange={onChange}
        className="outline-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
        placeholder="Enter your class"
        required
      /> */}
      {errors.fullname && (
        <p className="mt-1 text-sm text-red-600">{errors.fullname}</p>
      )}
    </div>
  );
};

export default BasicInfoStep;

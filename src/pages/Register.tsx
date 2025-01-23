import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import PasswordStep from "../components/registration/steps/PasswordStep";
import EmailStep from "../components/registration/steps/EmailStep";
import SchoolStep from "../components/registration/steps/SchoolStep";
import BasicInfoStep from "../components/registration/steps/BasicInfoStep";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { registerUser } from "../redux/features/auth/authAction";

interface RegistrationData {
  fullname: string;
  email: string;
  password: string;
  school_id: string;
}
const Register = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    fullname: "",
    email: "",
    password: "",
    school_id: "",
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullname,
        schoolId: formData.school_id,
      };

      // Dispatch registerUser action
      const response = await dispatch(registerUser(userData)).unwrap(); // Unwrap to handle the resolved response
      console.log("User Registered Successfully:", response);

      if (response) {
        redirect("/");
      }
    } catch (error) {
      console.error("Registration Failed:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "school_id") {
        return { ...prev, [name]: value, team_members: [] };
      }
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">MU20</h1>
          <p className="text-gray-600">Welcome! Please register to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoStep
            name={formData.fullname}
            onChange={handleInputChange}
          />
          <EmailStep email={formData.email} onChange={handleInputChange} />
          <PasswordStep
            password={formData.password}
            onChange={handleInputChange}
          />
          <SchoolStep
            schoolId={formData.school_id}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

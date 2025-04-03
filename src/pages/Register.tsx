import React, { useState } from "react";
import PasswordStep from "../components/registration/steps/PasswordStep";
import EmailStep from "../components/registration/steps/EmailStep";
import SchoolStep from "../components/registration/steps/SchoolStep";
import BasicInfoStep from "../components/registration/steps/BasicInfoStep";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { registerUser } from "../redux/features/auth/authAction";
import { RegistrationData } from "../types/type";

interface RegisterProps {
  handleSignIn: () => void;
}
const Register: React.FC<RegisterProps> = ({ handleSignIn }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    fullname: "",
    email: "",
    password: "",
    school_id: "",
    student_class: "",
    contact: "",
    gender: "",
  });

  const [errors, setErrors] = useState<Partial<RegistrationData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationData> = {};

    // Full Name validation
    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }
    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Class validation
    if (!formData.student_class.trim()) {
      newErrors.student_class = "Class is required";
    } else if (
      !/^\d+$/.test(formData.student_class) ||
      +formData.student_class < 1 ||
      +formData.student_class > 12
    ) {
      newErrors.student_class = "Class must be a number between 1 and 12";
    }
    // Contact validation
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact must be 10 digits";
    }

    // School validation
    if (!formData.school_id.trim()) {
      newErrors.school_id = "School is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = {
        email: formData.email,
        password: formData.password,
        name: formData.fullname,
        schoolId: formData.school_id,
        student_class: formData.student_class,
        contact: formData.contact,
        gender: formData.gender,
      };

      // Dispatch registerUser action
      const response = await dispatch(registerUser(userData)).unwrap();
      if (response) {
        handleSignIn();
      }
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

  const handleSchoolSelect = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      school_id: id,
    }));
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
            errors={errors}
          />
          <EmailStep
            email={formData.email}
            onChange={handleInputChange}
            errors={errors}
          />
          <PasswordStep
            password={formData.password}
            onChange={handleInputChange}
            errors={errors}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className={`w-full px-3 py-2 border overflow-auto  ${
                errors.gender ? "border-red-300" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Gender</option>

              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
            )}
          </div>
          <SchoolStep onChange={handleSchoolSelect} errors={errors} />
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <input
                type="text"
                name="student_class"
                value={formData.student_class}
                onChange={handleInputChange}
                className="outline-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your class 9, 10, 12 etc"
                required
              />
            </div>
            {errors.student_class && (
              <p className="mt-1 text-sm text-red-600">
                {errors.student_class}
              </p>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="outline-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your Contact Number"
                required
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
              )}
            </div>
          </div>
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
            <button
              onClick={handleSignIn}
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { fetchSchools } from "../../../redux/features/schools/schoolsActions";

interface SchoolStepProps {
  schoolId: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SchoolStep: React.FC<SchoolStepProps> = ({ schoolId, onChange }) => {
  const dispatch = useAppDispatch();
  const { data: schools, loading } = useAppSelector((state) => state.schools);

  useEffect(() => {
    dispatch(fetchSchools());
  }, [dispatch]);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        School
      </label>
      <select
        name="school_id"
        value={schoolId}
        onChange={onChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
        required
      >
        <option value="">Select your school</option>
        {!loading &&
          schools?.map((school) => (
            <option key={school.school_id} value={school.school_id}>
              {school.school_name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SchoolStep;

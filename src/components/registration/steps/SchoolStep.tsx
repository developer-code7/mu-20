import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { fetchSchools } from "../../../redux/features/schools/schoolsActions";
import { RegistrationData, School } from "../../../types/type";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SchoolStepProps {
  onChange: (id: string) => void;
  errors: Partial<RegistrationData>;
}

const SchoolStep: React.FC<SchoolStepProps> = ({ onChange, errors }) => {
  const dispatch = useAppDispatch();
  const { data: schools, loading } = useAppSelector((state) => state.schools);
  const [selectedSchool, setSelectedSchool] = useState<School>({
    id: "",
    name: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    dispatch(fetchSchools());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSchools(
      schools.filter((school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [schools, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectChallenge = (school: School) => {
    setSelectedSchool(school);
    onChange(school?.id);
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        School
      </label>
      <div className=" py-2 flex items-center border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500">
        {dropdownOpen ? (
          <input
            type="text"
            placeholder="Search School"
            className="w-full px-3 outline-none "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setDropdownOpen(true)}
          />
        ) : (
          <p
            className="w-full px-3 cursor-pointer"
            onClick={() => setDropdownOpen(true)}
          >
            {selectedSchool?.name ? selectedSchool?.name : "Select Your School"}
          </p>
        )}
        {dropdownOpen ? (
          <ChevronUp
            onClick={() => setDropdownOpen(false)}
            className="text-gray-500 transition-all duration-300 cursor-pointer"
          />
        ) : (
          <ChevronDown
            onClick={() => setDropdownOpen(true)}
            className="text-gray-500 transition-all duration-300 cursor-pointer"
          />
        )}
      </div>
      {dropdownOpen && (
        <ul className="absolute z-10 h-[100px]  bg-white border border-gray-300 rounded-md shadow-md  overflow-auto mt-1 overflow-y-scroll w-full">
          {loading ? (
            <li className="px-3 py-2 text-gray-500">Loading...</li>
          ) : filteredSchools.length > 0 ? (
            filteredSchools.map((school) => (
              <li
                key={school.id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-200 "
                onClick={() => {
                  setDropdownOpen(false);
                  handleSelectChallenge(school);
                }}
              >
                {school.name}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">No Schools Found</li>
          )}
        </ul>
      )}
      {errors.school_id && (
            <p className="mt-1 text-sm text-red-600">{errors.school_id}</p>
          )}
    </div>
  );
};

export default SchoolStep;

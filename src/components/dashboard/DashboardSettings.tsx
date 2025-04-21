import {
  User,
  Mail,
  School as SchoolIcon,
  Phone,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  fetchSchoolById,
  fetchSchools,
} from "../../redux/features/schools/schoolsActions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateUser } from "../../redux/features/auth/authAction";

const DashboardSettings = () => {
  const dispatch = useAppDispatch();
  const [schools, setSchools] = useState<Array<{ id: number; name: string }>>(
    []
  );
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = useAppSelector((state) => state.auth.user);
  const [isOtherSchool, setIsOtherSchool] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    school: "",
    school_id: "",
    notifications: "",
    contact: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchSchools()).then((res) => {
      console.log("School fetch response:", res.payload.data);
      if (res.payload && Array.isArray(res.payload.data)) {
        setSchools(res.payload.data);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.school_id) {
      dispatch(fetchSchoolById(currentUser.school_id)).then((res) => {
        const fetchedSchool = res.payload;

        const newData = {
          fullName: currentUser.full_name || "",
          email: currentUser.email || "",
          school: fetchedSchool?.name || "",
          school_id: currentUser.school_id || "",
          notifications: currentUser.notifications || "",
          contact: currentUser.contact || "",
        };
        setUserData(newData);
      });
    }
  }, [dispatch, currentUser]);

  const handleSaveChanges = async () => {
    if (!currentUser?.id) return;
  
    try {
      const updateuser = {
        id: currentUser.id,
        name: userData.fullName,
        email: userData.email,
        contact: userData.contact,
        school: userData.school, 
        school_id: userData.school_id,
      };
  
      console.log("Sending update payload:", updateuser);
  
      const result = await dispatch(updateUser(updateuser));
  
      console.log("Update result:", result);
  
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    
    const { name, value } = e.target;
    console.log("name",name,"value",value);
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-medium text-white">Profile Settings</h2>
          <div className="edit-btn">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-orange-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 disabled:opacity-60"
                  placeholder="John Doe"
                  value={userData.fullName}
                  onChange={handleChange}
                  name="fullName"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 disabled:opacity-60"
                  placeholder="john@example.com"
                  value={userData.email}
                  onChange={handleChange}
                  name="email"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                School
              </label>
              <div
                className="relative inline-block text-left w-full"
                ref={dropdownRef}
              >
                <div>
                  {isEditing ? (
                    isOtherSchool ? (
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md placeholder-gray-400"
                        placeholder="Enter your school name"
                        name="school"
                        value={userData.school}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="relative">
                        <button
                          type="button"
                          className="w-full pl-10 pr-2 py-2 bg-gray-700 border border-gray-600 text-white rounded-md placeholder-gray-400 text-left flex items-center justify-between" // Added pr-10 and flex...
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                          {userData.school || "Select a school"}
                          <ChevronDown className="h-5 w-5 text-gray-400" />{" "}
                          {/* Added dropdown arrow */}
                        </button>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SchoolIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        {isDropdownOpen && (
                          <div className="absolute mt-1 w-full rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none max-h-48 overflow-y-auto z-10">
                            {" "}
                            {/* Added z-10 */}
                            <div
                              className="py-1"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="options-menu"
                            >
                              {schools.map((school) => (
                                <a
                                  key={school.id}
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                                  role="menuitem"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setUserData((prev) => ({
                                      ...prev,
                                      school: school.name,
                                      school_id: school.id.toString(),
                                    }));
                                    setIsDropdownOpen(false);
                                  }}
                                >
                                  {school.name}
                                </a>
                              ))}
                              {/* <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                                role="menuitem"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsOtherSchool(true);
                                  setUserData((prev) => ({
                                    ...prev,
                                    school: "",
                                    school_id: "",
                                  }));
                                  setIsDropdownOpen(false);
                                }}
                              >
                                Other
                              </a> */}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  ) : (<>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SchoolIcon className="h-5 w-5 text-gray-500" />
                  </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md placeholder-gray-400 disabled:opacity-60"
                      placeholder="Delhi Public School"
                      value={userData.school}
                      name="school"
                      disabled
                    /></>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Contact
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md placeholder-gray-400 disabled:opacity-60"
                  placeholder="Delhi Public School"
                  value={userData.contact}
                  onChange={handleChange}
                  name="contact"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            {isEditing && (
              <button
                className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;

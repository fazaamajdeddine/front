import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faBuilding, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../../stores";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const RegisterUser = ()  => {
  const registerUser = useAuthStore((state) => state.registerUser);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"Establishment" | "Parent" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
 // const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName) newErrors.firstName = "First Name is required.";
    if (!lastName) newErrors.lastName = "Last Name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!accountType) newErrors.accountType = "Account Type is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await registerUser({
        firstName,
        lastName,
        role: accountType!,
        email,
        password,
      });
      toast.success("User registered successfully!");
      navigate("/auth");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-app-background`}>
    

      <div className="flex flex-col items-center w-full max-w-2xl mt-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Create Account</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          {/* First Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full h-12 px-4 mt-1 bg-white border ${errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none`}
            />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full h-12 px-4 mt-1 bg-white border ${errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none`}
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-12 px-4 mt-1 bg-white border ${errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Account Type */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Account Type <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-4">
              {["Establishment", "Parent"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAccountType(type as "Establishment" | "Parent")}
                  className={`flex items-center px-4 py-2 rounded-lg ${accountType === type ? "bg-[#FBA628] text-white" : "bg-white text-black border"
                    }`}
                >
                  <FontAwesomeIcon icon={type === "Establishment" ? faBuilding : faUser} className="mr-2" />
                  {type}
                </button>
              ))}
            </div>
            {errors.accountType && <p className="text-sm text-red-500">{errors.accountType}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full h-12 px-4 mt-1 bg-white border ${errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none`}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};



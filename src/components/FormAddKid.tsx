// src/components/FormAddKid.tsx
import { useState, FormEvent } from "react";
import { useKidsStore } from "../stores/kids/kids.store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { KidResponse } from "../interfaces";
import { Gender, Preferences } from "../helpers/helpers";
import { useAuthStore } from "../stores/auth/auth.store";

export const FormAddKid = () => {
  const createKid = useKidsStore((state) => state.createKid);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<KidResponse>({
    zid: "",
    name: "",
    dateOfBirth: "",
    preferences: [],
    gender: "Male",
  });

  const handleGenderSelect = (gender: Gender) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreferenceToggle = (preference: Preferences) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((pref) => pref !== preference)
        : [...prev.preferences, preference],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, dateOfBirth, gender } = formData;

    if (!name || !dateOfBirth || !gender) {
      return toast.error("All fields are mandatory!");
    }

    try {
      // Pass the parentId from the auth store
      const userId = useAuthStore.getState().user?._id; // Get the current user ID from the auth store
      await createKid({ ...formData, parentId: userId }); // Pass the parentId
      toast.success("Kid registered successfully!");
      navigate("/entranceGate");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register kid.");
    }
  };

  return (
    <div className="md:w-2/3 lg:w-1/2 p-10 shadow-lg flex flex-col gap-4">
      <h2 className="text-gray-600 uppercase text-center text-xl font-bold">
        Register a New Kid
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Gender Selection */}
        <div className="flex justify-center gap-8">
          <div
            onClick={() => handleGenderSelect(Gender.Male)}
            className={`kid-card cursor-pointer group relative flex flex-col items-center bg-white p-2 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out ${formData.gender === "Male" ? "border-[#FBA628] border-4" : ""}`}
          >
            <img
              src={"/bkids.svg"}
              className="w-16 h-16 rounded-full object-cover mb-4 transition-all duration-500 ease-in-out group-hover:scale-110"
              alt="Male"
            />
            <span className="text-gray-600 font-bold">Male</span>
          </div>

          <div
            onClick={() => handleGenderSelect(Gender.Female)}
            className={`kid-card cursor-pointer group relative flex flex-col items-center bg-white p-2 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out ${formData.gender === "Female" ? "border-[#FBA628] border-4" : ""}`}
          >
            <img
              src={"/gkids.svg"}
              className="w-16 h-16 rounded-full object-cover mb-4 transition-all duration-500 ease-in-out group-hover:scale-110"
              alt="Female"
            />
            <span className="text-gray-600 font-bold">Female</span>
          </div>
        </div>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-md text-gray-500 outline-none"
        />

        {/* Date of Birth */}
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-md text-gray-500 outline-none"
        />

        {/* Preferences */}
        <div>
          <h3 className="text-gray-600 font-bold mb-2">Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {Object.values(Preferences).map((preference) => (
              <button
                key={preference}
                type="button"
                onClick={() => handlePreferenceToggle(preference)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${formData.preferences.includes(preference) ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {preference}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#75B936] py-3 rounded-md text-white uppercase font-medium"
        >
          Register Kid
        </button>
      </form>
    </div>
  );
};
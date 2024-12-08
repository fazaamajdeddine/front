import { useNavigate } from "react-router-dom"; // Import useNavigate
import { KidResponse } from "../interfaces";

export const Kid = ({
  kid,
  onSelect,
  isSelected,
}: {
  kid: KidResponse;
  onSelect: (kid: KidResponse) => void;
  isSelected: boolean;
}) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleArrowClick = () => {
    onSelect(kid); // Handle any selection logic
    navigate("/home"); // Navigate to the home page
  };

  return (
    <div
      className="flex items-center p-4 rounded-lg shadow-md w-[750px] h-[136px] border-2 border-dashed"
      style={{
        backgroundColor: "rgba(234, 241, 239, 0.35)",
        borderColor: "#75B936",
      }}
    >
      {/* Avatar */}
      <img
        src={kid.gender === "Male" ? "/bkids.svg" : "/gkids.svg"}
        alt={kid.name}
        className="w-24 h-24 rounded-full object-cover mr-4"
      />

      {/* Kid Details */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{kid.name}</h3>
        <p className="text-gray-600">{kid.preferences || "No preferences available"}</p>
      </div>

      {/* Arrow Button */}
      <button
        onClick={handleArrowClick} // Use the handleArrowClick function
        className="ml-4 hover:text-black transition"
      >
        <img src="/arrow.svg" alt="Go" className="w-12 h-12" />
      </button>
    </div>
  );
};

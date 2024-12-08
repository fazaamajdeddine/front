import { useNavigate, useLocation } from 'react-router-dom';

const GameSuccessPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate(); // Create a navigate function
  const location = useLocation(); // Get the current route location

  const handleContinue = () => {
    // Close the popup
    onClose();
    // Redirect to the main page
    navigate('/'); // Adjust the path to your home page route
  };

  // Check if the route matches the Dino story route
  const isDinoRoute = location.pathname === "/story/story-1";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      {/* Outer container for SVG with a transparent background */}
      <div className="relative flex flex-col items-center">
        <img
          src="/edhib.svg"
          alt="Success Icon"
          className="w-48 h-48 mb-4"
          style={{ position: 'absolute', top: '-150px' }}
        />

        {/* Inner container for popup content with rounded corners and border */}
        <div className="flex flex-col items-center p-8 bg-white border border-gray-300 rounded-lg shadow-lg max-w-sm mx-auto mt-12">
          <h2 className="text-2xl font-bold text-green-500 animate-fade text-center">
            {isDinoRoute
              ? "أحسنت لقد أكملت لعبة دينو لا يملك أجنحة" // Text for Dino route
              : "أحسنت لقد أكملت لعبة بوبي في الدكان"}
          </h2>
          <p className="mt-2 text-gray-700 text-center">
            تهانينا! لقد أكملت اللعبة بنجاح. يمكنك الآن العودة إلى الصفحة الرئيسية.
          </p>
          <button
            onClick={handleContinue} // Call handleContinue on click
            className="mt-6 px-6 py-2 bg-[#FE207D] text-white rounded-md hover:bg-pink-600 transition-colors"
          >
            الرجوع الى الصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSuccessPopup;

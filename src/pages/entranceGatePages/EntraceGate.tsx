import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKidsStore } from "../../stores/kids/kids.store"; // Zustand store
import { useAuthStore } from "../../stores"; // Zustand store for auth
import LanguageDropdown from "../../components/LanguageDropdown";
import { Loader } from "../../components/Loader"; // Import Loader component
import { Kid } from "../../components/kid";

export const EntranceGate = () => {
    const navigate = useNavigate();
    const getAllKids = useKidsStore((state) => state.getAllKids);
    const deleteKid = useKidsStore((state) => state.deleteKid);
    const kids = useKidsStore((state) => state.kids);
    const logout = useAuthStore((state) => state.logoutUser); // Access logout function

    const [selectedKid, setSelectedKid] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchKids = async () => {
            setIsLoading(true);
            try {
                await getAllKids(); // Fetch kids data
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching
            }
        };
        fetchKids();
    }, [getAllKids]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="relative bg-app-background min-h-screen flex flex-col items-center justify-center"> {/* Centered vertically */}
            {/* Page Logo */}
            <div className="absolute top-4 left-4">
                <img src="/edhib.svg" alt="Page Logo" className="w-36" />
            </div>

            {/* Language Dropdown */}
            <div className="absolute top-4 right-4 z-10">
                <LanguageDropdown />
            </div>

            {/* Loading State */}
            {isLoading ? (
                <Loader /> // Show loader when data is loading
            ) : (
                // Kids Cards Section
                <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto justify-center items-center">
                    {kids.length === 0 ? (
                        <div className="text-lg font-semibold text-gray-600 text-center">
                            No kids available
                        </div>
                    ) : (
                        kids.map((kid) => (
                            <div key={kid.zid} className="flex items-center gap-4 w-full justify-center">
                                <Kid
                                    kid={kid}
                                    onSelect={setSelectedKid}
                                    isSelected={selectedKid?._id === kid.zid} // Check if the kid is selected
                                />

                                {/* Button Container */}
                                <div className="flex flex-col items-center gap-2">
                                    {/* Edit Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent click from selecting the kid
                                            console.log(`Editing kid: ${kid.zid}`);
                                        }}
                                        className="w-[175px] h-[35px] px-4 py-2 text-sm font-semibold rounded-md"
                                        style={{
                                            backgroundColor: "rgba(234, 241, 239, 0.35)", // Background with 35% opacity
                                            border: "2px dashed #75B936", // Dotted border
                                            color: "#75B936",
                                        }}
                                    >
                                        Edit
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent click from selecting the kid
                                            console.log(`Deleting kid with ID: ${kid.zid}`);
                                            deleteKid(kid.zid);

                                        }}
                                        className="w-[175px] h-[35px] px-4 py-2 text-sm font-semibold rounded-md"
                                        style={{
                                            backgroundColor: "rgba(234, 241, 239, 0.35)", // Background with 35% opacity
                                            border: "2px dashed #75B936", // Dotted border
                                            color: "#FF0101",
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Add Kid Button */}
            <div
                className="mt-8 px-6 py-3 rounded-md shadow-lg hover:bg-opacity-80 transition flex items-center gap-2"
                onClick={() => navigate("/addKid")}
                style={{
                    backgroundColor: "#EAF1EF",
                    border: "2px dashed #75B936",
                    color: "#000000",
                }}
            >
                Add Kid
                <img src="/plus.svg" alt="Add" className="w-5 h-5" />
            </div>

            {/* Logout Button */}
            <div className="absolute bottom-6 left-6">
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md shadow hover:bg-opacity-80 transition"
                    style={{
                        backgroundColor: "#FE207D",
                        color: "#ffffff",
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default EntranceGate;

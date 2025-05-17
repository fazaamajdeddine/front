import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores";
import LanguageDropdown from "../components/LanguageDropdown";
import { useState } from "react";

export const AuthLayout = () => {
  const authStatus = useAuthStore((state) => state.status);
  const location = useLocation();
  const isRegisterPage = location.pathname === "/auth/register";

  console.log("Auth Status:", authStatus); // Debugging line

  if (authStatus === "pending") return <div>Loading...</div>;
  if (authStatus === "authorized") return <Navigate to="/entranceGate" />;

  return (
    <div className="flex flex-col min-h-screen bg-app-background">
      {/* Header */}
      <header className="flex justify-between w-full max-w-3xl p-4 mx-auto">
        <img src="/logo.svg" alt="Logo" className="w-36" />
        <div className="flex items-center space-x-4">
          {/* Use the LanguageDropdown component */}
          <LanguageDropdown />
          {!isRegisterPage && (
            <Link to="/auth/register" className="px-4 py-2 bg-[#FBA628] text-black rounded-md">
              Sign Up
            </Link>
          )}
        </div>
      </header>

      {/* Main content (centered form) */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      {!isRegisterPage && (

        <footer className="py-4 text-center text-gray-500">
          Don't have an account?{" "}
          <Link to={"register"} className="text-indigo-600 underline">
            Create one here
          </Link>
        </footer>)}
    </div>
  );
};

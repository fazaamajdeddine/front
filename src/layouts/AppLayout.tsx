// src/layouts/AppLayout.tsx
import React from "react";
import Navbar from "../components/AppNavbar";
import Footer from "../components/AppFooter";
import { Outlet } from "react-router-dom"; // Used to render nested routes

export const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-app-background">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">
        <Outlet /> {/* This renders the nested routes like HomePage, Library, etc. */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

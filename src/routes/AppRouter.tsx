// src/routes/AppRouter.tsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout"; // Auth Layout
import { AppLayout } from "../layouts/AppLayout"; // App Layout for main pages
import { LoginPage } from "../pages/authPages/LoginPage";
import { RegisterUser } from "../pages/authPages/RegisterUser";
import EntranceGate from "../pages/entranceGatePages/EntraceGate";
import { NewKid } from "../pages/entranceGatePages/AddKid";
import { HomePage } from "../pages/HomePage"; // HomePage component
import { StoryBook } from "../pages/storyPages/StoryPage";
import { DinoStoryBook } from "../pages/storyPages/DinoStoryPage";
// src/routes/AppRouter.tsx
import Library from "../pages/Library";  // Use default import
import Videos from "../pages/Videos"
import Contact from "../pages/Contact"
//import { LibraryPage } from "../pages/LibraryPage"; // Example for another page

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterUser />} />
        </Route>

        {/* Entrance Gate Routes */}
        <Route path="/entranceGate" element={<EntranceGate />} />
        <Route path="/addKid" element={<NewKid />} />

        {/* App Routes (AppLayout wrapper) */}
        <Route path="/" element={<AppLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="library" element={<Library />} />
          <Route path="videos" element={<Videos />} />
          <Route path="contact" element={<Contact />} />

        </Route>
        {/* Define the route for the StoryBook page */}
        <Route path="/story/story-0" element={<StoryBook />} />
        <Route path="/story/story-1" element={<DinoStoryBook />} />


        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

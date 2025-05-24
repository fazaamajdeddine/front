import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { AppLayout } from "../layouts/AppLayout";
import { LoginPage } from "../pages/authPages/LoginPage";
import { RegisterUser } from "../pages/authPages/RegisterUser";
import EntranceGate from "../pages/entranceGatePages/EntraceGate";
import { NewKid } from "../pages/entranceGatePages/AddKid";
import { HomePage } from "../pages/HomePage";
import { StoryBook } from "../pages/storyPages/StoryPage";
import { DinoStoryBook } from "../pages/storyPages/DinoStoryPage";
import Library from "../pages/Library";
import Videos from "../pages/Videos";
import Contact from "../pages/Contact";
// import Landing from "../pages/Landing"; // Landing page removed

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* App Routes - Home is now the default entry point */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} /> {/* Home page is now the root index */}
          <Route path="library" element={<Library />} />
          <Route path="videos" element={<Videos />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} /> {/* This matches "/auth" */}
          <Route path="register" element={<RegisterUser />} />
        </Route>

        {/* Entrance Gate Routes */}
        <Route path="/entranceGate" element={<EntranceGate />} />
        <Route path="/addKid" element={<NewKid />} />

        {/* Story Routes */}
        <Route path="/story/story-0" element={<StoryBook />} />
        <Route path="/story/story-1" element={<DinoStoryBook />} />

        {/* Redirect Fallback - Redirects to the new home page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};


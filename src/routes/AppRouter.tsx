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

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} /> {/* This matches "/auth" */}
          <Route path="register" element={<RegisterUser />} />
        </Route>

        {/* Entrance Gate Routes */}
        <Route path="/entranceGate" element={<EntranceGate />} />
        <Route path="/addKid" element={<NewKid />} />

        {/* App Routes */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} /> {/* Default home page */}
          <Route path="library" element={<Library />} />
          <Route path="videos" element={<Videos />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Story Routes */}
        <Route path="/story/story-0" element={<StoryBook />} />
        <Route path="/story/story-1" element={<DinoStoryBook />} />

        {/* Redirect Fallback */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

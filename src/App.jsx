import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ResumeForm from "./pages/ResumeForm";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import VerifyEmail from "./pages/VerifyEmail";
import Verify from "./pages/Verify";
import ResumeCreator from "./pages/ResumeCreator";
import ResumeGenerator from "./pages/ResumeGenerator";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      {/* <Home /> */}
      {/* <ResumeForm /> */}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/verify/:token" element={<Verify />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/create"
          element={
            <ProtectedRoute>
              <ResumeForm />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/edit/:resumeId"
          element={
            <ProtectedRoute>
              <ResumeForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <ResumeCreator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/generate/:id"
          element={
            <ProtectedRoute>
              <ResumeGenerator />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

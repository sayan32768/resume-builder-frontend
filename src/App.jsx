import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ResumeForm from "./pages/ResumeForm";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";

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
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/resume-builder" element={<ResumeForm />} />
      </Routes>
    </>
  );
}

export default App;

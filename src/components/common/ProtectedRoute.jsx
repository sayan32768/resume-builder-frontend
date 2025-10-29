import { getData } from "@/contexts/UserContext";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = getData();
  //   console.log("------------------------------------------", user);
  if (loading)
    return (
      <div className="w-full h-1 bg-gray-200 rounded overflow-hidden relative">
        <div className="absolute top-0 left-0 h-1 w-1/3 bg-black animate-[loading_1.5s_linear_infinite]"></div>
        <style>
          {`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}
        </style>
      </div>
    );
  return <>{user ? children : <Navigate to={"/login"} replace={true} />}</>;
};

export default ProtectedRoute;

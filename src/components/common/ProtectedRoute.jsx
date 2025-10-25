import { getData } from "@/contexts/UserContext";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = getData();
  //   console.log("------------------------------------------", user);
  if (loading)
    return (
      //   <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      //     <div className="flex flex-col items-center gap-4">
      //       <div className="w-12 h-12 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
      //       <p className="text-gray-700 text-lg">Loading Data...</p>
      //     </div>
      //   </div>
      <div></div>
    );
  return <>{user ? children : <Navigate to={"/login"} replace={true} />}</>;
};

export default ProtectedRoute;

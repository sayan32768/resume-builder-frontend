import React, { useState } from "react";
import { Button } from "../ui/button";
import { AtSign, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar2 = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  return (
    <div className="relative max-md:pl-6 max-md:pr-6 md:max-w-[80vw] w-full">
      <div className="w-full max-md:h-16 md:h-20 flex flex-row justify-between">
        <div className="h-full flex flex-col justify-center">
          <a href="/home" className="md:text-2xl max-md:text-xl font-extrabold">
            Resume.
          </a>
        </div>

        <div className="h-full flex flex-col justify-center">
          <Button
            className={
              "hover:cursor-pointer hover:bg-gray-900 hover:text-white"
            }
            onClick={() => {
              navigate("/home", { replace: true });
            }}
            variant={"outline"}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;

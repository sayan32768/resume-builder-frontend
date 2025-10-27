import React, { useState } from "react";
import { Button } from "../ui/button";
import { AtSign, LogOut, User2 } from "lucide-react";

const Navbar = ({ user, handleLogout }) => {
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  return (
    // <div className="flex flex-col gap-y-6 mb-6">
    //   <div className="flex flex-row justify-between h-20 gap-x-3 px-16 items-center">
    //     <div className="flex flex-col">
    //       <span className="text-slate-500 text-sm pt-3">Logged in as</span>
    //       <h1 className="max-md:text-lg md:text-xl lg:text-2xl font-semibold">
    //         {user.username}
    //       </h1>
    //     </div>
    //     {user ? (
    //       <Button
    //         className={
    //           "hover:cursor-pointer hover:bg-gray-900 hover:text-white"
    //         }
    //         onClick={handleLogout}
    //         variant={"outline"}
    //       >
    //         Logout
    //       </Button>
    //     ) : null}
    //   </div>
    // </div>
    <div className="relative max-md:pl-6 max-md:pr-3 md:max-w-[80vw] w-full">
      <div className="w-full max-md:h-16 md:h-20 flex flex-row justify-between">
        <div className="h-full flex flex-col justify-center">
          <a href="/home" className="md:text-2xl max-md:text-xl font-extrabold">
            Resume.
          </a>
        </div>

        {user && (
          <div className="h-full flex flex-col justify-center max-md:w-16 md:w-20 p-3">
            {/* {user ? (
          <Button
            className={
              "hover:cursor-pointer hover:bg-gray-900 hover:text-white"
            }
            onClick={handleLogout}
            variant={"outline"}
          >
            Logout
          </Button>
        ) : null} */}
            <div
              onClick={() => {
                setIsDropdownShowing(!isDropdownShowing);
              }}
              className="hover:cursor-pointer rounded-full h-full bg-slate-900 text-white flex items-center justify-center"
            >
              <span className="text-2xl font-extrabold">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {!user && (
          <div className="h-full flex flex-col justify-center p-3">
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
        )}
      </div>

      {isDropdownShowing && (
        <div className="absolute text-sm md:right-0 max-md:right-3 bg-white w-[200px] z-3 shadow-xs px-4 py-4">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row space-x-3">
              <User2 />
              <a>{user.fullName}</a>
            </div>

            <div className="flex flex-row space-x-3">
              <AtSign />
              <a>{user.username}</a>
            </div>

            <div className="hover:cursor-pointer flex flex-row space-x-3">
              <LogOut />
              <a className={""} onClick={handleLogout} variant={"outline"}>
                Logout
              </a>
            </div>
          </div>
        </div>
      )}

      {isDropdownShowing && (
        <div
          onClick={() => setIsDropdownShowing(!isDropdownShowing)}
          className="fixed inset-0 z-2"
        />
      )}
    </div>
  );
};

export default Navbar;

import { Mail } from "lucide-react";
import React from "react";

const VerifyEmail = () => {
  return (
    <div className="border-1 p-10 m-10 text-center rounded-xl border-slate-400 bg-slate-300 text-slate-800 flex flex-col items-center gap-y-6">
      <Mail />
      <p>
        Please check your Email, We've sent you an email to verify your email.
      </p>
    </div>
  );
};

export default VerifyEmail;

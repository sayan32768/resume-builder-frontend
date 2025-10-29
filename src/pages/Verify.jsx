import axios from "axios";
import { Cross, Mail, VerifiedIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const Verify = () => {
  console.log("HEHEHEHEHEHEH");
  const { token } = useParams();

  const [status, setStatus] = useState("Verifying");

  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `${API_BASE_URL}/user/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          setStatus("Email Verified Successfully");
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 2000);
        } else {
          setStatus("Invalid or Expired Token");
        }
      } catch (error) {
        console.log(error);
        toast.error(
          error.response?.data?.message ||
            "Verification Failed, Please try Again."
        );
        setStatus("Verification Failed, Please try Again");
      }
    };
    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="border-1 p-10 m-10 text-center rounded-xl border-slate-400 bg-slate-300 text-slate-800 flex flex-col items-center gap-y-6">
      {status === "Email Verified Successfully" ? <VerifiedIcon /> : <X />}
      <p>{status}</p>
    </div>
  );
};

export default Verify;

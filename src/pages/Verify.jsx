import axios from "axios";
import React, { useEffect, useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Verify = () => {
  console.log("HEHEHEHEHEHEH");
  const { token } = useParams();

  const [status, setStatus] = useState("Verifying");

  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `/user/verify`,
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

  return <div>{status}</div>;
};

export default Verify;

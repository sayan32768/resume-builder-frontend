import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_URL;

function ResumeCreator() {
  const navigate = useNavigate();
  const effectRan = useRef(false);

  const [searchParams] = useSearchParams();
  const resumeType = searchParams.get("type");

  if (!["Classic", "Modern"].includes(resumeType)) {
    return (
      <div className="border-1 p-10 m-10 text-center rounded-xl border-slate-400 bg-slate-300 text-slate-800 flex flex-col items-center gap-y-6">
        <X />
        <p>{"Some error occurred!"}</p>
      </div>
    );
  }

  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;

    const createDraft = async () => {
      console.log(resumeType);

      const res = await fetch(`${API_BASE_URL}/resume/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeType, resumeTitle: "" }),
        credentials: "include",
      });

      //   await new Promise((resolve) => setTimeout(resolve, 3000));

      const data = await res.json();

      console.log(data);

      navigate(`/edit/${data.data._id}`, { replace: true });
    };

    createDraft();
  }, [navigate, resumeType]);

  return (
    <div className="flex flex-col items-center justify-center p-10 m-10 border border-slate-400 bg-slate-300 text-slate-800 rounded-xl gap-6">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-slate-700 border-slate-500 rounded-full animate-spin"></div>
      </div>
      <p className="text-lg font-medium">Creating your resume...</p>
    </div>
  );
}

export default ResumeCreator;

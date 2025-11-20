import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const ResumeGenerator = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadAndProcess = async () => {
    if (!file) {
      toast.error("Please upload a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);

    try {
      const processRes = await axios.post(
        `${API_BASE_URL}/resume/processResume`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (processRes.status !== 200) {
        toast.error("Resume processing failed!");
        setLoading(false);
        navigate(`/edit/${id}`, { replace: true });
        return;
      }

      const resumeData = { ...processRes.data.resume };

      if ("resumeType" in resumeData) {
        delete resumeData.resumeType;
      }

      const saveRes = await axios.put(
        `${API_BASE_URL}/resume/${id}`,
        resumeData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (saveRes.data.success) {
        toast.success(
          "We have pre-filled some details for you. Please check carefully all the details"
        );
      } else {
        toast.error("Failed to save processed resume");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while processing resume");
    } finally {
      setLoading(false);
      navigate(`/edit/${id}`, { replace: true });
    }
  };

  const startAfresh = () => {
    setFile(null);
    navigate(`/edit/${id}`, { replace: true });
  };

  return loading ? (
    <div className="flex flex-col items-center justify-center p-10 m-10 border border-slate-400 bg-slate-300 text-slate-800 rounded-xl gap-6">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-slate-700 border-slate-500 rounded-full animate-spin"></div>
      </div>
      <p className="text-lg font-medium">
        Sit back, relax, let our AI do its job...
      </p>
    </div>
  ) : (
    <div className="w-full min-h-[90vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-lg p-6 shadow-md bg-slate-100 border border-slate-300">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-2xl font-semibold text-slate-900">
            Generate From a Previous Resume
          </CardTitle>
          <CardDescription className="text-center text-slate-600 leading-relaxed">
            Upload your existing resume (PDF). We’ll extract the details and
            pre-fill everything for you.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 mt-2">
          <label
            className="
          flex flex-col items-center justify-center 
          border border-slate-300 border-dashed 
          bg-slate-200/50 
          rounded-xl py-10 px-6 cursor-pointer
          hover:bg-slate-200 hover:border-slate-500 
          transition-colors text-center
        "
          >
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="mb-3 text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 mx-auto text-slate-500"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path d="M12 16V4m0 0L7 9m5-5l5 5" />
                <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
              </svg>
            </div>

            <p className="text-slate-700 font-medium text-lg">
              Upload a resume
            </p>
            <p className="text-sm text-slate-500">PDF only • click to browse</p>

            {file && (
              <p className="text-sm mt-4 text-slate-900 font-medium">
                Selected: {file.name}
              </p>
            )}
          </label>

          <div className="flex flex-col space-y-3">
            <Button
              className="w-full bg-slate-900 text-white hover:bg-slate-800 py-5 text-base hover:cursor-pointer"
              disabled={loading || !file}
              onClick={uploadAndProcess}
            >
              {loading ? "Processing..." : "Generate Resume ✨"}
            </Button>

            <div className="text-center text-sm text-slate-500">or</div>

            <Button
              variant="outline"
              className="w-full border-slate-400 text-slate-700 hover:bg-slate-200 py-4 hover:cursor-pointer"
              onClick={startAfresh}
            >
              I Want to Start Afresh
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeGenerator;

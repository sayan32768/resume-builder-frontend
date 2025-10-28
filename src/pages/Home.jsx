import React, { useEffect, useState } from "react";
import resumeImg from "../assets/resume1.png";
import resumeImg2 from "../assets/resume2.png";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, MoreVertical } from "lucide-react";
import { getData } from "@/contexts/UserContext";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const Home = () => {
  const { user } = getData();

  const navigate = useNavigate();

  const [pastResumes, setPastResumes] = useState([]);

  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const getResumeData = async () => {
      setDataLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const res = await axios.get("/resume/all", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.data.success) {
          setDataLoading(false);
          toast.error(res.data.message || "Couldn't fetch past resumes");
        } else {
          setDataLoading(false);
          setPastResumes(res.data.data);
        }
      } catch (error) {
        setDataLoading(false);
        // toast.error("Couldn't get past resumes");
      } finally {
        setDataLoading(false);
      }
    };

    getResumeData();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `/user/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        navigate("/", { replace: true });
        toast.success("Logged out successfully");
      } else {
        toast.error("Could not log out");
      }
    } catch (error) {
      toast.error("Could not log out");
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center">
      <Navbar user={user} handleLogout={handleLogout} />

      <h1 className="text-lg font-semibold text-center mb-8 mt-6">
        Choose a template to get started
      </h1>

      <div className="flex max-md:flex-col md:flex-row justify-center items-center gap-x-4 gap-y-6">
        <div className="flex flex-col gap-y-3">
          <div
            onClick={() => navigate(`/create?type=Modern`)}
            className="hover:cursor-pointer rounded-[8px] relative group md:mx-2 max-md:my-2 w-[250px] aspect-[8.5/11] border-1 border-slate-500 overflow-hidden transition-all duration-300 p-[0px]"
          >
            <img
              className="rounded-[8px] w-full h-full object-cover shadow-2xl"
              src={resumeImg2}
              alt="Resume Preview"
            />
            <div className="absolute inset-[0px] bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all duration-300">
              <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Continue
              </span>
            </div>
          </div>

          <h1 className="text-center">Modern</h1>
        </div>

        <div className="flex flex-col gap-y-3">
          <div
            onClick={() => navigate(`/create?type=Classic`)}
            className="rounded-[8px] hover:cursor-pointer relative group md:mx-2 max-md:my-2 w-[250px] aspect-[8.5/11] border-1 border-slate-500 overflow-hidden transition-all duration-300 p-[0px]"
          >
            <img
              className="rounded-[8px] w-full h-full object-cover shadow-md"
              src={resumeImg}
              alt="Resume Preview"
            />

            <div className="absolute inset-[0px] bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all duration-300">
              <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Continue
              </span>
            </div>
          </div>
          <h1 className="text-center">Classic</h1>
        </div>
      </div>
      {pastResumes.length !== 0 ? (
        <div id="previously-saved-resumes-section">
          <Card className="w-full md:max-w-[80vw] border-0 rounded-sm shadow-none">
            <CardContent className="max-md:p-8">
              <h2 className="text-lg font-semibold text-center max-md:my-8 md:mt-10 md:mb-8">
                Your Resumes
              </h2>
              {/* <div className="grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> */}
              <div className="flex flex-row gap-x-3 gap-y-3 justify-center flex-wrap">
                {/* Loadder no need */}
                {dataLoading
                  ? [1, 2, 3, 4].map((_, idx) => (
                      <div key={idx} className="flex items-center space-x-4">
                        <Skeleton className="bg-gray-300 h-8 w-8 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="bg-gray-300 h-4 w-[250px]" />
                          <Skeleton className="bg-gray-300 h-4 w-[200px]" />
                        </div>
                      </div>
                    ))
                  : pastResumes.map((doc, index) => (
                      <div
                        onClick={() => navigate(`/edit/${doc._id}`)}
                        key={index}
                        className="w-[300px] hover:cursor-pointer relative flex flex-col bg-white shadow-sm border border-slate-500 rounded-lg p-6 hover:shadow-lg hover:border-2"
                      >
                        <div className="flex items-center mb-4">
                          <div className="w-6">
                            <FileText />
                          </div>
                          <div className="flex flex-row justify-between w-full">
                            <h5 className="truncate ml-3 text-slate-800 text-l font-semibold">
                              {doc.resumeTitle || ""}
                            </h5>
                            <h5 className="ml-3 text-slate-800 text-sm font-semibold pr-6">
                              {doc.resumeType}
                            </h5>
                          </div>
                        </div>
                        <h2>Modified at</h2>
                        <p className="block text-slate-800 leading-normal font-light mb-4">
                          {new Date(doc.updatedAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="mb-10"></div>
      )}
      <div className="md:pt-10 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Home;

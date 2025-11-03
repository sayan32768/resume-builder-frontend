import React, { useEffect, useState } from "react";
import resumeImg from "../assets/resume1.png";
import resumeImg2 from "../assets/resume2.png";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, MoreVertical, Trash } from "lucide-react";
import { getData } from "@/contexts/UserContext";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const { user, setUser } = getData();

  const navigate = useNavigate();

  const [pastResumes, setPastResumes] = useState([]);

  const [dataLoading, setDataLoading] = useState(true);

  const [open, setOpen] = useState(0);

  useEffect(() => {
    const getResumeData = async () => {
      setDataLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const res = await axios.get(`${API_BASE_URL}/resume/all`, {
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
        `${API_BASE_URL}/user/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        navigate("/");
        await new Promise((resolve) => setTimeout(resolve, 10));
        setUser(null);
        toast.success("Logged out successfully");
      } else {
        toast.error("Could not log out");
      }
    } catch (error) {
      toast.error("Could not log out");
    }
  };

  const deleteResume = async (id) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/resume/delete/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        const updatedResumes = pastResumes.filter(
          (resume) => resume._id !== id
        );
        setPastResumes(updatedResumes);
        toast.success("Resume successfully deleted");
      } else {
        toast.error("Could not delete resume");
      }
    } catch (error) {
      console.log(error);
      toast.error("Could not delete resume");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center">
          <Navbar user={user} handleLogout={handleLogout} />

          <h1 className="text-lg text-center max-md:mb-2 md:mb-4 mt-4 font-bold mx-6">
            Choose a template to get started
          </h1>

          <div className="flex max-md:flex-col md:flex-row justify-center items-center gap-x-4 gap-y-6">
            <div className="flex flex-col gap-y-3">
              <div
                onClick={() => navigate("/create?type=Modern")}
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
                onClick={() => navigate("/create?type=Classic")}
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

          <div id="previously-saved-resumes-section">
            <h2 className="text-lg text-center max-md:mt-12 md:mt-16 mb-4 font-bold px-6">
              Your Resumes
            </h2>

            <div className="md:max-w-[80vw] max-md:px-6 grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {dataLoading ? (
                [1, 2, 3, 4].map((_, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <Skeleton className="bg-gray-300 h-8 w-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="bg-gray-300 h-4 w-[180px]" />
                      <Skeleton className="bg-gray-300 h-4 w-[180px]" />
                    </div>
                  </div>
                ))
              ) : pastResumes.length === 0 ? (
                <div className="text-center">No resume found</div>
              ) : (
                pastResumes.map((doc, index) => (
                  <div
                    key={index}
                    className="max-lg:w-[300px] lg:w-[265px] hover:cursor-pointer flex flex-col bg-white shadow-sm border border-slate-500 rounded-lg hover:shadow-lg hover:bg-slate-50"
                  >
                    <div
                      className="p-5 relative h-40"
                      onClick={() => navigate(`/edit/${doc._id}`)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-slate-700" />
                          <h5
                            className="truncate max-w-[150px] text-slate-800 text-base font-semibold"
                            title={doc.resumeTitle || "Untitled"}
                          >
                            {doc.resumeTitle || "Untitled"}
                          </h5>
                        </div>

                        <h5 className="text-slate-700 text-sm font-medium bg-slate-100 rounded-md px-2 py-1">
                          {doc.resumeType || "Type"}
                        </h5>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-200">
                        <div>
                          <h2 className="text-xs text-slate-500 uppercase tracking-wide">
                            Modified
                          </h2>
                          <p className="text-sm text-slate-700 font-light">
                            {new Date(doc.updatedAt).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpen(doc._id);
                          }}
                          className="bg-slate-200 hover:text-white hover:bg-red-700 hover:cursor-pointer text-black rounded-lg p-2 ml-2"
                        >
                          <Trash className="w-4 h-4" />
                        </div>
                      </div>
                      <div
                        className={`absolute bottom-0 left-0 w-full h-10 rounded-b-lg p-3 ${
                          open === doc._id ? "bg-red-500/30" : ""
                        }`}
                      >
                        {open === doc._id && (
                          <div className="flex flex-row justify-between w-full items-center h-full">
                            <div
                              className={`flex-1 text-sm font-medium text-red-900`}
                            >
                              Delete resume?
                            </div>

                            <div className="flex flex-1 flex-row gap-3 w-full">
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteResume(doc._id);
                                }}
                                className="p-1 px-3 text-xs bg-white border-1 border-slate-400 flex-1 rounded-sm hover:outline-2 hover:outline-white text-center"
                              >
                                Yes
                              </div>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpen(0);
                                }}
                                className="p-1 px-3 text-xs bg-white border-1 border-slate-400 flex-1 rounded-sm hover:outline-2 hover:outline-white text-center"
                              >
                                No
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-md:mt-12 md:mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Home;

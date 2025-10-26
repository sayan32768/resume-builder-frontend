import React, { useEffect, useState } from "react";
import resumeImg from "../assets/resume1.png";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, MoreVertical } from "lucide-react";
import { getData } from "@/contexts/UserContext";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { user } = getData();

  const navigate = useNavigate();

  const [pastResumes, setPastResumes] = useState(null);

  const [dataLoading, setDataLoading] = useState(true);

  // Change here
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
        toast.error("Couldn't get past resumes");
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

  return dataLoading ? null : (
    <>
      <div className="bg-gray-100">
        <div className="flex flex-col max-md:mx-8 md:mx-30 lg:mx-50">
          <div
            id="add-new-resume-section"
            className="flex flex-col w-full max-md:space-y-2 md:space-y-6 mt-4 lg:mt-8 items-center"
          >
            <div className="flex flex-col w-fit max-md:space-y-2 md:space-y-6">
              <h1 className="max-md:text-lg md:text-xl lg:text-2xl font-semibold ml-3 text-left max-md:mt-3 md:mt-3">
                Welcome to Resume, {user.username}
              </h1>

              <Button onClick={handleLogout} variant={"outline"}>
                Logout
              </Button>

              <h1 className="max-md:text-lg md:text-xl lg:text-2xl font-semibold ml-3 text-left max-md:mt-3 md:mt-3">
                Choose a Resume Template
              </h1>

              <div className="flex max-md:flex-col md:flex-row justify-start items-center">
                <h1>Modern</h1>
                <div
                  onClick={() => navigate(`/create?type=Modern`)}
                  className="relative group md:mx-2 max-md:my-2 w-[330px] aspect-[8.5/11] border-2 border-transparent hover:border-black overflow-hidden transition-all duration-300 p-[6px]"
                >
                  <img
                    className="w-full h-full object-cover shadow-md"
                    src={resumeImg}
                    alt="Resume Preview"
                  />
                  <div className="absolute inset-[6px] bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all duration-300">
                    <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Continue
                    </span>
                  </div>
                </div>

                <h1>Classic</h1>
                <div
                  onClick={() => navigate(`/create?type=Classic`)}
                  className="relative group md:mx-2 max-md:my-2 w-[330px] aspect-[8.5/11] border-2 border-transparent hover:border-black overflow-hidden transition-all duration-300 p-[6px]"
                >
                  <img
                    className="w-full h-full object-cover shadow-md"
                    src={resumeImg}
                    alt="Resume Preview"
                  />

                  <div className="absolute inset-[6px] bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all duration-300">
                    <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Continue
                    </span>
                  </div>
                </div>
              </div>

              <div id="previously-saved-resumes-section">
                {/* <h1 className="max-md:text-lg md:text-xl  lg:text-2xl font-semibold ml-3 text-left max-md:mt-3 md:mt-3">
                  Your Past Templates
                </h1> */}

                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-2 my-5">
                  <div className="relative overflow-hidden bg-green-300 aspect-[1/1] w-[px]">
                    <img
                      className="w-full h-full object-cover shadow-md"
                      src={resumeImg}
                      alt="Resume Preview"
                    />
                  </div>

                  <div className="relative overflow-hidden bg-green-300 aspect-[1/1] w-[330px]">
                    <img
                      className="w-full h-full object-cover shadow-md"
                      src={resumeImg}
                      alt="Resume Preview"
                    />
                  </div>

                  <div className="relative overflow-hidden bg-green-300 aspect-[1/1] w-[330px]">
                    <img
                      className="w-full h-full object-cover shadow-md"
                      src={resumeImg}
                      alt="Resume Preview"
                    />
                  </div>

                  <div className="relative overflow-hidden bg-green-300 aspect-[1/1] w-[330px]">
                    <img
                      className="w-full h-full object-cover shadow-md"
                      src={resumeImg}
                      alt="Resume Preview"
                    />
                  </div>
                </div> */}

                <Card className="w-full max-w-2xl p-0 border-0 rounded-sm shadow-none">
                  <CardContent className="p-4">
                    <h2 className="text-lg font-semibold mb-3">
                      Your Past Templates
                    </h2>
                    <div className="flex flex-col divide-y">
                      {pastResumes.map((doc, index) => (
                        <div
                          onClick={() => navigate(`/edit/${doc._id}`)}
                          key={index}
                          className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-md px-2 transition-colors border-0"
                        >
                          {/* Left: Icon + Name */}
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md">
                              <FileText className="w-5 h-5 text-gray-600" />
                            </div>
                            <span className="font-medium text-gray-800">
                              {doc.resumeType}
                            </span>
                          </div>

                          {/* Right: Modified Date + More icon */}
                          <div className="flex items-center space-x-3 text-gray-500">
                            <span className="text-sm">
                              {new Date(doc.updatedAt).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            <MoreVertical className="w-5 h-5 cursor-pointer hover:text-gray-700" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

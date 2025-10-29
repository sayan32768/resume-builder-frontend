import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PersonalForm from "../components/forms/PersonalForm";
import EducationDetailsForm from "../components/forms/EducationDetailsForm";
import { resumeSchema } from "@/schemas/resume.schema";
import { Button } from "../components/ui/button";
import { SkillsForm } from "../components/forms/SkillsForm";
import ProfessionalExperienceForm from "../components/forms/ProfessionalExperienceForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import OtherExperienceForm from "../components/forms/OtherExperienceForm";
import CertificationForm from "../components/forms/CertificationForm";
import { useReactToPrint } from "react-to-print";
import ResumePreview from "../components/common/ResumePreview";
import {
  replace,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft, Cross, MenuIcon, X } from "lucide-react";
import SlidingSidebar from "@/components/common/SlidingSidebar";
import ResumePreview2 from "@/components/common/ResumePreview2";
import Navbar from "@/components/common/Navbar";
import { FaBackward } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import generatePDF from "react-to-pdf";
import { getData } from "@/contexts/UserContext";
import { v4 as uuidv4 } from "uuid";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const ResumeForm = () => {
  // localStorage.removeItem(
  //   "resume_draft",
  //   JSON.stringify(localStorage.getItem("resume_draft"))
  // );

  const [backdrop, setBackdrop] = useState(false);

  const stepNames = [
    { id: 1, title: "Personal" },
    { id: 2, title: "Education" },
    { id: 3, title: "Skills" },
    { id: 4, title: "Experience" },
    { id: 5, title: "Projects" },
    { id: 6, title: "Other Exp" },
    { id: 7, title: "Certifications" },
  ];

  const stepKeys = [
    "personalDetails",
    "educationDetails",
    "skills",
    "professionalExperience",
    "projects",
    "otherExperience",
    "certifications",
  ];

  const { user } = getData();

  const [step, setStep] = useState(1);

  const types = ["Classic", "Modern"];

  const { resumeId } = useParams();

  const navigate = useNavigate();

  const resumeRef = useRef(null);

  const [searchParams] = useSearchParams();

  const [type, setType] = useState(searchParams.get("type"));

  const [showSidebar, setShowSidebar] = useState(false);

  const openModal = () => {
    setShowSidebar(!showSidebar);
  };
  const reactToPrintFn = useReactToPrint({
    contentRef: resumeRef,
  });

  const [downloading, setDownloadLoading] = useState(false);

  const downloadPDF = async (htmlContent) => {
    setDownloadLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/resume/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ htmlContent }),
        credentials: "include",
      });

      if (response.status !== 200) {
        setDownloadLoading(false);
        toast.error("Error generating PDF");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${user.fullName
        .replace(/\s+/g, "")
        .toLowerCase()}-resume-${uuidv4()}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setDownloadLoading(false);
      toast.error("Error generating PDF");
    } finally {
      setDownloadLoading(false);
    }
  };

  const methods = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: resumeSchema.parse({}),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!resumeId) return;

    const fetchResume = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`${API_BASE_URL}/resume/${resumeId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setLoading(false);
          setType(res.data.data.resumeType);
          const { resumeType, ...newData } = res.data.data;

          const parsed = newData;

          if (
            parsed.professionalExperience &&
            Array.isArray(parsed.professionalExperience)
          ) {
            parsed.professionalExperience.forEach((exp) => {
              if (exp.dates?.startDate) {
                exp.dates.startDate = new Date(exp.dates.startDate);
              }
              if (exp.dates?.endDate) {
                exp.dates.endDate = new Date(exp.dates.endDate);
              }
            });
          }

          if (parsed.otherExperience && Array.isArray(parsed.otherExperience)) {
            parsed.otherExperience.forEach((exp) => {
              if (exp.dates?.startDate) {
                exp.dates.startDate = new Date(exp.dates.startDate);
              }
              if (exp.dates?.endDate) {
                exp.dates.endDate = new Date(exp.dates.endDate);
              }
            });
          }

          if (
            parsed.educationDetails &&
            Array.isArray(parsed.educationDetails)
          ) {
            parsed.educationDetails.forEach((edu) => {
              if (edu.dates?.startDate) {
                edu.dates.startDate = new Date(edu.dates.startDate);
              }
              if (edu.dates?.endDate) {
                edu.dates.endDate = new Date(edu.dates.endDate);
              }
            });
          }

          if (parsed.certifications && Array.isArray(parsed.certifications)) {
            parsed.certifications.forEach((cert) => {
              if (cert.issueDate) {
                cert.issueDate = new Date(cert.issueDate);
              }
            });
          }

          methods.reset(parsed);
        } else {
          setLoading(false);
          toast.error("Failed to fetch resume");
        }
      } catch (err) {
        setLoading(false);
        toast.error("Failed to fetch resume");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      if (!resumeId) {
        localStorage.setItem("resume_draft", JSON.stringify(value));
      }
    });

    return () => subscription.unsubscribe();
  }, [methods, resumeId]);

  useEffect(() => {
    if (resumeId) return;

    const savedData = localStorage.getItem("resume_draft");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);

        if (
          parsed.professionalExperience &&
          Array.isArray(parsed.professionalExperience)
        ) {
          parsed.professionalExperience.forEach((exp) => {
            if (exp.dates?.startDate) {
              exp.dates.startDate = new Date(exp.dates.startDate);
            }
            if (exp.dates?.endDate) {
              exp.dates.endDate = new Date(exp.dates.endDate);
            }
          });
        }

        if (parsed.otherExperience && Array.isArray(parsed.otherExperience)) {
          parsed.otherExperience.forEach((exp) => {
            if (exp.dates?.startDate) {
              exp.dates.startDate = new Date(exp.dates.startDate);
            }
            if (exp.dates?.endDate) {
              exp.dates.endDate = new Date(exp.dates.endDate);
            }
          });
        }

        if (parsed.educationDetails && Array.isArray(parsed.educationDetails)) {
          parsed.educationDetails.forEach((edu) => {
            if (edu.dates?.startDate) {
              edu.dates.startDate = new Date(edu.dates.startDate);
            }
            if (edu.dates?.endDate) {
              edu.dates.endDate = new Date(edu.dates.endDate);
            }
          });
        }

        if (parsed.certifications && Array.isArray(parsed.certifications)) {
          parsed.certifications.forEach((cert) => {
            if (cert.issueDate) {
              cert.issueDate = new Date(cert.issueDate);
            }
          });
        }

        methods.reset(parsed);
      } catch (err) {
        console.error("Failed to load draft:", err);
      }
    }
  }, [resumeId, methods]);

  const [modal, showModal] = useState(false);

  const showNameModal = () => {};

  const onSubmit = async (data) => {
    let allValid = true;

    for (const key of stepKeys) {
      const isValid = await methods.trigger(key);
      if (!isValid) {
        allValid = false;
      }
    }

    if (!allValid) {
      toast.error("Errors exist in your form, please recheck all the errors");
      return;
    }

    data = { ...data, resumeType: type };
    console.log("Final Resume Data", data);

    try {
      if (!resumeId) {
        const res = await axios.post(`${API_BASE_URL}/resume/create`, data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.data.success) {
          localStorage.removeItem("resume_draft");
          navigate("/home", { replace: true });
          toast.success("Successfully created resume");
        } else {
          toast.error("Some error occurrred, try again");
        }
      } else {
        console.log(data);
        const res = await axios.put(
          `${API_BASE_URL}/resume/${resumeId}`,
          data,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.data.success) {
          localStorage.removeItem("resume_draft");
          navigate("/home", { replace: true });
          toast.success("Successfully updated resume");
        } else {
          toast.error("Some error occurrred, try again");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    }
  };

  if (loading) {
    return (
      <div className="w-full h-1 bg-gray-200 rounded overflow-hidden relative">
        <div className="absolute top-0 left-0 h-1 w-1/3 bg-black animate-[loading_1.5s_linear_infinite]"></div>
        <style>
          {`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}
        </style>
      </div>
    );
  }

  if (!types.includes(type))
    return (
      <div className="border-1 p-10 m-10 text-center rounded-xl border-slate-400 bg-slate-300 text-slate-800 flex flex-col items-center gap-y-6">
        <X />
        <p>Error Occurred</p>
      </div>
    );

  return (
    <FormProvider {...methods}>
      <SlidingSidebar
        setStep={setStep}
        step={step}
        show={showSidebar}
        onClose={() => setShowSidebar(false)}
      />

      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {modal && (
          <div
            onClick={() => showModal(false)}
            className="fixed inset-0 z-10 flex items-center justify-center bg-black/60"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-10 rounded-sm shadow-lg w-full max-w-lg mx-4 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <Label className="text-sm">Enter name</Label>
                <Input
                  {...methods.register("resumeTitle", {
                    required: "Title is required",
                  })}
                />
                {methods.formState.errors.resumeTitle && (
                  <p className="pb-2 text-red-900">
                    {methods.formState.errors.resumeTitle.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={methods.formState.isSubmitting}
                className="bg-gray-900 text-white flex-1 hover:cursor-pointer"
              >
                {methods.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        )}

        <div className="md:hidden">
          <div
            className="h-1 bg-black"
            style={{
              width: `${(step / stepNames.length) * 100}%`,
            }}
          />
        </div>

        <div className="flex flex-col items-center w-full pt-8 max-md:hidden">
          <div className="flex justify-between w-full max-w-3xl relative">
            {stepNames.map((s, index) => (
              <div
                onClick={async (e) => {
                  e.preventDefault();

                  if (s.id <= step) {
                    setStep(s.id);
                    return;
                  }

                  let allValid = true;
                  let id = s.id - 1;

                  for (let i = 0; i < s.id; i++) {
                    const isValid = await methods.trigger(stepKeys[i]);
                    console.log(id);
                    if (!isValid) {
                      toast.error("Please fill in all the necessary Details");
                      allValid = false;
                      id = i;
                      break;
                    }
                  }

                  setStep(id + 1);
                }}
                key={s.id}
                className="flex flex-col items-center flex-1"
              >
                <button
                  className={`hover:cursor-pointer w-8 h-8 rounded-full flex items-center justify-center
            ${
              s.id === step
                ? "bg-black text-white"
                : s.id < step
                ? "bg-black text-white"
                : "bg-gray-200"
            }
          `}
                >
                  {s.id}
                </button>
                <div className="text-md font-bold mt-2 text-center">
                  {stepNames[index].title}
                </div>
              </div>
            ))}

            <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 -z-10">
              <div
                className="h-1 bg-black"
                style={{
                  width: `${(step / stepNames.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex lg:flex-row max-lg:flex-col lg:items-start items-center justify-center lg:gap-x-8 lg:px-14 lg:pt-14 max-lg:pt-8 max-lg:px-8 max-lg:gap-y-6 mb-8">
          <div className="lg:max-w-[594px] md:w-[90%] max-md:w-full">
            <div
              onClick={() => navigate("/home")}
              className="hover:cursor-pointer hover:text-slate-600 flex flex-row pb-8 w-fit"
            >
              <div className="flex flex-row gap-x-3">
                <ArrowLeft />
                <div>Go back to home</div>
              </div>
            </div>

            <div>
              <div className="flex flex-row justify-between">
                <div
                  onClick={openModal}
                  className="md:hidden relative border-2 w-12 h-12 mb-6 rounded-xl hover:cursor-pointer"
                >
                  <MenuIcon className="absolute mx-[22%] my-[22%]" />
                </div>

                <div className="flex flex-row gap-3">
                  <Button
                    className={
                      "md:hidden hover:cursor-pointer hover:bg-gray-900 hover:text-white"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setBackdrop(true);
                    }}
                    variant={"outline"}
                  >
                    Show Preview
                  </Button>
                </div>
              </div>

              {step === 7 ? (
                <div className="flex flex-row gap-3 mb-6">
                  <Button
                    variant={"outline"}
                    className={
                      "hover:bg-slate-900 hover:text-white hover:cursor-pointer flex-1"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      reactToPrintFn();
                    }}
                  >
                    Print
                  </Button>
                  <Button
                    disabled={downloading}
                    variant={"outline"}
                    className={
                      "hover:bg-slate-900 hover:text-white hover:cursor-pointer flex-1"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      // generatePDF(resumeRef, { filename: "page.pdf" });
                      const code = document.getElementById("resume-preview");
                      downloadPDF(code.innerHTML);
                    }}
                  >
                    {downloading ? "Working..." : "Download as PDF"}
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>

            {step === 1 && <PersonalForm />}
            {step === 2 && <EducationDetailsForm />}
            {step === 3 && <SkillsForm />}
            {step === 4 && <ProfessionalExperienceForm />}
            {step === 5 && <ProjectsForm />}
            {step === 6 && <OtherExperienceForm />}
            {step === 7 && <CertificationForm />}

            <div className="flex gap-x-3 justify-between pt-4">
              {step > 1 && (
                <Button
                  className={
                    "bg-gray-900 text-white flex-1 hover:cursor-pointer"
                  }
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              )}
              {step < 7 ? (
                <Button
                  type="button"
                  className={
                    "bg-gray-900 text-white flex-1 hover:cursor-pointer"
                  }
                  onClick={async (e) => {
                    e.preventDefault();
                    const valid = await methods.trigger(stepKeys[step - 1]);
                    if (valid) {
                      setStep((s) => s + 1);
                    } else {
                      toast.error("Please check all the errors");
                    }
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={async (e) => {
                    e.preventDefault();
                    let allValid = true;

                    for (const key of stepKeys) {
                      const isValid = await methods.trigger(key);
                      if (!isValid) {
                        allValid = false;
                      }
                    }

                    if (!allValid) {
                      toast.error(
                        "Errors exist in your form, please recheck all the errors"
                      );
                      return;
                    }
                    showModal(true);
                  }}
                  className={
                    "bg-gray-900 text-white flex-1 hover:cursor-pointer"
                  }
                >
                  Submit
                </Button>
              )}
            </div>
          </div>

          {backdrop && (
            <div
              onClick={(e) => {
                e.preventDefault();
                setBackdrop(false);
              }}
              className="fixed inset-0 bg-white md:hidden text-center"
            >
              {/* <div className="relative mt-7">Click anywhere to close</div> */}
            </div>
          )}

          <div
            className={`max-md:absolute top-0 z-5 max-md:${
              backdrop ? "block" : "hidden"
            }`}
          >
            <div className="relative my-8 w-full text-center md:hidden">
              This is what your resume will look like
            </div>
            <div className="md:w-[calc(210mm*0.7)] md:h-[calc(297mm*0.7)] max-md:w-[calc(210mm*0.44)] max-md:h-[calc(297mm*0.44)]">
              <div className="w-[210mm] h-[297mm] md:scale-[0.7] max-md:scale-[0.44] origin-top-left outline-1">
                <div id="resume-preview" ref={resumeRef}>
                  {type == "Modern" ? <ResumePreview2 /> : <ResumePreview />}
                </div>
              </div>
            </div>
            <div className="relative flex flex-col px-10 md:hidden">
              <Button
                className={
                  "md:hidden hover:cursor-pointer hover:bg-gray-900 hover:text-white my-8"
                }
                onClick={(e) => {
                  e.preventDefault();
                  setBackdrop(false);
                }}
                variant={"outline"}
              >
                Close Preview
              </Button>
            </div>
          </div>
        </div>
        {methods.formState.errors?.root && <div>Some error occurred</div>}
      </form>
    </FormProvider>
  );
};

export default ResumeForm;

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
import { ArrowLeft, MenuIcon } from "lucide-react";
import SlidingSidebar from "@/components/common/SlidingSidebar";
import ResumePreview2 from "@/components/common/ResumePreview2";
import Navbar from "@/components/common/Navbar";
import { FaBackward } from "react-icons/fa";
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

  const methods = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: resumeSchema.parse({}),
    mode: "onChange",
  });

  useEffect(() => {
    if (!resumeId) return;

    const fetchResume = async () => {
      try {
        const res = await axios.get(`/resume/${resumeId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setType(res.data.data.resumeType);
          const { resumeType, ...newData } = res.data.data;
          methods.reset(newData);
        } else {
          toast.error("Failed to fetch resume");
        }
      } catch (err) {
        toast.error("Failed to fetch resume");
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

        methods.reset(parsed);
      } catch (err) {
        console.error("Failed to load draft:", err);
      }
    }
  }, [resumeId, methods]);

  const onSubmit = async (data) => {
    data = { ...data, resumeType: type };
    console.log("Final Resume Data", data);

    try {
      if (!resumeId) {
        const res = await axios.post("/resume/create", data, {
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
        const res = await axios.put(`/resume/${resumeId}`, data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
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

  if (!types.includes(type))
    // return (
    //   <div className="text-3xl text-gray-400 w-[100vw] h-[100vh] flex flex-col justify-center text-center">
    //     Error
    //   </div>
    // );
    return null;

  return (
    <FormProvider {...methods}>
      <SlidingSidebar
        setStep={setStep}
        step={step}
        show={showSidebar}
        onClose={() => setShowSidebar(false)}
      />
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
              <div key={s.id} className="flex flex-col items-center flex-1">
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    const valid = await methods.trigger(stepKeys[step - 1]);
                    if (valid) setStep(s.id);
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center
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
            <div className="flex flex-row justify-between">
              <div
                onClick={openModal}
                className="md:hidden relative border-2 w-12 h-12 mb-6 rounded-xl"
              >
                <MenuIcon className="absolute mx-[22%] my-[22%]" />
              </div>

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
                  className={"bg-gray-900 text-white flex-1"}
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              )}
              {step < 7 ? (
                <Button
                  type="button"
                  className={"bg-gray-900 text-white flex-1"}
                  onClick={async (e) => {
                    e.preventDefault();
                    const valid = await methods.trigger(stepKeys[step - 1]);
                    if (valid) setStep((s) => s + 1);
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  disabled={methods.formState.isSubmitting}
                  className={"bg-gray-900 text-white flex-1"}
                  type="submit"
                >
                  {methods.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
            </div>
            {step === 7 ? (
              <Button
                className={"bg-gray-900 text-white w-full mt-3"}
                onClick={(e) => {
                  e.preventDefault();
                  reactToPrintFn();
                }}
              >
                Print
              </Button>
            ) : (
              <></>
            )}
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
              <div className="w-[210mm] h-[297mm] md:scale-[0.7] max-md:scale-[0.44] origin-top-left">
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

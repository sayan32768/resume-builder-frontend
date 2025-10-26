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

const ResumeForm = () => {
  const types = ["Classic", "Modern"];

  const { resumeId } = useParams();

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

  const navigate = useNavigate();

  const resumeRef = useRef(null);

  const [searchParams] = useSearchParams();

  const [type, setType] = useState(searchParams.get("type"));

  // var type = searchParams.get("type");

  const reactToPrintFn = useReactToPrint({
    contentRef: resumeRef,
  });

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

  const methods = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: resumeSchema.parse({}),
    mode: "onChange",
  });

  const [step, setStep] = useState(1);

  const onSubmit = async (data) => {
    // await new Promise((resolve) => setTimeout(resolve, 4000));
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

  if (!types.includes(type)) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center w-full pt-8 max-md:hidden">
          <div className="flex justify-between w-full max-w-3xl relative">
            {stepNames.map((s, index) => (
              <div key={s.id} className="flex flex-col items-center flex-1">
                <button
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

        <div className="flex lg:flex-row max-lg:flex-col lg:items-start items-center justify-center lg:gap-x-8 lg:px-14 lg:pt-14 max-lg:pt-8 max-lg:px-8 max-lg:gap-y-6">
          <div className="lg:max-w-[594px] md:w-[90%] max-md:w-full">
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
            <Button
              className={"bg-gray-900 text-white w-full mt-3"}
              onClick={reactToPrintFn}
            >
              Print
            </Button>
          </div>

          <div className="flex justify-center items-start ">
            <div
              className="relative"
              style={{
                width: "calc(210mm * 0.7)",
                height: "calc(297mm * 0.7)",
              }}
            >
              <div
                className="absolute top-0 left-0 w-[210mm] h-[297mm]"
                style={{
                  transform: "scale(0.7)",
                  transformOrigin: "top left",
                }}
              >
                <div id="resume-preview" ref={resumeRef}>
                  <ResumePreview />
                </div>
              </div>
            </div>
          </div>
        </div>
        {methods.formState.errors?.root && <div>Some error occurred</div>}
      </form>
    </FormProvider>
  );
};

export default ResumeForm;

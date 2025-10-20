import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import ResumePreview from "./ui/ResumePreview";
import { useReactToPrint } from "react-to-print";

const steps = [
  {
    id: 1,
    title: "Name",
  },
  {
    id: 2,
    title: "Address",
  },
  {
    id: 3,
    title: "Review",
  },
];

const ResumeBuilder = () => {
  const resumeRef = useRef(null);

  const reactToPrintFn = useReactToPrint({
    contentRef: resumeRef,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const prev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const next = () => {
    if (currentStep < steps.length && isCurrentStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== "";
      case 2:
        return formData.address.trim() !== "";
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full pt-8">
        <div className="flex justify-between w-full max-w-3xl relative">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <button
                className={`w-8 h-8 rounded-full flex items-center justify-center
            ${
              step.id === currentStep
                ? "bg-black text-white"
                : step.id < currentStep
                ? "bg-black text-white"
                : "bg-gray-200"
            }
          `}
              >
                {step.id}
              </button>
              <div className="text-md font-bold mt-2 text-center">
                {step.title}
              </div>
            </div>
          ))}

          <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 -z-10">
            <div
              className="h-1 bg-black"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row max-lg:flex-col lg:items-start items-center justify-center lg:gap-x-8 lg:px-14 lg:pt-14 max-lg:pt-8 max-lg:px-8 max-lg:gap-y-6">
        <div className="flex flex-col bg-gray-50 md:max-w-[594px] w-full">
          <div>
            {currentStep === 1 && (
              <div className="flex flex-col gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleOnChange}
                  placeholder="Enter Your Name"
                />

                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleOnChange}
                  placeholder="Enter Your Name"
                />

                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleOnChange}
                  placeholder="Enter Your Name"
                />

                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleOnChange}
                  placeholder="Enter Your Name"
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col gap-3">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleOnChange}
                  placeholder="Enter Your Address"
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col gap-3">
                <Label>Review Your Information</Label>
                <div className="space-y-3">
                  <p>Name: {formData.name}</p>
                  <p>Address: {formData.address}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex mt-5 justify-between">
            <Button onClick={prev} disabled={currentStep === 1}>
              Prev
            </Button>
            <Button onClick={next} disabled={!isCurrentStepValid()}>
              {currentStep === 3 ? "Submit" : "Next"}
            </Button>
          </div>
        </div>

        <div className="flex justify-center items-start max-md:hidden">
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
      <Button onClick={reactToPrintFn}>Print</Button>
    </>
  );
};

export default ResumeBuilder;

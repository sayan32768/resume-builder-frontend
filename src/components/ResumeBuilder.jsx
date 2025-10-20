import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

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
      <div className="flex flex-row">
        <div className="flex flex-col pt-[150px] justify-center bg-gray-50 px-10 w-1/2">
          <h1 className="text-center">Multi Step Form</h1>

          <div className="mt-5 px-5 mb-6">
            <div className="flex justify-between">
              {steps.map((step) => (
                <div key={step.id} className="text-center">
                  <button
                    className={`w-8 h-8 rounded-full flex items-center justify-center
                            ${
                              step.id === currentStep
                                ? "bg-blue-500 text-white"
                                : step.id < currentStep
                                ? "bg-green-500 text-white"
                                : "bg-gray-200"
                            }    
                        `}
                  >
                    {step.id}
                  </button>

                  <div className="text-md font-bold mt-2">{step.title}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 bg-gray-200 w-full">
              <div
                className="h-1 bg-blue-600"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
          </div>
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

        <div className="w=1/2 pt-[150px]">
          <div className="bg-green-500 w-[46vw] h-full"></div>
        </div>
      </div>
    </>
  );
};

export default ResumeBuilder;

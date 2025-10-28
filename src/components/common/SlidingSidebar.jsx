import React from "react";
import { useFormContext } from "react-hook-form";

const SlidingSidebar = ({ show, onClose, step, setStep }) => {
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

  const { trigger } = useFormContext();

  return (
    <>
      {/* Overlay */}
      {show && (
        <div
          className="fixed inset-0 z-5 bg-black/30 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 z-5 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          {/* <h2 className="font-semibold text-lg mb-4 pl-2">Menu</h2> */}
          <ul className="space-y-3">
            {stepNames.map((stepObj) => (
              <li
                key={stepObj.id}
                onClick={async (e) => {
                  e.preventDefault();
                  const valid = await trigger(stepKeys[step - 1]);
                  if (valid) setStep(stepObj.id);
                  onClose();
                }}
                className={`cursor-pointer p-2 rounded-md transition-colors duration-200 ${
                  step === stepObj.id ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                {stepObj.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SlidingSidebar;

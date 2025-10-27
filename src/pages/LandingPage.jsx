import { Button } from "@/components/ui/button";
import React from "react";
import resumeImg from "../assets/resume-design.png";
import img1 from "../assets/resume1.png";
import img2 from "../assets/resume2.png";
import Slider from "@/components/common/Slider";
import Footer from "@/components/common/Footer";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Navbar2 from "@/components/common/Navbar2";

const LandingPage = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Tania Andrew",
      role: "Designer @ Google",
      rating: 5,
      review:
        "Creative Tim helped me solve all my design challenges quickly and affordably. Highly recommended!",
    },
    {
      name: "John Doe",
      role: "Developer @ Facebook",
      rating: 4,
      review:
        "The tools are intuitive and make my development workflow so much easier. Great support team!",
    },
    {
      name: "Sofia Lee",
      role: "Product Manager @ Amazon",
      rating: 5,
      review:
        "Amazing resources! They save me tons of time when planning product designs and prototypes.",
    },
    {
      name: "Mark Wilson",
      role: "UX Researcher @ Airbnb",
      rating: 4,
      review:
        "Very user-friendly and helpful for our team. The templates and components are top-notch!",
    },
  ];

  const featureCards = [
    {
      title: "Powerful resume builder",
      description:
        "Use our potent creation tools and expert guidance to create the perfect resume for your next job application.",
    },
    {
      title: "Professional templates",
      description:
        "Choose from 1+ applicant tracking systems (ATS)-friendly modern and professional templates.",
    },
    {
      title: "Customize fonts and colors",
      description: "Select custom fonts and colors on any resume template.",
    },
    {
      title: "Free resume examples",
      description:
        "Use our more than 500 resume examples and templates to see what a great resume looks like in your field.",
    },
    {
      title: "ATS-friendly templates",
      description:
        "Sail through applicant tracking systems with resume templates that appeal to both machines and humans.",
    },
    {
      title: "Expert tips and guidance",
      description:
        "Get help every step of the way as you build your resume with expert tips and suggested phrases.",
    },
  ];

  return (
    <div className="lg:gap-y-18 md:gap-y-16 max-md:gap-y-10 flex flex-col items-center">
      <Navbar2 />
      <div className="w-full md:max-w-[80vw] max-md:px-6 flex flex-col lg:gap-y-18 md:gap-y-16 max-md:gap-y-10 pt-10">
        <div className="flex flex-row max-md:flex-col-reverse lg:gap-x-14 md:gap-x-10 max-md:gap-y-6 pt-0 items-center">
          <div className="flex-1 flex">
            <div className="w-full max-md:hidden">
              <img
                className="object-contain  max-h-[60vh] w-full"
                src={resumeImg}
                alt="Resume Preview"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1 items-start max-md:items-center justify-center lg:text-6xl md:text-5xl max-md:text-4xl font-semibold w-full mx-auto lg:gap-10 gap-5">
            <span className="font-extrabold">Resume.</span>

            <div className="w-full md:hidden pt-0">
              <img
                className="object-scale-down h-[200px] w-full"
                src={resumeImg}
                alt="Resume Preview"
              />
            </div>

            <span className="lg:text-3xl md:text-2xl max-md:text-xl font-bold max-md:text-center">
              Your One Stop Solution For Crafting Resumes
            </span>
            <span className="font-light lg:text-xl md:text-xl max-md:text-sm max-md:text-center">
              Craft your perfect resume without the hassle. Our smart builder
              helps you fill in details section by section — personal info,
              education, skills, and experience — while showing a live preview
              of your resume in real time. Choose from modern templates,
              customize your layout, and download or print instantly. No design
              skills needed. Just your achievements — beautifully formatted.
            </span>

            <Button
              onClick={() => navigate("/home")}
              className="bg-gray-900 text-white p-6 hover:cursor-pointer"
            >
              Get Started
            </Button>
          </div>
        </div>

        <div className="grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {featureCards.map((card, index) => (
            <div
              key={index}
              className="relative flex flex-col bg-white shadow-sm border border-slate-500 rounded-lg w-full p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-6">
                  <FileText />
                </div>
                <h5 className="ml-3 text-slate-800 text-xl font-semibold">
                  {card.title}
                </h5>
              </div>
              <p className="block text-slate-600 leading-normal font-light mb-4">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:gap-y-8 md:gap-y-6 max-md:gap-y-4 pt-2">
          <h1 className="text-center lg:text-2xl md:text-2xl max-md:text-2xl">
            Choose from a wide list of design
          </h1>

          <div className="flex flex-row justify-center lg:gap-5 max-lg:gap-3">
            <div className="relative group lg:w-[25vw] max-lg:w-[30vw] aspect-[8.5/11] border-slate-500 border-1 rounded-md p-0 hover:border-black overflow-hidden transition-all duration-300">
              <img
                className="object-cover w-full rounded-sm"
                src={img1}
                alt="Resume Preview"
              />

              <div className="absolute inset-[0px] bg-black/0 group-hover:bg-black/60 flex items-center justify-center transition-all duration-300">
                <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {"Continue"}
                </span>
              </div>
            </div>
            <div className="relative group lg:w-[25vw] max-lg:w-[30vw] aspect-[8.5/11] border-slate-500 border-1 rounded-md p-0 hover:border-black overflow-hidden transition-all duration-300">
              <img
                className="object-cover w-full rounded-sm"
                src={img2}
                alt="Resume Preview"
              />
              <div className="absolute inset-[0px] bg-black/0 group-hover:bg-black/60 flex items-center justify-center transition-all duration-300">
                <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {"Continue"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:gap-y-8 md:gap-y-6 max-md:gap-y-4 pt-2">
          <h1 className="text-center lg:text-2xl md:text-2xl max-md:text-2xl">
            What users say about Resume Builder
          </h1>

          <div className="grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="flex w-full p-4 flex-col border border-slate-500 rounded-lg bg-white shadow-sm my-0"
              >
                <div className="flex items-center gap-4 text-slate-800">
                  <img
                    src={"https://avatar.iran.liara.run/public"}
                    alt={t.name}
                    className="relative inline-block h-[58px] w-[58px] rounded-full object-cover object-center"
                  />
                  <div className="flex w-full flex-col">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xl font-semibold text-slate-800">
                        {t.name}
                      </h5>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-yellow-600"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs uppercase font-bold text-slate-500 mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-base text-slate-600 font-light leading-normal">
                    {t.review}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:gap-y-8 md:gap-y-6 max-md:gap-y-4 pt-2">
          <h1 className="text-left lg:text-2xl md:text-2xl max-md:text-2xl font-medium">
            Our resumes got selected in
          </h1>

          <Slider />

          <span className="lg:text-xl md:text-xl font-light">
            Our online resume builder makes it easy to create a professional
            resume from your phone, laptop, or tablet using 2 customizable
            templates — Classic and Modern. Edit your resume directly in the
            built-in editor and download it as a PDF. Free users can quickly
            build and save their resumes without any hassle.
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;

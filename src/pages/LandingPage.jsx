import { Button } from "@/components/ui/button";
import React from "react";
import resumeImg from "../assets/resume-design.png";
import img1 from "../assets/resume1.png";
import img2 from "../assets/resume2.png";
import Slider from "@/components/common/Slider";
import Footer from "@/components/common/Footer";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="lg:gap-y-18 md:gap-y-16 max-md:gap-y-10 flex flex-col">
      <div className="lg:px-24 md:px-12 max-md:px-6 flex flex-col lg:gap-y-18 md:gap-y-16 max-md:gap-y-10 pt-10">
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
              className="bg-gray-900 text-white p-6"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* <h1 className="text-center lg:text-4xl md:text-3xl max-md:text-2xl font-bold lg:mt-5">
        Choose from a wide list of design
      </h1> */}

        <div className="grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div class="relative flex flex-col bg-white shadow-lg border border-slate-500 rounded-lg w-full p-6">
            <div class="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 text-slate-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <h5 class="ml-3 text-slate-800 text-xl font-semibold">
                Powerful resume builder
              </h5>
            </div>
            <p class="block text-slate-600 leading-normal font-light mb-4">
              Use our potent creation tools and expert guidance to create the
              perfect resume for your next job application.
            </p>
            <div>
              {/* <a
              href="#"
              class="text-slate-800 font-semibold text-sm hover:underline flex items-center"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a> */}
            </div>
          </div>

          <div class="relative flex flex-col bg-white shadow-lg border border-slate-500 rounded-lg w-full p-6">
            <div class="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 text-slate-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <h5 class="ml-3 text-slate-800 text-xl font-semibold">
                Professional templates
              </h5>
            </div>
            <p class="block text-slate-600 leading-normal font-light mb-4">
              Choose from 1+ applicant tracking systems (ATS)-friendly modern
              and professional templates.
            </p>
            <div>
              {/* <a
              href="#"
              class="text-slate-800 font-semibold text-sm hover:underline flex items-center"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a> */}
            </div>
          </div>

          <div class="relative flex flex-col bg-white shadow-lg border border-slate-500 rounded-lg w-full p-6">
            <div class="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 text-slate-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <h5 class="ml-3 text-slate-800 text-xl font-semibold">
                Customize fonts and colors
              </h5>
            </div>
            <p class="block text-slate-600 leading-normal font-light mb-4">
              Select custom fonts and colors on any resume template.
            </p>
            <div>
              {/* <a
              href="#"
              class="text-slate-800 font-semibold text-sm hover:underline flex items-center"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a> */}
            </div>
          </div>

          <div class="relative flex flex-col bg-white shadow-lg border border-slate-500 rounded-lg w-full p-6">
            <div class="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 text-slate-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <h5 class="ml-3 text-slate-800 text-xl font-semibold">
                Free resume examples
              </h5>
            </div>
            <p class="block text-slate-600 leading-normal font-light mb-4">
              Select custom fonts and colors on any resume template.Use our more
              than 500 resume examples and templates to see what a great resume
              looks like in your field.
            </p>
            <div>
              {/* <a
              href="#"
              class="text-slate-800 font-semibold text-sm hover:underline flex items-center"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a> */}
            </div>
          </div>

          <div class="relative flex flex-col bg-white shadow-lg border border-slate-500 rounded-lg w-full p-6">
            <div class="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 text-slate-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <h5 class="ml-3 text-slate-800 text-xl font-semibold">
                ATS-friendly templates
              </h5>
            </div>
            <p class="block text-slate-600 leading-normal font-light mb-4">
              Sail through applicant tracking systems with resume templates that
              appeal to both machines and humans.
            </p>
            <div>
              {/* <a
              href="#"
              class="text-slate-800 font-semibold text-sm hover:underline flex items-center"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a> */}
            </div>
          </div>

          <div class="relative flex flex-col bg-white shadow-lg border border-slate-500 rounded-lg w-full p-6">
            <div class="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 text-slate-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <h5 class="ml-3 text-slate-800 text-xl font-semibold">
                Expert tips and guidance
              </h5>
            </div>
            <p class="block text-slate-600 leading-normal font-light mb-4">
              Get help every step of the way as you build your resume with
              expert tips and suggested phrases.
            </p>
            <div>
              {/* <a
              href="#"
              class="text-slate-800 font-semibold text-sm hover:underline flex items-center"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:gap-y-8 md:gap-y-6 max-md:gap-y-4 pt-2">
          <h1 className="text-center lg:text-4xl md:text-3xl max-md:text-2xl">
            Choose from a wide list of design
          </h1>

          <div className="flex flex-row justify-center lg:gap-5 max-lg:gap-3">
            <div className="relative group lg:w-[25vw] max-lg:w-[30vw] aspect-[8.5/11] border-slate-500 border-1 rounded-xl p-0 hover:border-black overflow-hidden transition-all duration-300">
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
            <div className="relative group lg:w-[25vw] max-lg:w-[30vw] aspect-[8.5/11] border-slate-500 border-1 rounded-xl p-0 hover:border-black overflow-hidden transition-all duration-300">
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
          <h1 className="text-center lg:text-4xl md:text-3xl max-md:text-2xl">
            What users say about Resume Builder
          </h1>

          <div className="grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div class="flex w-full p-4 flex-col border-slate-500 rounded-lg bg-white shadow-lg border my-0">
              <div class="flex items-center gap-4 text-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  alt="Tania Andrew"
                  class="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
                />
                <div class="flex w-full flex-col">
                  <div class="flex items-center justify-between">
                    <h5 class="text-xl font-semibold text-slate-800">
                      Tania Andrew
                    </h5>
                    <div class="flex items-center gap-0 5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs uppercase font-bold text-slate-500 mt-0.5">
                    Designer @ Google
                  </p>
                </div>
              </div>
              <div class="mt-6">
                <p class="text-base text-slate-600 font-light leading-normal">
                  &quot;I found solution to all my design needs from Creative
                  Tim. I use them as a freelancer in my hobby projects for fun!
                  And its really affordable, very humble guys !!!&quot;
                </p>
              </div>
            </div>

            <div class="flex w-full p-4 flex-col rounded-lg bg-white shadow-lg border border-slate-500 my-0">
              <div class="flex items-center gap-4 text-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  alt="Tania Andrew"
                  class="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
                />
                <div class="flex w-full flex-col">
                  <div class="flex items-center justify-between">
                    <h5 class="text-xl font-semibold text-slate-800">
                      Tania Andrew
                    </h5>
                    <div class="flex items-center gap-0 5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs uppercase font-bold text-slate-500 mt-0.5">
                    Designer @ Google
                  </p>
                </div>
              </div>
              <div class="mt-6">
                <p class="text-base text-slate-600 font-light leading-normal">
                  &quot;I found solution to all my design needs from Creative
                  Tim. I use them as a freelancer in my hobby projects for fun!
                  And its really affordable, very humble guys !!!&quot;
                </p>
              </div>
            </div>

            <div class="flex w-full p-4 flex-col rounded-lg bg-white shadow-lg border border-slate-500 my-0">
              <div class="flex items-center gap-4 text-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  alt="Tania Andrew"
                  class="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
                />
                <div class="flex w-full flex-col">
                  <div class="flex items-center justify-between">
                    <h5 class="text-xl font-semibold text-slate-800">
                      Tania Andrew
                    </h5>
                    <div class="flex items-center gap-0 5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs uppercase font-bold text-slate-500 mt-0.5">
                    Designer @ Google
                  </p>
                </div>
              </div>
              <div class="mt-6">
                <p class="text-base text-slate-600 font-light leading-normal">
                  &quot;I found solution to all my design needs from Creative
                  Tim. I use them as a freelancer in my hobby projects for fun!
                  And its really affordable, very humble guys !!!&quot;
                </p>
              </div>
            </div>

            <div class="flex w-full p-4 flex-col rounded-lg bg-white shadow-lg border border-slate-500 my-0">
              <div class="flex items-center gap-4 text-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  alt="Tania Andrew"
                  class="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center"
                />
                <div class="flex w-full flex-col">
                  <div class="flex items-center justify-between">
                    <h5 class="text-xl font-semibold text-slate-800">
                      Tania Andrew
                    </h5>
                    <div class="flex items-center gap-0 5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 h-5 text-yellow-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs uppercase font-bold text-slate-500 mt-0.5">
                    Designer @ Google
                  </p>
                </div>
              </div>
              <div class="mt-6">
                <p class="text-base text-slate-600 font-light leading-normal">
                  &quot;I found solution to all my design needs from Creative
                  Tim. I use them as a freelancer in my hobby projects for fun!
                  And its really affordable, very humble guys !!!&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:gap-y-8 md:gap-y-6 max-md:gap-y-4 pt-2">
          <h1 className="text-left lg:text-2xl md:text-2xl max-md:text-2xl font-medium">
            Our resumes have been selected in
          </h1>

          <Slider />

          <span className="lg:text-xl md:text-xl font-light">
            Our online resume builder makes it simple to create a professional
            resume from your phone, laptop, or tablet using 30+ customizable
            resume templates — anytime, anywhere. Create a resume using our AI
            resume builder feature, plus take advantage of expert suggestions, a
            built-in resume editor, and customizable modern and professional
            resume templates. Free users have access to our easy-to-use resume
            creator and TXT file downloads.
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;

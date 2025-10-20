import React from "react";

const ResumePreview = () => {
  const data = {
    name: "Sayan Dey",
    email: "sayan.dey@example.com",
    phone: "+91 98765 43210",
    summary:
      "Enthusiastic Flutter developer with a passion for crafting seamless mobile experiences. Skilled in Firebase, Supabase, and modern UI design principles.",

    education: [
      {
        degree: "Bachelor of Technology in Computer Science",
        school: "Techno India University",
        year: "2021 – 2025",
      },
      {
        degree: "Higher Secondary Education",
        school: "National High School",
        year: "2021",
      },
    ],

    experience: [
      {
        role: "Flutter Developer Intern",
        company: "Appify Innovations",
        duration: "June 2024 – Aug 2024",
        description:
          "Developed cross-platform mobile apps using Flutter and Firebase. Implemented authentication, social feed features, and lazy loading for better performance.",
      },
      {
        role: "Open Source Contributor",
        company: "GitHub",
        duration: "2023 – Present",
        description:
          "Contributed to multiple Flutter open-source projects by fixing bugs, improving UI components, and writing clean, maintainable code.",
      },
    ],

    skills: [
      "Flutter",
      "Dart",
      "Firebase",
      "Supabase",
      "React",
      "JavaScript",
      "Git",
      "UI/UX Design",
    ],
  };

  return (
    <div className="text-gray-800 font-sans p-8 w-[210mm] h-[297mm] bg-green-100">
      <header className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold">{data.name || "John Doe"}</h1>
        <p>
          {data.email || "john@example.com"} | {data.phone || "+1 234 567 8901"}
        </p>
      </header>

      <section className="mb-4">
        <h2 className="text-xl font-semibold border-b mb-2">Summary</h2>
        <p>
          {data.summary ||
            "A passionate developer skilled in modern web technologies."}
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
        {data.education?.length > 0 ? (
          data.education.map((edu, i) => (
            <div key={i}>
              <p className="font-bold">
                {edu.degree || "B.Tech in Computer Science"}
              </p>
              <p>
                {edu.school || "ABC University"} — {edu.year || "2020"}
              </p>
            </div>
          ))
        ) : (
          <p>B.Tech in Computer Science, ABC University (2020)</p>
        )}
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold border-b mb-2">Experience</h2>
        {data.experience?.length > 0 ? (
          data.experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <p className="font-bold">{exp.role || "Frontend Developer"}</p>
              <p>
                {exp.company || "XYZ Corp"} — {exp.duration || "2021–Present"}
              </p>
              <p>
                {exp.description ||
                  "Developed responsive UI and improved performance by 30%."}
              </p>
            </div>
          ))
        ) : (
          <p>Frontend Developer, XYZ Corp (2021–Present)</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
        <p>
          {data.skills?.join(", ") ||
            "React, JavaScript, HTML, CSS, Tailwind, Git"}
        </p>
      </section>
    </div>
  );
};

export default ResumePreview;

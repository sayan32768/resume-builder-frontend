import React from "react";

const ResumePreview3 = () => {
  const personal = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    location: "Mumbai, India",
    summary:
      "A highly motivated software developer with experience in full-stack development and a passion for creating innovative solutions.",
  };

  const education = [
    {
      degree: "B.Tech in Computer Science",
      name: "Indian Institute of Technology, Bombay",
      year: "2021",
      location: "Mumbai, India",
      grades: { type: "CGPA", score: "9.2" },
    },
    {
      degree: "High School",
      name: "St. Xavier's High School",
      year: "2017",
      location: "Mumbai, India",
      grades: { type: "Percentage", score: "95%" },
    },
  ];

  const experience = [
    {
      position: "Software Engineer",
      company: "Tech Solutions Pvt. Ltd.",
      duration: "Jan 2022 — Present",
      description:
        "Developed scalable web applications using React and Node.js. Collaborated with cross-functional teams to design and implement new features.",
    },
    {
      position: "Intern",
      company: "Startup Hub",
      duration: "Jun 2021 — Dec 2021",
      description:
        "Assisted in developing the company’s internal dashboard and performed testing and debugging of web applications.",
    },
  ];

  const projects = [
    // {
    //   title: "Personal Portfolio Website",
    //   description:
    //     "Built a personal portfolio website using React to showcase my projects and skills.",
    //   links: [{ link: "https://github.com/johndoe/portfolio" }],
    // },
    {
      title: "E-commerce Platform",
      description:
        "Developed a full-stack e-commerce platform with React, Node.js, and MongoDB supporting user authentication and payment integration.",
      links: [{ link: "https://github.com/johndoe/ecommerce" }],
    },
  ];

  const otherExp = [
    {
      title: "Volunteer",
      organization: "Code for Good",
      duration: "2020 — Present",
      description:
        "Conducted coding workshops for school students and helped organize tech events.",
    },
  ];

  const certifications = [
    {
      title: "Full Stack Web Development",
      issuingAuthority: "Coursera",
      issueDate: "2022-05-15",
      link: "https://www.coursera.org/certificate/fullstack",
    },
    // {
    //   title: "React Developer",
    //   issuingAuthority: "Udemy",
    //   issueDate: "2021-12-10",
    //   link: "https://www.udemy.com/certificate/react-developer",
    // },
  ];

  const skills = [
    { skillName: "JavaScript" },
    { skillName: "React" },
    { skillName: "Node.js" },
    { skillName: "MongoDB" },
    { skillName: "HTML & CSS" },
    { skillName: "Git" },
  ];

  return (
    <div className="text-gray-800 font-sans p-8 w-[210mm] h-[297mm] bg-white outline">
      {/* Header */}
      <header className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold">{personal.fullName}</h1>
        <p>
          {personal.email} | {personal.phone}
        </p>
        {personal.location && <p>{personal.location}</p>}
      </header>

      {/* Summary */}
      <section className="mb-4">
        <h2 className="text-xl font-semibold border-b mb-2">Summary</h2>
        <p>{personal.summary}</p>
      </section>

      {/* Education */}
      <section className="mb-4">
        <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
        {education.map((edu, i) => (
          <div key={i} className="mb-2">
            <p className="font-bold">{edu.degree}</p>
            <p>
              {edu.name} — {edu.year}
            </p>
            {edu.location && <p>{edu.location}</p>}
            {edu.grades?.score && (
              <p>
                {edu.grades.type}: {edu.grades.score}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* Professional Experience */}
      <section className="mb-4">
        <h2 className="text-xl font-semibold border-b mb-2">
          Professional Experience
        </h2>
        {experience.map((exp, i) => (
          <div key={i} className="mb-2">
            <p className="font-bold">{exp.position}</p>
            <p>
              {exp.company} — {exp.duration}
            </p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="mb-4">
        <h2 className="text-xl font-semibold border-b mb-2">Projects</h2>
        {projects.map((proj, i) => (
          <div key={i} className="mb-2">
            <p className="font-bold">{proj.title}</p>
            <p>{proj.description}</p>
            {proj.links?.length > 0 && (
              <ul className="list-disc pl-5">
                {proj.links.map((l, idx) => (
                  <li key={idx}>
                    <a
                      href={l.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {l.link}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* Other Experience */}
      {/* <section className="mb-4">
        <h2 className="text-xl font-semibold border-b mb-2">
          Other Experience
        </h2>
        {otherExp.map((exp, i) => (
          <div key={i} className="mb-2">
            <p className="font-bold">{exp.title}</p>
            <p>
              {exp.organization} — {exp.duration}
            </p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section> */}

      {/* Certifications */}
      <section className="mb-4">
        <h2 className="text-xl font-semibold border-b mb-2">Certifications</h2>
        {certifications.map((cert, i) => (
          <div key={i} className="mb-2">
            <p className="font-bold">{cert.title}</p>
            <p>{cert.issuingAuthority}</p>
            <p>
              Issued on: {new Date(cert.issueDate).toLocaleDateString("en-IN")}
            </p>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {cert.link}
            </a>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
        <p>{skills.map((s) => s.skillName).join(", ")}</p>
      </section>
    </div>
  );
};

export default ResumePreview3;

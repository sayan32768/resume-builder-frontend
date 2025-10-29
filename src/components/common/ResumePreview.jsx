import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const ResumePreview = () => {
  const { control } = useFormContext();
  const data = useWatch({ control });

  const personal = data?.personalDetails || {};
  const education = data?.educationDetails || [];
  const experience = data?.professionalExperience || [];
  const projects = data?.projects || [];
  const otherExp = data?.otherExperience || [];
  const certifications = data?.certifications || [];
  const skills = data?.skills || [];

  return (
    <div className="resume-preview">
      <style>
        {`
         @import url('https://fonts.googleapis.com/css2?family=Crete+Round:ital@0;1&family=Lexend:wght@100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Sanchez:ital@0;1&display=swap');
          * {
              font-family: "Nunito Sans", sans-serif;
          }
        .resume-preview {
          color: #1f2937;
          font-family: sans-serif;
          padding: 32px;
          width: 210mm;
          height: 297mm;
          background-color: white;
          overflow: hidden;
        }
        .resume-preview header {
          border-bottom: 1px solid #d1d5db;
          padding-bottom: 16px;
          margin-bottom: 16px;

        }
        .resume-preview header h1 {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          line-height: 1.4;
        }

        .resume-preview header p {
          margin: 0;
          line-height: 1.4;
        }

        .resume-preview section {
          margin-bottom: 16px;
        }
        .resume-preview section h2 {
          font-size: 20px;
          font-weight: 600;
          border-bottom: 1px solid #d1d5db;
          margin-bottom: 8px;
        }
        .resume-preview div {
          margin-bottom: 8px;
        }
        .resume-preview div p {
          margin: 0;
        }
        .resume-preview div p.bold {
          font-weight: 600;
        }
        .resume-preview ul {
          list-style-type: disc;
          padding-left: 16px;
          margin: 0;
        }
        .resume-preview a {
          color: #2563eb;
          text-decoration: underline;
        }
        `}
      </style>
      <header>
        <h1>{personal?.fullName || "Your Name"}</h1>
        <p>
          {personal?.email || "you@example.com"} |{" "}
          {personal?.phone || "+91 XXXXXXXXXX"}
        </p>
        {personal?.address && <p>{personal.address}</p>}
        {personal?.about && <p>{personal.about}</p>}
        {personal?.socials?.length > 0 && (
          <p>
            {personal.socials.map((s, i) => (
              <span key={i}>
                {s.name}: {s.link || "-"}
                {i < personal.socials.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        )}
      </header>

      {personal?.summary && (
        <section>
          <h2>Summary</h2>
          <p>{personal.summary}</p>
        </section>
      )}

      {education?.length > 0 && (
        <section>
          <h2>Education</h2>
          {education.map((edu, i) => (
            <div key={i}>
              <p className="bold">{edu.degree || "Degree"}</p>
              <p>{edu.name || "Institute Name"}</p>
              {edu.dates?.startDate && edu.dates?.endDate && (
                <p>
                  {new Date(edu.dates.startDate).toLocaleDateString("en-IN")} —{" "}
                  {new Date(edu.dates.endDate).toLocaleDateString("en-IN")}
                </p>
              )}
              {edu.location && <p>{edu.location}</p>}
              {edu.grades && (
                <p>
                  {edu.grades.type && `${edu.grades.type}:`}{" "}
                  {edu.grades.score || "-"}{" "}
                  {edu.grades.message && `(${edu.grades.message})`}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {experience?.length > 0 && (
        <section>
          <h2>Professional Experience</h2>
          {experience.map((exp, i) => (
            <div key={i}>
              <p className="bold">{exp.position || "Position"}</p>
              <p>{exp.companyName || "Company Name"}</p>
              {exp.companyAddress && <p>{exp.companyAddress}</p>}
              {exp.dates?.startDate && exp.dates?.endDate && (
                <p>
                  {new Date(exp.dates.startDate).toLocaleDateString("en-IN")} —{" "}
                  {new Date(exp.dates.endDate).toLocaleDateString("en-IN")}
                </p>
              )}
              {exp.workDescription && <p>{exp.workDescription}</p>}
            </div>
          ))}
        </section>
      )}

      {projects?.length > 0 && (
        <section>
          <h2>Projects</h2>
          {projects.map((proj, i) => (
            <div key={i}>
              <p className="bold">{proj.title || "Project Title"}</p>
              {proj.description && <p>{proj.description}</p>}
              {proj.extraDetails && <p>{proj.extraDetails}</p>}
              {proj.links?.length > 0 && (
                <ul>
                  {proj.links.map((l, idx) => (
                    <li key={idx}>
                      <a
                        href={l.link}
                        target="_blank"
                        rel="noopener noreferrer"
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
      )}

      {otherExp?.length > 0 && (
        <section>
          <h2>Other Experience</h2>
          {otherExp.map((exp, i) => (
            <div key={i}>
              <p className="bold">
                {exp.position || exp.companyName || "Title"}
              </p>
              {exp.companyAddress && <p>{exp.companyAddress}</p>}
              {exp.dates?.startDate && exp.dates?.endDate && (
                <p>
                  {new Date(exp.dates.startDate).toLocaleDateString("en-IN")} —{" "}
                  {new Date(exp.dates.endDate).toLocaleDateString("en-IN")}
                </p>
              )}
              {exp.workDescription && <p>{exp.workDescription}</p>}
            </div>
          ))}
        </section>
      )}

      {certifications?.length > 0 && (
        <section>
          <h2>Certifications</h2>
          {certifications.map((cert, i) => (
            <div key={i}>
              <p className="bold">{cert.title || "Certificate Title"}</p>
              <p>{cert.issuingAuthority || "Issuing Authority"}</p>
              {cert.issueDate && (
                <p>
                  Issued on:{" "}
                  {new Date(cert.issueDate).toLocaleDateString("en-IN")}
                </p>
              )}
              {cert.link && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                  {cert.link}
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {skills?.length > 0 && (
        <section>
          <h2>Skills</h2>
          <p>{skills.map((s) => s.skillName || "-").join(", ")}</p>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;

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
    <div className="text-gray-800 font-sans p-8 w-[210mm] h-[297mm] bg-green-200">
      {/* Header */}
      <header className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold">
          {personal?.fullName || "Your Name"}
        </h1>
        <p>
          {personal?.email || "you@example.com"} |{" "}
          {personal?.phone || "+91 XXXXXXXXXX"}
        </p>
        {personal?.location && <p>{personal.location}</p>}
      </header>

      {/* Summary */}
      {personal?.summary && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b mb-2">Summary</h2>
          <p>{personal.summary}</p>
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-bold">{edu.degree || "Degree"}</p>
              <p>
                {edu.name || "Institute Name"} {edu.year && `— ${edu.year}`}
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
      )}

      {/* Professional Experience */}
      {experience?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b mb-2">
            Professional Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <p className="font-bold">{exp.position || "Position"}</p>
              <p>
                {exp.company || "Company Name"}{" "}
                {exp.duration && `— ${exp.duration}`}
              </p>
              {exp.description && <p>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b mb-2">Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="mb-2">
              <p className="font-bold">{proj.title || "Project Title"}</p>
              {proj.description && <p>{proj.description}</p>}
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
      )}

      {/* Other Experience */}
      {otherExp?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b mb-2">
            Other Experience
          </h2>
          {otherExp.map((exp, i) => (
            <div key={i} className="mb-2">
              <p className="font-bold">{exp.title || "Title"}</p>
              <p>
                {exp.organization || "Organization"}{" "}
                {exp.duration && `— ${exp.duration}`}
              </p>
              {exp.description && <p>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b mb-2">
            Certifications
          </h2>
          {certifications.map((cert, i) => (
            <div key={i} className="mb-2">
              <p className="font-bold">{cert.title || "Certificate Title"}</p>
              <p>{cert.issuingAuthority || "Issuing Authority"}</p>
              {cert.issueDate && (
                <p>
                  Issued on:{" "}
                  {new Date(cert.issueDate).toLocaleDateString("en-IN")}
                </p>
              )}
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {cert.link}
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
          <p>{skills.map((s) => s.skillName).join(", ")}</p>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;

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
    <div className="text-gray-800 font-sans p-8 w-[210mm] h-[297mm] bg-white overflow-hidden outline-1">
      <header className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold">
          {personal?.fullName || "Your Name"}
        </h1>
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
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b mb-2">Summary</h2>
          <p>{personal.summary}</p>
        </section>
      )}

      {education?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-bold">{edu.degree || "Degree"}</p>
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
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b mb-2">
            Professional Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <p className="font-bold">{exp.position || "Position"}</p>
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
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b mb-2">Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="mb-2">
              <p className="font-bold">{proj.title || "Project Title"}</p>
              {proj.description && <p>{proj.description}</p>}
              {proj.extraDetails && <p>{proj.extraDetails}</p>}
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

      {otherExp?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold border-b mb-2">
            Other Experience
          </h2>
          {otherExp.map((exp, i) => (
            <div key={i} className="mb-2">
              <p className="font-bold">
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

      {skills?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
          <p>{skills.map((s) => s.skillName || "-").join(", ")}</p>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;

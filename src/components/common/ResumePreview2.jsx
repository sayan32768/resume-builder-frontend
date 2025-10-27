import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const ResumePreview2 = () => {
  const { control } = useFormContext();
  const data = useWatch({ control });

  const personal = data?.personalDetails || {};
  const education = data?.educationDetails || [];
  const experience = data?.professionalExperience || [];
  const otherExp = data?.otherExperience || [];
  const certifications = data?.certifications || [];
  const skills = data?.skills || [];
  const projects = data?.projects || [];

  return (
    <div className="font-sans w-[210mm] h-[297mm] bg-white text-gray-800 border mx-auto flex">
      <div className="w-[35%] bg-[#f7f2f0] p-6 flex flex-col justify-between">
        <div>
          <section className="mb-6">
            <h3 className="uppercase text-[#b37d6b] font-semibold mb-3 tracking-wider text-sm">
              contact
            </h3>
            <ul className="text-sm space-y-1">
              <li>{personal?.phone || "(+91) 9999999999"}</li>
              <li>{personal?.email || "you@example.com"}</li>
              {personal?.location && <li>{personal.location}</li>}
              {personal?.linkedin && <li>{personal.linkedin}</li>}
            </ul>
          </section>

          {education?.length > 0 && (
            <section className="mb-6">
              <h3 className="uppercase text-[#b37d6b] font-semibold mb-3 tracking-wider text-sm">
                education
              </h3>
              {education.map((edu, i) => (
                <div key={i} className="mb-3 text-sm">
                  <p className="italic">({edu.year || "Year"})</p>
                  <p className="font-semibold">{edu.degree || "Degree"}</p>
                  <p className="italic">{edu.name || "Institute Name"}</p>
                  {edu.grades?.score && (
                    <p>
                      {edu.grades.type}: {edu.grades.score}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
          {skills?.length > 0 && (
            <section className="mb-6">
              <h3 className="uppercase text-[#b37d6b] font-semibold mb-3 tracking-wider text-sm">
                key skills
              </h3>
              <ul className="text-sm space-y-1">
                {skills.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-300 rounded-full h-1">
                      <div className="bg-[#b37d6b] h-1 rounded-full w-3/4"></div>
                    </div>
                    <span>{s.skillName}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {certifications?.length > 0 && (
            <section className="mb-6">
              <h3 className="uppercase text-[#b37d6b] font-semibold mb-3 tracking-wider text-sm">
                awards
              </h3>
              {certifications.map((cert, i) => (
                <div key={i} className="text-sm mb-2">
                  <p className="italic">
                    (
                    {cert.issueDate
                      ? new Date(cert.issueDate).getFullYear()
                      : "Year"}
                    )
                  </p>
                  <p className="font-semibold">{cert.title || "Award Title"}</p>
                  <p>{cert.issuingAuthority || "Issuer"}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      <div className="w-[65%] p-8">
        <header className="border-b-4 border-[#b37d6b] pb-4 mb-6">
          <h1 className="text-3xl font-bold text-[#b37d6b] tracking-wide uppercase">
            {personal?.fullName || "Your Name"}
          </h1>
          <p className="text-center text-sm tracking-[0.3em] text-gray-600 mt-1">
            {personal?.role || "Your Role / Title"}
          </p>
        </header>

        {personal?.summary && (
          <section className="mb-6">
            <h2 className="uppercase text-[#b37d6b] font-semibold mb-2 tracking-wider text-sm">
              profile
            </h2>
            <p className="text-sm leading-relaxed">{personal.summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section className="mb-6">
            <h2 className="uppercase text-[#b37d6b] font-semibold mb-2 tracking-wider text-sm">
              professional experience
            </h2>
            {experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <p className="text-sm font-semibold">
                  ({exp.duration || "Duration"})
                </p>
                <p className="text-sm font-bold">
                  {exp.position || "Position"}
                </p>
                <p className="text-sm italic mb-1">
                  {exp.company || "Company"}{" "}
                  {exp.location && `– ${exp.location}`}
                </p>
                {exp.description && (
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {exp.description
                      .split(".")
                      .filter(Boolean)
                      .map((item, idx) => (
                        <li key={idx}>{item.trim()}.</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Other Experience / Projects */}
        {(otherExp?.length > 0 || projects?.length > 0) && (
          <section className="mb-6">
            <h2 className="uppercase text-[#b37d6b] font-semibold mb-2 tracking-wider text-sm">
              other experience
            </h2>
            {[...otherExp, ...projects].map((exp, i) => (
              <div key={i} className="mb-3">
                <p className="text-sm font-bold">
                  {exp.title || exp.name || "Title"}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-700">{exp.description}</p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview2;

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const ResumePreview2 = () => {
  const { control } = useFormContext();
  const data = useWatch({ control });

  const personal = data?.personalDetails || {};
  const education = data?.educationDetails || [];
  const skills = data?.skills || [];
  const experience = data?.professionalExperience || [];
  const otherExp = data?.otherExperience || [];
  const projects = data?.projects || [];
  const certifications = data?.certifications || [];

  return (
    <div className="font-sans w-[210mm] h-[297mm] bg-white text-gray-800 border mx-auto flex">
      <div className="w-[35%] bg-[#f7f2f0] p-6 flex flex-col justify-between overflow-hidden">
        <div>
          <section className="mb-6">
            <h3 className="uppercase text-[#b37d6b] font-semibold mb-3 tracking-wider text-sm">
              contact
            </h3>
            <ul className="text-sm space-y-1">
              {personal.phone && <li>{personal.phone}</li>}
              {personal.email && <li>{personal.email}</li>}
              {personal.address && <li>{personal.address}</li>}
              {personal.socials?.map((s, i) => (
                <li key={i}>
                  {s.name}: {s.link || "-"}
                </li>
              ))}
            </ul>
          </section>
          {education.length > 0 && (
            <section className="mb-6">
              <h3 className="uppercase text-[#b37d6b] font-semibold mb-3 tracking-wider text-sm">
                education
              </h3>
              {education.map((edu, i) => (
                <div key={i} className="mb-3 text-sm">
                  {edu.dates?.startDate && edu.dates?.endDate && (
                    <p className="italic">
                      ({new Date(edu.dates.startDate).getFullYear()} -{" "}
                      {new Date(edu.dates.endDate).getFullYear()})
                    </p>
                  )}
                  <p className="font-semibold">{edu.degree || "-"}</p>
                  {edu.name && <p className="italic">{edu.name}</p>}
                  {edu.location && <p>{edu.location}</p>}
                  {edu.grades?.score && (
                    <p>
                      {edu.grades.type}: {edu.grades.score}{" "}
                      {edu.grades.message && `(${edu.grades.message})`}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
          {skills.length > 0 && (
            <section className="mb-6">
              <h3 className="uppercase text-[#b37d6b] font-semibold mb-3 tracking-wider text-sm">
                key skills
              </h3>
              <ul className="text-sm space-y-1">
                {skills.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span>{s.skillName}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {certifications.length > 0 && (
            <section className="mb-6">
              <h3 className="uppercase text-[#b37d6b] font-semibold mb-3 tracking-wider text-sm">
                certifications
              </h3>
              {certifications.map((cert, i) => (
                <div key={i} className="text-sm mb-2">
                  {cert.issueDate && (
                    <p className="italic">
                      ({new Date(cert.issueDate).getFullYear()})
                    </p>
                  )}
                  <p className="font-semibold">{cert.title}</p>
                  <p>{cert.issuingAuthority}</p>
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
        </div>
      </div>

      <div className="w-[65%] p-8 overflow-hidden">
        <header className="border-b-4 border-[#b37d6b] pb-4 mb-6">
          <h1 className="text-3xl font-bold text-[#b37d6b] tracking-wide uppercase">
            {personal.fullName || "-"}
          </h1>
          {personal.about && (
            <p className="text-center text-sm tracking-[0.3em] text-gray-600 mt-1">
              {personal.about}
            </p>
          )}
        </header>

        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="uppercase text-[#b37d6b] font-semibold mb-2 tracking-wider text-sm">
              professional experience
            </h2>
            {experience.map((exp, i) => (
              <div key={i} className="mb-3">
                {exp.dates?.startDate && exp.dates?.endDate && (
                  <p className="text-sm font-semibold">
                    ({new Date(exp.dates.startDate).toLocaleDateString()} -{" "}
                    {new Date(exp.dates.endDate).toLocaleDateString()})
                  </p>
                )}
                <p className="text-sm font-bold">{exp.position || "-"}</p>
                <p className="text-sm italic mb-1">
                  {exp.companyName || "-"}{" "}
                  {exp.companyAddress && `– ${exp.companyAddress}`}
                </p>
                {exp.workDescription && (
                  <p className="text-sm text-gray-700">{exp.workDescription}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="uppercase text-[#b37d6b] font-semibold mb-2 tracking-wider text-sm">
              projects
            </h2>
            {projects.map((item, i) => (
              <div key={i} className="mb-3">
                <p className="text-sm font-bold">
                  {item.title || item.name || "-"}
                </p>
                {item.description && (
                  <p className="text-sm text-gray-700">{item.description}</p>
                )}
                {item.extraDetails && (
                  <p className="text-sm text-gray-700">{item.extraDetails}</p>
                )}
                {item.links?.length > 0 && (
                  <ul className="list-disc list-inside text-sm">
                    {item.links.map((l, idx) => (
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

        {otherExp.length > 0 && (
          <section className="mb-6">
            <h2 className="uppercase text-[#b37d6b] font-semibold mb-2 tracking-wider text-sm">
              Other experience
            </h2>
            {otherExp.map((exp, i) => (
              <div key={i} className="mb-3">
                {exp.dates?.startDate && exp.dates?.endDate && (
                  <p className="text-sm font-semibold">
                    ({new Date(exp.dates.startDate).toLocaleDateString()} -{" "}
                    {new Date(exp.dates.endDate).toLocaleDateString()})
                  </p>
                )}
                <p className="text-sm font-bold">{exp.position || "-"}</p>
                <p className="text-sm italic mb-1">
                  {exp.companyName || "-"}{" "}
                  {exp.companyAddress && `– ${exp.companyAddress}`}
                </p>
                {exp.workDescription && (
                  <p className="text-sm text-gray-700">{exp.workDescription}</p>
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

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
    <div className="resume-preview">
      <style>
        {`         
          .resume-preview {
          font-family: "Nunito Sans", serif;
          width: 210mm;
          height: 297mm;
          background-color: white;
          color: #1f2937;
          margin: 0 auto;
          display: flex;
        }
        .left-column {
          width: 35%;
          background-color: #f7f2f0;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }
        .left-column section {
          margin-bottom: 24px;
        }
        .left-column h3 {
          text-transform: uppercase;
          color: #b37d6b;
          font-weight: 600;
          margin-bottom: 12px;
          letter-spacing: 0.1em;
          font-size: 12px;
        }
        .left-column ul {
          font-size: 12px;
          line-height: 1.5;
          margin: 0;
          padding: 0;
          list-style-type: none;
        }
        .left-column div {
          font-size: 12px;
          margin-bottom: 8px;
        }
        .left-column div p {
          margin: 0;
        }
        .left-column div p.italic {
          font-style: italic;
        }
        .left-column div p.bold {
          font-weight: 600;
        }
        .left-column a {
          color: #2563eb;
          text-decoration: underline;
        }
        .right-column {
          width: 65%;
          padding: 32px;
          overflow: hidden;
        }
        .right-column header {
          border-bottom: 4px solid #b37d6b;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        .right-column header h1 {
          font-size: 24px;
          font-weight: 700;
          color: #b37d6b;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0;
        }
        .right-column header p {
          text-align: center;
          font-size: 12px;
          letter-spacing: 0.3em;
          color: #4b5563;
          margin-top: 4px;
        }
        .right-column section {
          margin-bottom: 24px;
        }
        .right-column h2 {
          text-transform: uppercase;
          color: #b37d6b;
          font-weight: 600;
          margin-bottom: 8px;
          letter-spacing: 0.1em;
          font-size: 12px;
        }
        .right-column div {
          margin-bottom: 12px;
        }
        .right-column div p {
          font-size: 12px;
          margin: 0;
        }
        .right-column div p.bold {
          font-weight: 700;
        }
        .right-column div p.semibold {
          font-weight: 600;
        }
        .right-column div p.italic {
          font-style: italic;
          margin-bottom: 4px;
        }
        .right-column div p.description {
          color: #374151;
        }
        .right-column ul {
          font-size: 12px;
          list-style-type: disc;
          padding-left: 16px;
          margin: 0;
        }
        .right-column ul li a {
          color: #2563eb;
          text-decoration: underline;
        }
        `}
      </style>
      <div className="left-column">
        <div>
          {personal && (
            <section>
              <h3>contact</h3>
              <ul>
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
          )}
          {education.length > 0 && (
            <section>
              <h3>education</h3>
              {education.map((edu, i) => (
                <div key={i}>
                  {edu.dates?.startDate && edu.dates?.endDate
                    ? `${new Date(
                        edu.dates.startDate
                      ).getFullYear()} - ${new Date(
                        edu.dates.endDate
                      ).getFullYear()}`
                    : edu.dates?.startDate
                    ? new Date(edu.dates.startDate).getFullYear() + "- Present"
                    : edu.dates?.endDate
                    ? "End Date-" + new Date(edu.dates.endDate).getFullYear()
                    : ""}
                </div>
              ))}
            </section>
          )}
          {skills.length > 0 && (
            <section>
              <h3>key skills</h3>
              <ul>
                {skills.map((s, i) => (
                  <li key={i}>{s.skillName}</li>
                ))}
              </ul>
            </section>
          )}
          {certifications.length > 0 && (
            <section>
              <h3>certifications</h3>
              {certifications.map((cert, i) => (
                <div key={i}>
                  {cert.issueDate && (
                    <p className="italic">
                      ({new Date(cert.issueDate).getFullYear()})
                    </p>
                  )}
                  <p className="bold">{cert.title}</p>
                  <p>{cert.issuingAuthority}</p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
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
      <div className="right-column">
        <header>
          <h1>{personal.fullName || "-"}</h1>
          {personal.about && <p>{personal.about}</p>}
        </header>
        {experience.length > 0 && (
          <section>
            <h2>professional experience</h2>
            {experience.map((exp, i) => (
              <div key={i}>
                {exp.dates?.startDate && exp.dates?.endDate
                  ? `${new Date(
                      exp.dates.startDate
                    ).getFullYear()} - ${new Date(
                      exp.dates.endDate
                    ).getFullYear()}`
                  : exp.dates?.startDate
                  ? new Date(exp.dates.startDate).getFullYear() + "- Present"
                  : exp.dates?.endDate
                  ? "End Date-" + new Date(exp.dates.endDate).getFullYear()
                  : ""}
                <p className="bold">{exp.position || "-"}</p>
                <p className="italic">
                  {exp.companyName || "-"}{" "}
                  {exp.companyAddress && `– ${exp.companyAddress}`}
                </p>
                {exp.workDescription && (
                  <p className="description">{exp.workDescription}</p>
                )}
              </div>
            ))}
          </section>
        )}
        {projects.length > 0 && (
          <section>
            <h2>projects</h2>
            {projects.map((item, i) => (
              <div key={i}>
                <p className="bold">{item.title || item.name || "-"}</p>
                {item.description && (
                  <p className="description">{item.description}</p>
                )}
                {item.extraDetails && (
                  <p className="description">{item.extraDetails}</p>
                )}
                {item.links?.length > 0 && (
                  <ul>
                    {item.links.map((l, idx) => (
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
        {otherExp.length > 0 && (
          <section>
            <h2>other experience</h2>
            {otherExp.map((exp, i) => (
              <div key={i}>
                {exp.dates?.startDate && exp.dates?.endDate
                  ? `${new Date(
                      exp.dates.startDate
                    ).getFullYear()} - ${new Date(
                      exp.dates.endDate
                    ).getFullYear()}`
                  : exp.dates?.startDate
                  ? new Date(exp.dates.startDate).getFullYear() + "- Present"
                  : exp.dates?.endDate
                  ? "End Date-" + new Date(exp.dates.endDate).getFullYear()
                  : ""}
                <p className="bold">{exp.position || "-"}</p>
                <p className="italic">
                  {exp.companyName || "-"}{" "}
                  {exp.companyAddress && `– ${exp.companyAddress}`}
                </p>
                {exp.workDescription && (
                  <p className="description">{exp.workDescription}</p>
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

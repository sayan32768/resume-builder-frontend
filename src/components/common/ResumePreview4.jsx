import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";

const ResumePreview4 = () => {
  const { control } = useFormContext();
  const data = useWatch({ control });

  const personal = data?.personalDetails || {};
  const education = data?.educationDetails || [];
  const experience = data?.professionalExperience || [];
  const projects = data?.projects || [];
  const otherExp = data?.otherExperience || [];
  const certifications = data?.certifications || [];
  const skills = data?.skills || [];

  const formatDateRange = (dates) => {
    if (!dates) return "";
    const { startDate, endDate } = dates;
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (start && end && !isNaN(start) && !isNaN(end))
      return `${start.getFullYear()} - ${end.getFullYear()}`;
    if (start && !isNaN(start)) return `${start.getFullYear()} - Present`;
    if (end && !isNaN(end)) return `Ended ${end.getFullYear()}`;
    return "";
  };

  return (
    <div className="resume-container">
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
        .resume-container * {
             font-family: "Outfit", sans-serif !important;
        }
        .resume-container {
          display: flex;
          width: 210mm;
          height: 297mm;
          background-color: #ffffff;
          overflow: hidden;
          box-sizing: border-box;
        }
        .left-section {
          width: 35%;
          background-color: #1f2937;
          color: #f9fafb;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .right-section {
          width: 65%;
          padding: 36px 40px;
          color: #111827;
          display: flex;
          flex-direction: column;
        }
        .section-title {
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          border-bottom: 1px solid #ffffff;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        .contact-info, .edu-entry, .cert-entry {
          font-size: 13px;
          line-height: 1.6;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .edu-entry p, .cert-entry p {
          margin: 0;
        }
        .skill-list {
          font-size: 13px;
          list-style: disc;
          padding-left: 18px;
        }
        .language {
          font-size: 13px;
        }
        .header-name {
          font-size: 32px;
          font-weight: 800;
          color: #111827;
          margin-bottom: 4px;
        }
        .header-title {
          font-size: 16px;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 20px;
        }
        .section-block {
          margin-bottom: 20px;
        }
        .section-heading {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 4px;
          margin-bottom: 8px;
        }
        .about-text, .proj-desc, .other-desc {
          font-size: 13px;
          color: #374151;
          line-height: 1.6;
        }
        .exp-date {
          font-size: 13px;
          color: #6b7280;
          font-weight: 500;
        }
        .exp-company {
          font-weight: 700;
          font-size: 14px;
          color: #111827;
        }
        .exp-position {
          font-weight: 600;
          font-size: 13px;
          color: #1d4ed8;
        }
        .exp-list {
          font-size: 13px;
          line-height: 1.5;
        }
        .proj-title {
          font-weight: 700;
          font-size: 14px;
        }
        .proj-links {
          padding-left: 16px;
        }
        .proj-links a {
          color: #2563eb;
          text-decoration: underline;
          font-size: 13px;
        }
      `}</style>

      <div className="left-section">
        <div>
          <h2 className="section-title">Contact</h2>
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={14} /> {personal.email || "you@example.com"}
            </div>
            <div className="contact-item">
              <Phone size={14} /> {personal.phone || "+91 XXXXXXXXXX"}
            </div>
            <div className="contact-item">
              <MapPin size={14} /> {personal.address || "Your Address"}
            </div>
            {personal.socials?.map((s, i) => (
              <div key={i} className="contact-item">
                {s.name?.toLowerCase() === "linkedin" && <Linkedin size={14} />}
                {s.name?.toLowerCase() === "github" && <Github size={14} />}
                {s.name?.toLowerCase() === "twitter" && <Twitter size={14} />}
                <span>
                  {s.name}:{" "}
                  {s.link ? (
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#93c5fd" }}
                    >
                      {s.link}
                    </a>
                  ) : (
                    "-"
                  )}
                </span>
              </div>
            ))}
          </div>

          {education.length > 0 && (
            <>
              <h2 className="section-title" style={{ marginTop: "24px" }}>
                Education
              </h2>
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="edu-entry"
                  style={{ marginBottom: "12px" }}
                >
                  <p style={{ fontWeight: 600 }}>
                    {edu.degree || "Degree"} {edu.name && `• ${edu.name}`}
                  </p>
                  {edu.location && (
                    <p style={{ color: "#d1d5db" }}>{edu.location}</p>
                  )}
                  <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                    {formatDateRange(edu.dates)}
                  </p>
                  {edu.grades?.score && edu.grades?.type && (
                    <p style={{ color: "#d1d5db" }}>
                      {edu.grades.type === "CGPA"
                        ? `CGPA: ${edu.grades.score}`
                        : `Percentage: ${edu.grades.score}%`}
                    </p>
                  )}
                </div>
              ))}
            </>
          )}

          {skills.length > 0 && (
            <>
              <h2 className="section-title" style={{ marginTop: "24px" }}>
                Skills
              </h2>
              <ul className="skill-list">
                {skills.map((s, i) => (
                  <li key={i}>{s.skillName}</li>
                ))}
              </ul>
            </>
          )}

          {certifications.length > 0 && (
            <>
              <h2 className="section-title" style={{ marginTop: "24px" }}>
                Certifications
              </h2>
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="cert-entry"
                  style={{ marginBottom: "12px" }}
                >
                  {cert.issueDate && (
                    <p style={{ fontStyle: "italic", color: "#9ca3af" }}>
                      ({new Date(cert.issueDate).getFullYear()})
                    </p>
                  )}
                  <p style={{ fontWeight: 600 }}>
                    {cert.title || "Certificate Title"}
                  </p>
                  <p style={{ color: "#d1d5db" }}>
                    {cert.issuingAuthority || "Authority"}
                  </p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#93c5fd", fontSize: "12px" }}
                    >
                      {cert.link}
                    </a>
                  )}
                </div>
              ))}
            </>
          )}

          {personal.languages && (
            <>
              <h2 className="section-title" style={{ marginTop: "24px" }}>
                Languages
              </h2>
              <p className="language">
                {personal.languages?.length > 0
                  ? personal.languages.join(", ")
                  : "English"}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="right-section">
        <div>
          <h1 className="header-name">{personal.fullName || "Your Name"}</h1>
        </div>

        {personal.about && (
          <section className="section-block">
            {/* <h2 className="section-heading">About Me</h2> */}
            <p className="about-text">{personal.about}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="section-block">
            <h2 className="section-heading">Professional Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <p className="exp-date">{formatDateRange(exp.dates)}</p>
                <p className="exp-company">
                  {exp.companyName || "Company Name"}
                </p>
                {exp.companyAddress && <p>{exp.companyAddress}</p>}
                <p className="exp-position">{exp.position || "Position"}</p>
                {exp.workDescription && (
                  <p className="exp-list">{exp.workDescription}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section className="section-block">
            <h2 className="section-heading">Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <p className="proj-title">
                  {proj.title || proj.name || "Project Title"}
                </p>
                {proj.description && (
                  <p className="proj-desc">{proj.description}</p>
                )}
                {proj.extraDetails && (
                  <p className="proj-desc">{proj.extraDetails}</p>
                )}
                {proj.links?.length > 0 && (
                  <ul className="proj-links">
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

        {otherExp.length > 0 && (
          <section className="section-block">
            <h2 className="section-heading">Other Experience</h2>
            {otherExp.map((exp, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <p className="exp-date">{formatDateRange(exp.dates)}</p>
                <p className="proj-title">{exp.position || "Position"}</p>
                <p className="about-text">
                  {exp.companyName || "Company Name"}{" "}
                  {exp.companyAddress && `– ${exp.companyAddress}`}
                </p>
                {exp.workDescription && (
                  <p className="other-desc">{exp.workDescription}</p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview4;

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";

const styles = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Times-Roman", fontSize: 12 },
  leftSection: {
    width: "35%",
    backgroundColor: "#1f2937",
    color: "#f9fafb",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  rightSection: {
    width: "65%",
    padding: 24,
    color: "#111827",
    display: "flex",
    flexDirection: "column",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
  },
  contactItem: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  headerName: { fontSize: 24, fontWeight: 800, marginBottom: 4 },
  headerTitle: { fontSize: 14, color: "#6b7280", marginBottom: 12 },
  sectionBlock: { marginBottom: 12 },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 4,
  },
  text: { fontSize: 10, marginBottom: 2 },
  list: { marginLeft: 6 },
});

const ResumePDFClassic = ({ data }) => {
  const personal = data?.personalDetails || {};
  const education = Array.isArray(data?.educationDetails)
    ? data.educationDetails
    : [];
  const experience = Array.isArray(data?.professionalExperience)
    ? data.professionalExperience
    : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const otherExp = Array.isArray(data?.otherExperience)
    ? data.otherExperience
    : [];
  const certifications = Array.isArray(data?.certifications)
    ? data.certifications
    : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];

  const IconMap = { linkedin: Linkedin, github: Github, twitter: Twitter };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.leftSection}>
          {personal && (
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Contact</Text>

              <Text style={styles.text}>{personal.email || "-"}</Text>

              <Text style={styles.text}>{personal.phone || "-"}</Text>

              <Text style={styles.text}>{personal.address || "-"}</Text>

              {(personal.socials || []).map((s, i) => {
                const Icon = IconMap[s.name?.toLowerCase()] || null;
                return (
                  <View key={i} style={styles.contactItem}>
                    {Icon && <Icon size={10} />}
                    <Text>{`${s.name || "-"}: ${s.link || "-"}`}</Text>
                  </View>
                );
              })}
            </View>
          )}

          {(education || []).length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, i) => (
                <View key={i} style={styles.sectionBlock}>
                  <Text style={{ fontWeight: 600 }}>{edu.degree || "-"}</Text>
                  <Text style={{ color: "#d1d5db" }}>{edu.name || "-"}</Text>
                  <Text style={{ fontSize: 10, color: "#9ca3af" }}>
                    {edu.dates?.startDate
                      ? new Date(edu.dates.startDate).getFullYear()
                      : "-"}{" "}
                    -{" "}
                    {edu.dates?.endDate
                      ? new Date(edu.dates.endDate).getFullYear()
                      : "-"}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {(skills || []).length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {skills.map((s, i) => (
                <Text key={i} style={styles.text}>
                  • {s.skillName || "-"}
                </Text>
              ))}
            </View>
          )}

          {(certifications || []).length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {certifications.map((cert, i) => (
                <View key={i} style={styles.sectionBlock}>
                  <Text style={{ fontWeight: 600 }}>{cert.title || "-"}</Text>
                  <Text style={{ color: "#d1d5db" }}>
                    {cert.issuingAuthority || "-"}
                  </Text>
                  <Text>{cert.link || "-"}</Text>
                </View>
              ))}
            </View>
          )}

          {(personal.languages || []).length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <Text>{personal.languages.join(", ")}</Text>
            </View>
          )}
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.headerName}>{personal.fullName || "-"}</Text>
          <Text style={styles.headerTitle}>{personal.title || "-"}</Text>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>About Me</Text>
            <Text style={styles.text}>{personal.about || "-"}</Text>
          </View>

          {(experience || []).length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionHeading}>Work Experience</Text>
              {experience.map((exp, i) => (
                <View key={i} style={styles.sectionBlock}>
                  <Text style={styles.text}>
                    {exp.position || "-"} at {exp.companyName || "-"} (
                    {exp.dates?.startDate
                      ? new Date(exp.dates.startDate).toLocaleDateString(
                          "default",
                          { month: "short", year: "numeric" }
                        )
                      : "-"}{" "}
                    -{" "}
                    {exp.dates?.endDate
                      ? new Date(exp.dates.endDate).toLocaleDateString(
                          "default",
                          { month: "short", year: "numeric" }
                        )
                      : "-"}
                    )
                  </Text>
                  {(exp.workDescription || "").split(".").map((task, idx) =>
                    task.trim() ? (
                      <Text key={idx} style={styles.list}>
                        • {task.trim()}.
                      </Text>
                    ) : null
                  )}
                </View>
              ))}
            </View>
          )}

          {(projects || []).length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionHeading}>Projects</Text>
              {projects.map((proj, i) => (
                <View key={i} style={styles.sectionBlock}>
                  <Text style={{ fontWeight: 600 }}>
                    {proj.title || proj.name || "-"}
                  </Text>
                  <Text style={styles.text}>{proj.description || "-"}</Text>
                  <Text style={styles.text}>{proj.extraDetails || "-"}</Text>
                  {(proj.links || []).map((link, idx) => (
                    <Text key={idx} style={styles.text}>
                      • {link.link || "-"}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {(otherExp || []).length > 0 && (
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionHeading}>Other Experience</Text>
              {otherExp.map((exp, i) => (
                <View key={i} style={styles.sectionBlock}>
                  <Text style={{ fontWeight: 600 }}>{exp.position || "-"}</Text>
                  <Text style={styles.text}>{exp.companyName || "-"}</Text>
                  <Text style={styles.text}>{exp.workDescription || "-"}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDFClassic;

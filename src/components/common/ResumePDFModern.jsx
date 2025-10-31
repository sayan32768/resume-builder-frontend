import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    width: "210mm",
    height: "297mm",
    backgroundColor: "#ffffff",
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  leftColumn: {
    width: "35%",
    backgroundColor: "#f7f2f0",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  rightColumn: {
    width: "65%",
    padding: 32,
  },
  sectionTitle: {
    textTransform: "uppercase",
    color: "#b37d6b",
    fontWeight: 600,
    marginBottom: 8,
    letterSpacing: 1,
    fontSize: 12,
  },
  listItem: {
    marginBottom: 4,
  },
  bold: { fontWeight: "bold" },
  semibold: { fontWeight: 600 },
  italic: { fontStyle: "italic" },
  description: { color: "#374151", marginBottom: 4 },
  header: {
    borderBottom: 4,
    borderBottomColor: "#b37d6b",
    paddingBottom: 16,
    marginBottom: 24,
  },
  headerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#b37d6b",
    textTransform: "uppercase",
  },
  headerAbout: {
    textAlign: "center",
    fontSize: 12,
    color: "#4b5563",
    marginTop: 4,
  },
  section: { marginBottom: 24 },
});

const ResumePDFModern = ({ data }) => {
  const personal = data?.personalDetails || {};
  const education = Array.isArray(data?.educationDetails)
    ? data.educationDetails
    : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const experience = Array.isArray(data?.professionalExperience)
    ? data.professionalExperience
    : [];
  const otherExp = Array.isArray(data?.otherExperience)
    ? data.otherExperience
    : [];
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const certifications = Array.isArray(data?.certifications)
    ? data.certifications
    : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.leftColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <Text style={styles.listItem}>{personal.phone || "-"}</Text>
            <Text style={styles.listItem}>{personal.email || "-"}</Text>
            <Text style={styles.listItem}>{personal.address || "-"}</Text>
            {(personal.socials || []).map((s, i) => (
              <Text style={styles.listItem} key={i}>
                {s?.name || "-"}: {s?.link || "-"}
              </Text>
            ))}
          </View>

          {(education || []).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {(education || []).map((edu, i) => {
                const startYear = edu?.dates?.startDate
                  ? new Date(edu.dates.startDate).getFullYear()
                  : "-";
                const endYear = edu?.dates?.endDate
                  ? new Date(edu.dates.endDate).getFullYear()
                  : "-";
                return (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={styles.italic}>
                      {startYear} - {endYear}
                    </Text>
                    <Text style={styles.bold}>{edu?.degree || "-"}</Text>
                    <Text style={styles.italic}>{edu?.name || "-"}</Text>
                    <Text>{edu?.location || "-"}</Text>
                    {edu?.grades?.score && (
                      <Text>
                        {edu.grades.type || "-"}: {edu.grades.score}{" "}
                        {edu.grades.message ? `(${edu.grades.message})` : ""}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          )}

          {(skills || []).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Key Skills</Text>
              {(skills || []).map((s, i) => (
                <Text style={styles.listItem} key={i}>
                  {s?.skillName || "-"}
                </Text>
              ))}
            </View>
          )}

          {(certifications || []).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {(certifications || []).map((cert, i) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={styles.italic}>
                    {cert?.issueDate
                      ? new Date(cert.issueDate).getFullYear()
                      : "-"}
                  </Text>
                  <Text style={styles.bold}>{cert?.title || "-"}</Text>
                  <Text>{cert?.issuingAuthority || "-"}</Text>
                  <Text>{cert?.link || "-"}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.header}>
            <Text style={styles.headerName}>{personal?.fullName || "-"}</Text>
            <Text style={styles.headerAbout}>{personal?.about || "-"}</Text>
          </View>

          {(experience || []).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {(experience || []).map((exp, i) => {
                const start = exp?.dates?.startDate
                  ? new Date(exp.dates.startDate).toLocaleDateString()
                  : "-";
                const end = exp?.dates?.endDate
                  ? new Date(exp.dates.endDate).toLocaleDateString()
                  : "-";
                const tasks = (exp?.workDescription || "").split(".");
                return (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={styles.semibold}>
                      {start} - {end}
                    </Text>
                    <Text style={styles.bold}>{exp?.position || "-"}</Text>
                    <Text style={styles.italic}>
                      {exp?.companyName || "-"} {exp?.companyAddress || ""}
                    </Text>
                    {tasks.map(
                      (task, idx) =>
                        task.trim() && (
                          <Text style={styles.description} key={idx}>
                            • {task.trim()}.
                          </Text>
                        )
                    )}
                  </View>
                );
              })}
            </View>
          )}

          {(projects || []).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {(projects || []).map((proj, i) => {
                const links = proj?.links || [];
                return (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={styles.bold}>
                      {proj?.title || proj?.name || "-"}
                    </Text>
                    <Text style={styles.description}>
                      {proj?.description || "-"}
                    </Text>
                    <Text style={styles.description}>
                      {proj?.extraDetails || "-"}
                    </Text>
                    {links.map((l, idx) => (
                      <Text key={idx} style={styles.listItem}>
                        {l?.link || "-"}
                      </Text>
                    ))}
                  </View>
                );
              })}
            </View>
          )}

          {(otherExp || []).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Other Experience</Text>
              {(otherExp || []).map((exp, i) => {
                const start = exp?.dates?.startDate
                  ? new Date(exp.dates.startDate).toLocaleDateString()
                  : "-";
                const end = exp?.dates?.endDate
                  ? new Date(exp.dates.endDate).toLocaleDateString()
                  : "-";
                return (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={styles.semibold}>
                      {start} - {end}
                    </Text>
                    <Text style={styles.bold}>{exp?.position || "-"}</Text>
                    <Text style={styles.italic}>
                      {exp?.companyName || "-"} {exp?.companyAddress || ""}
                    </Text>
                    <Text style={styles.description}>
                      {exp?.workDescription || "-"}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDFModern;

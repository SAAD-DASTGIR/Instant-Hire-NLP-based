import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import emailIcon from "../../img/email.png";
import locationIcon from "../../img/location.png";
import telephoneIcon from "../../img/telephone.png";
import educationIcon from "../../img/educationIcon.png";
import experianceIcon from "../../img/experianceIcon.png";
import certificationsIcon from "../../img/certificationsIcon.png";
import skillsIcon from "../../img/skillsIcon.png";

// CV Component styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: "1cm",
  },
  section: {
    marginBottom: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  bigHeadings: {
    fontSize: "1.5cm",
    color: "#26a1c7",
  },
  headings: {
    fontSize: "0.7cm",
    marginBottom: 7,
  },
  subHeadings: {
    fontSize: "0.5cm",
    marginBottom: 7,
  },
  miniHeadings: {
    fontSize: "0.5cm",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 7,
    marginBottom: 7,
  },
});

const CV = ({
  name,
  email,
  address,
  contactNumber,
  about,
  education,
  certification,
  experiance,
  skill,
}) => {
  return (
    <Document pageMode="fullScreen" pageLayout="oneColumn">
      <Page size="A4" style={styles.page}>
        {/* Section desplaying name */}
        <View style={styles.section}>
          <Text style={styles.bigHeadings}>{name}</Text>
        </View>
        <View style={styles.section}>
          {/* Section desplaying email */}
          {email && (
            <div style={styles.container}>
              <Image style={styles.icon} src={emailIcon} />
              <Text style={styles.subHeadings}>{email}</Text>
            </div>
          )}
          {/* Section desplaying contact */}
          {contactNumber && (
            <div style={styles.container}>
              <Image style={styles.icon} src={telephoneIcon} />
              <Text style={styles.subHeadings}>{contactNumber}</Text>
            </div>
          )}
          {/* Section desplaying address */}
          {address && (
            <div style={styles.container}>
              <Image style={styles.icon} src={locationIcon} />
              <Text style={styles.subHeadings}>{address}</Text>
            </div>
          )}
        </View>
        {/* Section desplaying about */}
        <View style={styles.section}>
          <Text style={styles.subHeadings}>{about}</Text>
        </View>
        {/* Section desplaying Education */}
        <View style={styles.section}>
          {education && (
            <div style={styles.container}>
              <Image style={styles.icon} src={educationIcon} />
              <Text style={styles.headings}>Education</Text>
            </div>
          )}
          {education &&
            education.map((edu) => (
              <div style={styles.section}>
                <Text style={styles.miniHeadings}>{edu.institution}</Text>
                <Text style={styles.miniHeadings}>{edu.degree}</Text>
                <Text style={styles.miniHeadings}>{edu.grades}</Text>
              </div>
            ))}
        </View>
        {/* Section desplaying Experiance */}
        <View style={styles.section}>
          {experiance && (
            <div style={styles.container}>
              <Image style={styles.icon} src={experianceIcon} />
              <Text style={styles.headings}>Experiance</Text>
            </div>
          )}
          {experiance &&
            experiance.map((exp) => (
              <div style={styles.section}>
                <Text style={styles.miniHeadings}>{exp.company}</Text>
                <Text style={styles.miniHeadings}>
                  {exp.jobTitle} - {exp.duaration}
                </Text>
                <Text style={styles.miniHeadings}>{exp.responsiblites}</Text>
              </div>
            ))}
        </View>
        {/* Section desplaying Certification */}
        <View style={styles.section}>
          {certification && (
            <div style={styles.container}>
              <Image style={styles.icon} src={certificationsIcon} />
              <Text style={styles.headings}>Certifications</Text>
            </div>
          )}
          {certification &&
            certification.map((cert) => (
              <div style={styles.section}>
                <Text style={styles.miniHeadings}>{cert.name}</Text>
              </div>
            ))}
        </View>
        {/* Section desplaying Skills */}
        <View style={styles.section}>
          {skill && (
            <div style={styles.container}>
              <Image style={styles.icon} src={skillsIcon} />
              <Text style={styles.headings}>Skills</Text>
            </div>
          )}
          {skill &&
            skill.map((skl) => (
              <div style={styles.section}>
                <Text style={styles.miniHeadings}>{skl.name}</Text>
              </div>
            ))}
        </View>
      </Page>
    </Document>
  );
};

export default CV;

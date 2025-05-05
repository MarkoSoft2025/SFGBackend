const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const childrenProfileRoutes = require("./routes/childrenProfileRoutes");
const eligibilityRoutes = require("./routes/eligibilityRoutes");
const trainingProgramRoutes = require("./routes/trainingProgramRoutes");
const voluntaryWorkRoutes = require("./routes/voluntaryWorkRoutes");
const workExperienceRoutes = require("./routes/workExperienceRoutes");
const referencesRoutes = require("./routes/referencesRoutes");
const otherInformationRoutes = require("./routes/otherInformationRoutes");
const familyBackgroundRoutes = require("./routes/familyBackgroundRoutes");
const facultyProfileRoutes = require("./routes/facultyProfileRoutes");
const educationalBackgroundRoutes = require("./routes/educationalBackgroundRoutes");
// const subjectRoutes = require("./routes/subjectRoutes");





const app = express();
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes


app.use("/api/childrenProfile", childrenProfileRoutes);
app.use("/api/Eligibility", eligibilityRoutes);
app.use("/api/TrainingPrograms", trainingProgramRoutes);
app.use("/api/VoluntaryWork", voluntaryWorkRoutes);
app.use("/api/WorkExperience", workExperienceRoutes);
app.use("/api/References", referencesRoutes);
app.use("/api/OtherInformation", otherInformationRoutes);
app.use("/api/FamilyBackground", familyBackgroundRoutes);
app.use("/api/FacultyProfile", facultyProfileRoutes);
app.use("/api/EducationalBackground", educationalBackgroundRoutes);
app.use("/api/Students", studentRoutes);
app.use("/api/Employees", employeeRoutes);
// app.use("/api/Subjects", subjectRoutes);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

// Export the app for Vercel
module.exports = app;
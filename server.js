const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const StudentFamilyBackgroundRoutes = require("./routes/studentFamilyBackgroundRoutes");
const StudentCoursesRoutes = require("./routes/studentCoursesRoutes");
const CoursesRoutes = require("./routes/coursesRoutes");
const CredentialsRoutes = require("./routes/credentialsRoutes");
const EmployeeRoutes = require("./routes/employeeRoutes");
const AverageGradeRoutes = require("./routes/averageGradeRoutes");
const OtherInformationRoutes = require("./routes/otherInformationRoutes");
const AnnouncementRoutes = require("./routes/announcementRoutes");
const CommentsRoutes = require("./routes/commentsRoutes");
const ReactionRoutes = require("./routes/reactionRoutes");
const authRoutes = require("./routes/authRoutes");
const authUserRoutes = require("./routes/authUserRoutes");
const Messages = require("./routes/messagesRoutes");
const StudentFriend = require("./routes/studentFriendRoutes");

const app = express();
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes

app.use("/api/Students", studentRoutes);

//app.use("/api/ContractLogs", contractLogsRoutes);
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

// Export the app for Vercel
module.exports = app;
const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes

app.use("/api/Students", studentRoutes);
app.use("/api/Employees", employeeRoutes);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

// Export the app for Vercel
module.exports = app;
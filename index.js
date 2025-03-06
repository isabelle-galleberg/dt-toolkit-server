const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/ideas", require("./routes/ideaRoutes"));
app.use("/api/personas", require("./routes/personaRoutes"));
app.use("/api/persona-cards", require("./routes/personaCardRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/define", require("./routes/defineRoutes"));
app.use("/api/spot-scam", require("./routes/spottedScamRoutes"));

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.error(err));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

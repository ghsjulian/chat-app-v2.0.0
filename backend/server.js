// Requiring packages...
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
// Environment Variables...
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

// Declaring Global Variables...
const uploadPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadPath));
app.use(express.json({ limit: "500mb" }));

// Setup  CORS Configuration...
app.use(
    cors({
        origin: ["http://localhost:5000"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
        maxAge: 86400
    })
);

// Use Middlewares...
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Create Mongoose Connection...
require("./configs/db.connection.js")();

// Defined API here...
app.use("/api", require("./routes/auth.routes"));
app.use("/api", require("./routes/message.routes"));

// For Seeding Some Dummy Users
// require("./user.seed")();

app.listen(PORT, () => {
    console.log(`\n[+]  Server Running -- http://${HOST}:${PORT}`);
});

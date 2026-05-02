import exp from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { connect } from "mongoose";
import { config } from "dotenv";
import registerRouter from './APIs/registerAPI.js';
import loginRouter from './APIs/loginAPI.js';
import logoutRouter from './APIs/logoutAPI.js';
import profileRouter from './APIs/profileAPI.js';

config();

const app = exp();

// Security & Middleware
app.use(helmet()); 
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(exp.json());

// Database Connection
const connectdb = async () => {
    try {
        await connect(process.env.DB_URL);
        console.log("Database connected successfully");
        
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (err) {
        console.error("Critical: Database connection failed", err);
        process.exit(1);
    }
}

connectdb();

// Routes 
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/profile", profileRouter);

// Invalid path handler
app.use((req, res) => {
    res.status(404).json({ message: `Path ${req.url} is invalid` });
});

// Global Error Handler
app.use((err, req, res, next) => {
    const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
    const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

    if (err.name === "ValidationError" || err.name === "CastError") {
        return res.status(400).json({ message: "Validation failed", error: err.message });
    }

    if (errCode === 11000) {
        const field = Object.keys(keyValue)[0];
        return res.status(409).json({
            message: "Duplicate entry",
            error: `${field} already exists`,
        });
    }

    res.status(500).json({ message: "Internal Server Error" });
});
import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";

//create Express app and http server

const app = express();
const server = http.createServer(app); //because socket.io(web sockets-used for real-time communication) uses it

//Middleware setup
app.use(express.json({ limit: "4mb" })); //so that i can use json in body
app.use(cors());

//routes setup
app.use("/api/status", (req, res) => res.send("server is live"));
app.use("/api/auth", userRouter);

await connectDB();
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on PORT: " + PORT));

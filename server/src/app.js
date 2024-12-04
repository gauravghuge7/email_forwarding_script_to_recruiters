
import express from "express";
import cors from "cors";
import emailRouter from "./routes/Connect.routes.js";
import morgan from "morgan"

const app = express();



app.use(morgan("dev"));




app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({
   extended: true
}))


app.use("/api", emailRouter)



app.get("/", (req, res) => {
   res.send("Hello World!");
});


export default app;
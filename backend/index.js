import express from "express";
import { PORT, MongodbURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import kittiesRoute from  "./routes/kittiesRoute.js"

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://localhost:3000",
    methods: ["GET", "POST", "PUT" , "DELETE"],
    allowedHeaders: ['Content-Type']
}));

app.get("/", (req, res) => {
    return res.status(666).send("I AM HERE")
})

app.use("/kitties", kittiesRoute)


mongoose
    .connect(MongodbURL)
    .then(() => {console.log("db connecteeed!")
        app.listen(PORT, () => console.log("server is running on 8080"));
    })
    .catch((err) => console.log(`here is the problem: ${err}`))
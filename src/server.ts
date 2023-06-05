//Needed modules.
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

//App is created and modules are activated.
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
dotenv.config();

//Creation and setting of an endpoint.
app.get("/", async (req, res) => {
	res.status(200).json("hello!");
});

//Server listening
const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
	console.log(`Listening on ${SERVER_PORT}`);
});

//Needed modules.
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import firstEndpoint from "./firstStageEndpoints.js";
import { defaultErrorHandler } from "./utils.js";

//App is created and modules are activated.
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
dotenv.config();
app.use(defaultErrorHandler);

//Creation and setting an endpoint route.
app.use(["/disease", "/gene", "/patient", "/phenotype"], firstEndpoint);

//All errors shoould end up here.
app.use(defaultErrorHandler);

//Server listening
const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
	console.log(`Listening on ${SERVER_PORT}`);
});

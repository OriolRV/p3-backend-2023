//Import and activate needed modules.
import prisma from "./prisma-client.js";
import { Request, Router } from "express";
import { errorChecked } from "./utils.js";
const router = Router();

//Endpoints map

//Basic GET endpoint for all entities.
router.get(
	"/",
	errorChecked(async (req, res) => {
		const target = req.originalUrl.split("/")[1];
		const result = await prisma[target].findMany({});
		res.status(200).json({ [target]: result, ok: true });
	})
);

//POST

//Exports the endpoints created in this file.
export default router;

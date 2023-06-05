//Import and activate needed modules.
import prisma from "./prisma-client.js";
import { Request, Router } from "express";
const router = Router();

//Test endpoint
router.get("/", async (req, res) => {
	try {
		const result = await prisma.disease.findMany({});
		res.status(200).json(result);
	} catch (e) {
		res.status(500).json({
			type: e.constructor.name,
			message: e.toString(),
		});
	}
});

//Exports the endpoints created in this file.
export default router;

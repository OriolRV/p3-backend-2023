//Import and activate needed modules.
import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";
const router = Router();

//GET endpoint for a complete diangosis of a specific patient.
router.get(
	"/",
	errorChecked(async (req, res) => {
		const target = req.originalUrl.split("/")[2];
		const result = await prisma.patient.findUnique({
			where: { id: Number(target) },
			include: {
				diagnosedDiseases: {
					include: { associatedPhenotype: true, causingGenes: true },
				},
			},
		});
		res.status(200).json(result);
	})
);

export default router;

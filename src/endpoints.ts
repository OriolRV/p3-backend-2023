//Import and activate needed modules.
import prisma from "./prisma-client.js";
import { Router } from "express";
import { errorChecked, RequestWithId } from "./utils.js";
const router = Router();

//Endpoints map
//GET all [entity name] entries.
//GET a specific [entity name] entry by ID.
//DELETE a specific [entity name] entry by ID.

//Store request's ID in requests's body
router.use("/:id", async (req: RequestWithId, res, next) => {
	const { id } = req.params;
	req.requestId = Number(id);
	next();
});

//GET endpoint for all entries of a specific entity type.
router.get(
	"/",
	errorChecked(async (req, res) => {
		const target = req.originalUrl.split("/")[1];
		const result = await prisma[target].findMany({});
		res.status(200).json({ [target + "s"]: result, ok: true });
	})
);

//GET endpoint for a specific entry of a specific entity type.
router.get(
	"/:id",
	errorChecked(async (req, res) => {
		const target = req.originalUrl.split("/")[1];
		const result = await prisma[target].findUnique({
			where: { id: Number(req.params.id) },
		});
		if (result === null) {
			return res.status(404).json({
				error: `${target} with ID ${req.params.id} not found`,
			});
		} else {
			res.status(200).json(result);
		}
		res.status(200).json({ [target + "s"]: result, ok: true });
	})
);

//POST
//PUT

//DELETE endpoint for a specific entry of a specific entity type
router.delete(
	"/:id",
	errorChecked(async (req, res) => {
		const target = req.originalUrl.split("/")[1];
		const result = await prisma[target].delete({
			where: { id: Number(req.params.id) },
		});
		res.status(200).json(result);
	})
);

//Exports the endpoints created in this file.
export default router;

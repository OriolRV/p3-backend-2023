//Type import
import { ErrorRequestHandler, RequestHandler } from "express";

//Function to handle errors, just onwe type at the momment (should be expanded)
export const defaultErrorHandler: ErrorRequestHandler = (
	err,
	req,
	res,
	next
) => {
	res.status(500).json({
		type: err.constructor.name,
		message: err.toString(),
	});
};

//General try and catch function.
export const errorChecked = (handler: RequestHandler): RequestHandler => {
	return async (req, res, next) => {
		try {
			await handler(req, res, next);
		} catch (e) {
			next(e);
		}
	};
};

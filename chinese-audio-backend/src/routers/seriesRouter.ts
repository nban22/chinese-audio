import { Router } from "express";
import * as seriesController from "../controllers/seriesController";

const seriesRouter = Router();

seriesRouter.get("/", seriesController.getSeriesList);
seriesRouter.get("/:id", seriesController.getSeriesById);

export default seriesRouter;

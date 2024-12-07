import { Router } from "express";

import * as audioController from "../controllers/audioController";
import upload from "../config/multer";

const audioRouter = Router();

audioRouter.get("/", audioController.getAllAudios);
audioRouter.post("/", upload.single("audio"), audioController.uploadAudio);

audioRouter.get("/:id", audioController.getAudio);
audioRouter.post("/:id", audioController.updateAudio);
audioRouter.delete("/:id", audioController.deleteAudio);

export default audioRouter;

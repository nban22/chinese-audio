import { Router } from "express";

import * as audioController from "../controllers/audioController";
import upload from "../config/multer";

const audioRouter = Router();

audioRouter.get("/", audioController.getAllAudios);
audioRouter.post("/", upload.any(), audioController.uploadAudio);
// audioRouter.post("/multi", upload.array("audios", 5), audioController.uploadAudio);

audioRouter.get("/:id", audioController.getAudio);
audioRouter.put("/:id", upload.any(), audioController.updateAudio);
audioRouter.delete("/:id", audioController.deleteAudio);

export default audioRouter;

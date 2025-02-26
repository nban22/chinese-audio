import { Router } from "express";

import * as audioController from "../controllers/audioController";
import { uploadAudio } from "../config/multer";

const audioRouter = Router();

audioRouter.get("/", audioController.getAllAudios);
audioRouter.post("/", uploadAudio.any(), audioController.uploadAudio);
// audioRouter.post("/multi", upload.array("audios", 5), audioController.uploadAudio);

audioRouter.get("/:id", audioController.getAudio);
audioRouter.put("/:id", uploadAudio.any(), audioController.updateAudio);
audioRouter.delete("/:id", audioController.deleteAudio);

export default audioRouter;

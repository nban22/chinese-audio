import express from "express";

import * as audioController  from "../controllers/audioController";
import upload from "../config/multer";

const router = express.Router();

router.get("/", audioController.getAllAudios);
router.post("/", upload.single('audio'), audioController.uploadAudio);

router.get("/:id", audioController.getAudio);
router.post("/:id", audioController.updateAudio);
router.delete("/:id", audioController.deleteAudio);


export default router;

import express from "express";

import * as audioController  from "../controllers/audioController";

const router = express.Router();

router.get("/", audioController.getAllAudios);
router.post("/", audioController.createAudio);

router.get("/:id", audioController.getAudio);
router.post("/:id", audioController.updateAudio);
router.delete("/:id", audioController.deleteAudio);


export default router;

import express from "express";

import * as albumController from "../controllers/albumController";

const router = express.Router();

router.get("/", albumController.getAllAlbums);
router.post("/", albumController.createAlbum);
router.get("/:id", albumController.getAlbumById);

const albumRouter = router;
export default albumRouter;

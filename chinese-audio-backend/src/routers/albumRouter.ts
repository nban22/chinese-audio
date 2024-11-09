import express from "express";

import * as albumController from "../controllers/albumController";

const router = express.Router();

router.get("/", albumController.getAlbums);
router.post("/", albumController.createAlbum);
router.get("/:id", albumController.getAlbum);

const albumRouter = router;
export default albumRouter;

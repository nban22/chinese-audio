import express from "express";

import * as albumController from "../controllers/albumController";
import { uploadImage } from "../config/multer";

const router = express.Router();

router.get("/", albumController.getAllAlbums);
router.post("/", uploadImage.single("avatar"), albumController.createAlbum);
router.put("/:id", uploadImage.single("avatar"), albumController.updateAlbumById);
router.get("/:id", albumController.getAlbumById);
router.delete("/:id", albumController.deleteAlbum);

const albumRouter = router;
export default albumRouter;

import express from "express";

import * as albumListController from "../controllers/albumListController";

const router = express.Router();

router.get("/", albumListController.getAllAlbumLists);

router.get("/:id", albumListController.getAlbumList);
const albumListRouter = router;
export default albumListRouter;

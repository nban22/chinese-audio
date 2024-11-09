
import express from "express";

import * as albumListController from "../controllers/albumListController";

const router = express.Router();

router.get("/", albumListController.getAllAlbumLists);
const albumListRouter = router;
export default albumListRouter;

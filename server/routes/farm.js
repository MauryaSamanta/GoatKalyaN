import express from "express";
import { addfarm, exportToExcel } from "../controllers/farm.js";
import {getUserFarms, getUserFarms50, getFarmDetails, deleteFarm} from "../controllers/farm.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
//router.get("/",verifyToken, getFeedPosts);
 router.get("/:userid/farms", getUserFarms);
 router.get("/:userid/farm50", getUserFarms50);
 router.get("/:farmid", getFarmDetails);
 router.post("/:farmid",deleteFarm);
 router.post("/export/excel",exportToExcel);
// /* UPDATE */
// router.patch("/:id/like", likePost);

export default router;
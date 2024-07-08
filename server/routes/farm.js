import express from "express";
import { addfarm } from "../controllers/farm.js";
import {getUserFarms, getUserFarms50, getFarmDetails} from "../controllers/farm.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
//router.get("/",verifyToken, getFeedPosts);
 router.get("/:userid/farms", getUserFarms);
 router.get("/:userid/farm50", getUserFarms50);
 router.get("/:farmid", getFarmDetails);
// /* UPDATE */
// router.patch("/:id/like", likePost);

export default router;
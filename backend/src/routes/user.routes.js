import express from "express";
import {meUser, deleteUser, myFriends, allUsers} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/me", meUser);
router.delete("/me", deleteUser);
router.get("/friends", myFriends);
router.get("/all", allUsers);

export default router;

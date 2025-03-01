import  { Router } from "express";
import { signUp, login, logout } from "../controllers/user.controller.js";
import { upload } from "../middelware/multer.middelware.js";

const router = Router();

router.route("/signup").post(upload.single(
    "profile"
),
signUp
);

router.route("/login").post(login);

router.route("/logout").get(logout);

export default router;
import  { Router } from "express";
import { signUp, login, logout, protectedUser } from "../controllers/user.controller.js";
import { upload } from "../middelware/multer.middelware.js";
import { verifyJWT } from "../middelware/auth.middelware.js";

const router = Router();

router.route("/signup").post(upload.single(
    "profile"
),
signUp
);

router.route("/login").post(login);

router.route("/logout").get(verifyJWT, logout);

router.route("/protected").get(verifyJWT, protectedUser);

export default router;
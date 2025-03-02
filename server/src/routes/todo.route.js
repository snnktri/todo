import { Router } from "express";
import { verifyJWT } from "../middelware/auth.middelware.js";
import { addTodo, deleteTodo, updateTodo, getTodos } from "../controllers/todo.controller.js";

const router = Router();

router.route("/addTodo").post(verifyJWT,addTodo);
router.route("/deleteTodo/:id").delete(verifyJWT, deleteTodo);
router.route("/updateTodo/:id").put(verifyJWT, updateTodo);
router.route("/getTodos").get(verifyJWT, getTodos);

export default router;
import { Router } from "express";
import { verifyJWT } from "../middelware/auth.middelware.js";
import { addTodo, deleteTodo, updateTodo, getTodos } from "../controllers/todo.controller.js";

const router = Router();

router.route("/addtodo").post(verifyJWT,addTodo);
router.route("/deletetodo/:id").delete(verifyJWT, deleteTodo);
router.route("/updatetodo/:id").put(verifyJWT, updateTodo);
router.route("/gettodos").get(verifyJWT, getTodos);

export default router;
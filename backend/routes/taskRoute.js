import { Router } from "express";
import {
  createNewTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../controllers/taskController.js";

const router = Router();

router
  .route("/")
  .get(getAllTask)
  .post(createNewTask)
  .put(updateTask)
  .delete(deleteTask);
router.route("/:id").get(getTaskById);

export default router;

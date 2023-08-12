import { Router } from "express";
import {
  createNewTask,
  deleteTask,
  getTaskByStatus,
  getTaskById,
  updateTask,
} from "../controllers/taskController.js";

const router = Router();

router
  .route("/")
  .get(getTaskByStatus)
  .post(createNewTask)
  .put(updateTask)
  .delete(deleteTask);
router.route("/:id").get(getTaskById);

export default router;

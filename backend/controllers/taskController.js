import Task from "../models/taskModel.js";
import asyncHandler from "express-async-handler";

/**
 * @desc		Get all tasks
 * @route		GET /api/task
 * @access	public
 */

const getAllTask = asyncHandler(async (req, res) => {
  const allTask = await Task.find().lean();
  res.status(200).json(allTask);
});

/**
 * @desc		Get task by id
 * @route		GET /api/task/:id
 * @access	public
 */
const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).lean();
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(400).json({ message: "Task not found" });
  }
});

/**
 * @desc Create new task
 * @route POST /api/task
 * @access Private
 */
const createNewTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status } = req.body;

  // Confirm data
  if (!description || !title) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create and store the new task
  const task = await Task.create({ title, description, priority, status });

  if (task) {
    // Created
    return res.status(201).json({ message: "New task created" });
  } else {
    return res.status(400).json({ message: "Invalid task data received" });
  }
});

// @desc Update a task
// @route PUT /api/task
// @access Private
const updateTask = asyncHandler(async (req, res) => {
  const { id, title, description, priority, status } = req.body;

  // Confirm data
  if (!id || !title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm task exists to update
  const task = await Task.findById(id).exec();

  if (!task) {
    return res.status(400).json({ message: "Task not found" });
  }

  task.title = title;
  task.description = description;
  task.priority = priority;
  task.status = status;

  const updatedTask = await task.save();

  res.json(`'${updatedTask.title}' updated`);
});

// @desc Delete a task
// @route DELETE /tasks
// @access Private
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Task ID required" });
  }

  // Confirm task exists to delete
  const task = await Task.findById(id).exec();

  if (!task) {
    return res.status(400).json({ message: "Task not found" });
  }

  const result = await task.deleteOne();

  const reply = `Task '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

export { getAllTask, getTaskById, createNewTask, updateTask, deleteTask };

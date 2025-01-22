const Task = require("../Model/taskModel");


const getAllTasks = async (req, res, next) => {
    const { status } = req.query;  

    let tasks;
    try {
        if (status) {
            tasks = await Task.find({ status });
        } else {
            tasks = await Task.find();
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to retrieve tasks" });
    }

    if (!tasks || tasks.length === 0) {
        return res.status(404).json({ message: "No tasks found" });
    }

    return res.status(200).json({ tasks });
};


const addTask = async (req, res, next) => {
    const { taskName, description, status } = req.body;

    let task;
    try {
        task = new Task({ taskName, description, status });
        await task.save();
    } catch (err) {
        console.error("Error saving task:", err);
        return res.status(500).json({ message: "Failed to add task", error: err.message });
    }

    return res.status(201).json({ message: "Task added successfully", task });
};


const getTaskById = async (req, res, next) => {
    const id = req.params.id;

    let task;
    try {
        task = await Task.findById(id);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error retrieving task" });
    }

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ task });
};


const updateTask = async (req, res, next) => {
    const id = req.params.id;
    const { taskName, description, status } = req.body;

    let task;
    try {
        task = await Task.findByIdAndUpdate(
            id,
            { taskName, description, status },
            { new: true }
        );
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating task details" });
    }

    if (!task) {
        return res.status(404).json({ message: "Unable to update task details" });
    }

    return res.status(200).json({ message: "Task updated successfully", task });
};


const deleteTask = async (req, res, next) => {
    const id = req.params.id;

    let task;
    try {
        task = await Task.findByIdAndDelete(id);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting task" });
    }

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully", task });
};

module.exports = {
    getAllTasks,
    addTask,
    getTaskById,
    updateTask,
    deleteTask,
};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const TaskModel = require('../models/tasks');
require('dotenv').config();

exports.createTask = async (req, res) => {
    const { title } = req.body;
    const userId = req.user._id;
    try {
        const newTask = new TaskModel({ title, userId: userId });
        const task = await newTask.save();
        if (!task) {
            return res.status(400).json({ message: 'Error creating task' });
        }
        res.status(201).json(task);
    } catch (err) {
        return res.status(500).json({ message: 'Error creating task' });
    }
};

exports.getTasks = async (req, res) => {
    const userId = req.user._id;
    try {
        const tasks = await TaskModel.find({ userId: userId });
        res.status(200).json(tasks);
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching tasks' });
    }
};

exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await TaskModel.findOneAndDelete({ _id: taskId});
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting task' });
    }
};

exports.deleteAllTasks = async (req, res) => {
    const userId = req.user._id;
    try {
        await TaskModel.deleteMany({ userId: userId });
        res.status(200).json({ message: 'All tasks deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting tasks' });
    }
};

exports.updateTask = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user._id;
    const { title, completed } = req.body;
    try {
        const task = await TaskModel.findOneAndUpdate(
            { _id: taskId, userId: userId },
            { title, completed }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        return res.status(500).json({ message: 'Error updating task' });
    }
};
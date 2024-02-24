const Task = require('../model/task');
// const User = require('../model/user'); // Assuming you have a User model

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}, 'taskId title status');
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Task.find({}, 'assignedTo');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getTasksByGroup = async (req, res) => {
    try {
        const status = req.params.status;
        const tasks = await Task.find({ status });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getTaskDetails = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById({taskId} );
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ assignedTo: username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
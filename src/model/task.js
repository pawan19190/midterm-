const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskId: Number,
    title: String,
    desciption:  String,
    status: String,
    assignedTo: String,
})

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;
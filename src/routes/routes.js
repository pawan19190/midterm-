const express = require('express');
const router = express.Router();
const Task = require('../model/task');
const controller = require('../controllers/controller.js');
const middleware = require('../middleware/middleware.js');


router.get('/', middleware.logReadRequest, controller.getAllTasks);

router.get('/users', middleware.logNewRequest, controller.getAllUsers);

router.get('/tasks/status/:status', middleware.logReadRequest, controller.getTasksByGroup);

router.get('/task/:taskId', middleware.logFindRequest, controller.getTaskDetails);

router.get('/user/:username', middleware.logFindRequest, controller.getUserDetails);

module.exports = router;
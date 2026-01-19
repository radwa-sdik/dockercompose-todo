const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const taskController = require('../controllers/tasks');

router.get('/',authMiddleware, taskController.getTasks);

router.post('/add',authMiddleware, taskController.createTask);

router.patch('/update/:id',authMiddleware, taskController.updateTask);

router.delete('/delete/:id',authMiddleware, taskController.deleteTask);

router.delete('/deleteAll',authMiddleware, taskController.deleteAllTasks);

module.exports = router;
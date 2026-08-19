const Task = require("../models/Task");
const { validateTaskTitle } = require("../utils/validateTask");


async function getTasks(req, res, next) {

    try {

        const tasks = await Task.find()
            .sort({ createdAt: -1 });

        res.json(tasks);

    } catch (error) {
        next(error);
    }
}


async function createTask(req, res, next) {

    try {

        const validation = validateTaskTitle(req.body.title);

        if (!validation.valid) {

            return res.status(400).json({
                message: validation.message
            });
        }

        const task = await Task.create({
            title: validation.value
        });

        return res.status(201).json(task);

    } catch (error) {
        return next(error);
    }
}


async function deleteTask(req, res, next) {

    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {

            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }

        return res.json({
            message: "Tarea eliminada"
        });

    } catch (error) {
        return next(error);
    }
}


module.exports = {
    getTasks,
    createTask,
    deleteTask
};
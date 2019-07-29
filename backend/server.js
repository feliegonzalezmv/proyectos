const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Routes = express.Router();
const PORT = 4000;
const URI = 'mongodb://127.0.0.1:27017/task';

let Task = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(URI, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

Routes.route('/').get(function (req, res) {
    Task.find(function (err, tasks) {
        if (err) {
            console.log(err);
        } else {
            res.json(tasks);
        }
    });
});

Routes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Task.findById(id, function (err, task) {
        res.json(task);
    });
});

Routes.route('/add').post(function (req, res) {
    let task = new Task(req.body);
    task.save()
        .then(task => {
            res.status(200).json({ 'task': 'task added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new task failed');
        });
});

Routes.route('/update/:id').post(function (req, res) {
    Task.findById(req.params.id, function (err, task) {
        if (!task)
            res.status(404).send('data is not found');
        else
            task.task_description = req.body.task_description;
        task.task_area = req.body.task_area;
        task.task_priority = req.body.task_priority;
        task.task_date = req.body.task_date;
        task.task_completed = req.body.task_completed;

        task.save().then(task => {
            res.json('Task updated');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

Routes.route('/delete/:id').post(function (req, res) {
    Task.findByIdAndRemove(req.params.id, function (err, task) {
        if (!task)
            res.status(404).send('data is not found');
        else

            task.save().then(task => {
                res.json('Registro eliminado');
            })
                .catch(err => {
                    res.status(400).send("Delete  not possible");
                });
    });
});



app.use('/task', Routes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
const express = require('express');
const DB_TASKS = require('./tasks');
const cors = require('cors');
const PORT = 3000;

const tasks = [...DB_TASKS];

const app = express();
app.use(express.json());
app.use(cors());

app.get('/tasks', (req, res) => {
    res.send(tasks);
}); 

app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  let selectedTask = tasks.find(task => task.id == taskId);
  if(!selectedTask){ 
    res.statusCode = 404;
    res.send(`ID ${taskId} not found`);
  }
  res.send(selectedTask);
  console.log(selectedTask);
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
})

app.delete('/tasks/:id', (req, res) => {
  const deleteTaskId = req.params.id;
  const deleteTask = tasks.find(task => task.id == deleteTaskId);
  const deleteTaskPosition = tasks.indexOf(deleteTask);
  tasks.splice(deleteTaskPosition, 1);
  res.status(201).json(deleteTaskId);
});

app.patch('/tasks/:id', (req, res) => {
  const patchTaskId = req.params.id;
  const patchTaskBody = req.body.task;
  const patchTask = tasks.find(task => task.id == patchTaskId);
  patchTask.task = patchTaskBody
  res.send(patchTask);
})

app.listen(PORT, () => {
    console.log(`App escuchando en el puerto ${PORT}`)
})
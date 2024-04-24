const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

let tasks = [];

app.get('/tasks', (req, res) => {
    try {
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/tasks', (req, res) => {
    try {
        const { task } = req.body;
        if (!task || typeof task !== 'string') {
            return res.status(400).json({ error: 'A valid task is required' });
        }

        tasks.push(task);
        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        if (isNaN(taskId) || taskId < 0 || taskId >= tasks.length) {
            return res.status(400).json({ error: 'Invalid task ID' });
        }

        tasks.splice(taskId, 1);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put('/tasks/:id', (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        if (isNaN(taskId) || taskId < 0 || taskId >= tasks.length) {
            return res.status(400).json({ error: 'Invalid task ID' });
        }

        const { task } = req.body;
        if (!task || typeof task !== 'string') {
            return res.status(400).json({ error: 'A valid task is required' });
        }

        tasks[taskId] = task;
        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

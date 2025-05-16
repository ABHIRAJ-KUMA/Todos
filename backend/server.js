const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const dbURI = 'mongodb://localhost:27017/todosApp';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.log('Failed to connect to MongoDB', err));

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
  store: String,
  month: String,
  totalRevenue: Number,
  averagePrice: Number
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
});

app.post('/api/todos', async (req, res) => {
  const { task, store, completed = false, dueDate } = req.body;

  try {
    const newTodo = new Todo({
      title: task,
      description: '',
      completed,
      dueDate,
      store,
      month: "2024-06",
      totalRevenue: store === "Store A" ? 230.0 : 150.0,
      averagePrice: store === "Store A" ? 15.0 : 12.5
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add todo' });
  }
});

app.patch('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update todo' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete todo' });
  }
});

app.post('/api/todos/bulk', async (req, res) => {
  try {
    const storeTodos = req.body;
    await Todo.insertMany(storeTodos);
    res.status(201).json({ message: 'Todos inserted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to insert store todos' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

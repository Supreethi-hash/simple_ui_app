const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const users = [];
let items = [];
let itemIdCounter = 1;

// User APIs (register/login) remain unchanged
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push({ username, password });
  res.status(201).json({ message: 'User registered' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  res.json({ message: 'Login successful' });
});

// New: Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// New: Add item
app.post('/items', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Item text required' });

  const newItem = { id: itemIdCounter++, text };
  items.push(newItem);
  res.status(201).json(newItem);
});

// New: Edit item by id
app.put('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Item text required' });

  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: 'Item not found' });

  item.text = text;
  res.json(item);
});

// New: Delete item by id
app.delete('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

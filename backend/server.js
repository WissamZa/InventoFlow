import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import cors from 'cors';
import { json } from 'body-parser';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(json());

// Path to the JSON file
const dataPath = join(__dirname, 'data', 'items.json');

// Helper function to read data from the JSON file
const readData = () => {
  const rawData = readFileSync(dataPath);
  return JSON.parse(rawData);
};

// Helper function to write data to the JSON file
const writeData = (data) => {
  writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all items
app.get('/api/items', (req, res) => {
  const data = readData();
  res.json(data.items);
});

// POST a new item
app.post('/api/items', (req, res) => {
  const data = readData();
  const newItem = { _id: Date.now().toString(), ...req.body };
  data.items.push(newItem);
  writeData(data);
  res.json(newItem);
});
// GET a single item by ID
app.get('/api/items/:id', (req, res) => {
  const data = readData();
  const itemId = req.params.id;
  const item = data.items.find((item) => item._id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// PUT (update) an item by ID
app.put('/api/items/:id', (req, res) => {
  const data = readData();
  const itemId = req.params.id;
  const updatedItem = req.body;
  data.items = data.items.map((item) =>
    item._id === itemId ? { ...item, ...updatedItem } : item
  );
  writeData(data);
  res.json(updatedItem);
});

// DELETE an item by ID
app.delete('/api/items/:id', (req, res) => {
  const data = readData();
  const itemId = req.params.id;
  data.items = data.items.filter((item) => item._id !== itemId);
  writeData(data);
  res.json({ message: 'Item deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
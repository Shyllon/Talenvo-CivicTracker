// routes/politicians.js
import express from 'express';
import Politician from '../models/Politician.js';

const router = express.Router();

// GET all politicians
router.get('/', async (req, res) => {
  try {
    const politicians = await Politician.find();
    res.json(politicians);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a specific politician by ID
router.get('/:id', async (req, res) => {
  try {
    const politician = await Politician.findById(req.params.id);
    if (!politician) return res.status(404).json({ message: "Politician not found" });
    res.json(politician);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new politician
router.post('/', async (req, res) => {
  try {
    const newPolitician = new Politician(req.body);
    await newPolitician.save();
    res.status(201).json(newPolitician);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT to update a politician
router.put('/:id', async (req, res) => {
  try {
    const updatedPolitician = await Politician.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPolitician) return res.status(404).json({ message: "Politician not found" });
    res.json(updatedPolitician);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a politician
router.delete('/:id', async (req, res) => {
  try {
    const deletedPolitician = await Politician.findByIdAndDelete(req.params.id);
    if (!deletedPolitician) return res.status(404).json({ message: "Politician not found" });
    res.json({ message: "Politician deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

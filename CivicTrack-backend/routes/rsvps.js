import express from 'express';
import RSVP from '../models/RSVP.js';
import { body, validationResult } from 'express-validator';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation middleware
const validateRSVP = [
  body('user_id').isMongoId().withMessage('Invalid user ID'),
  body('event_id').isMongoId().withMessage('Invalid event ID'),
  body('status').isIn(['attending', 'not attending']).withMessage('Invalid RSVP status'),
];

// 1. Create a new RSVP
router.post('/', validateRSVP, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { user_id, event_id, status } = req.body;

    const newRSVP = new RSVP({
      user_id,
      event_id,
      status
    });

    await newRSVP.save();
    res.status(201).json(newRSVP);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Get all RSVPs for a specific event with pagination
router.get('/:event_id', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10

    const rsvps = await RSVP.find({ event_id: req.params.event_id })
      .skip((page - 1) * limit)  // Skip the number of records for the current page
      .limit(Number(limit));     // Limit the number of records per page

    const totalRSVPs = await RSVP.countDocuments({ event_id: req.params.event_id });

    res.status(200).json({
      totalRSVPs,
      rsvps,
      currentPage: Number(page),
      totalPages: Math.ceil(totalRSVPs / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get a specific RSVP by ID
router.get('/rsvp/:id', async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.id);
    if (!rsvp) {
      return res.status(404).json({ error: 'RSVP not found' });
    }
    res.status(200).json(rsvp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Update an RSVP (e.g., change status) - only user who created the RSVP can update
router.put('/:id', authenticateUser, validateRSVP, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const rsvp = await RSVP.findById(req.params.id);
    if (!rsvp) {
      return res.status(404).json({ error: 'RSVP not found' });
    }

    if (rsvp.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You are not authorized to update this RSVP' });
    }

    const updatedRSVP = await RSVP.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.status(200).json(updatedRSVP);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Delete an RSVP - only user who created the RSVP can delete
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.id);
    if (!rsvp) {
      return res.status(404).json({ error: 'RSVP not found' });
    }

    if (rsvp.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You are not authorized to delete this RSVP' });
    }

    await RSVP.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'RSVP deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

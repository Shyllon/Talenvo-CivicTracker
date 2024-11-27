import express from 'express';
import Notification from '../models/Notification.js';

const router = express.Router();

// 1. Create a new notification
router.post('/', async (req, res) => {
  try {
    const { user_id, message, type } = req.body;

    const newNotification = new Notification({
      user_id,
      message,
      type,
    });

    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  const newNotification = new Notification({
    user_id: req.body.user_id,
    message: `You have RSVP'd to the event: ${req.body.event_id}`,
    type: 'event_invite',
  });
  await newNotification.save();
});

// 2. Get all notifications for a user
router.get('/:user_id', async (req, res) => {
  try {
    const notifications = await Notification.find({ user_id: req.params.user_id }).sort({ created_at: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get a specific notification by ID
router.get('/notification/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Update a notification (mark as read)
router.put('/:id', async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { is_read: true },
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  const updateNotification = new Notification({
    user_id: rsvp.user_id,
    message: `Your RSVP status for the event has been updated to: ${req.body.status}`,
    type: 'event_update',
  });
  await updateNotification.save();
});

// 5. Delete a notification
router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

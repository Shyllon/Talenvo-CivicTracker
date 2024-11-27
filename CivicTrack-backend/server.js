// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import notificationRoutes from './routes/notifications.js';
import politicianRoutes from './routes/politicians.js';
import projectRoutes from './routes/projects.js';
import RSVPRoutes from './routes/rsvps.js';
import userRoutes from './routes/users.js';

dotenv.config();
const app = express();

// Connect to Database
connectDB();

// Middleware for parsing JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/politicians', politicianRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/rsvps', RSVPRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
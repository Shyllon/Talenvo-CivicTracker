import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Expect 'Bearer <token>'
    if (!token) {
      return res.status(403).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await User.findById(decoded.id); // Retrieve user from database

    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }

    req.user = user; // Add user data to the request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

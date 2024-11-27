import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },  // Payload
    process.env.JWT_SECRET,              // Secret key
    { expiresIn: process.env.JWT_EXPIRES_IN } // Token expiration
  );
};

// utils/auth.js

import jwt from 'jsonwebtoken';

export const isTokenExpired = (token) => {
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    return false; // Token is not expired
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return true; // Token is expired
    } else {
      throw error; // Other verification errors
    }
  }
};
const jwt = require('jsonwebtoken');

 // Replace with a strong, unique secret key

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
   
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};



module.exports = {
  authMiddleware,};
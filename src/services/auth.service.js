const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Encriptar contraseña
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Comparar contraseña
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generar JWT
const generateToken = (userId) => {
  const payload = { id: userId };
  const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Asegúrate de definir JWT_SECRET en tu archivo .env
  const options = { expiresIn: '1h' }; // Expira en 1 hora
  return jwt.sign(payload, secret, options);
};

// Validar JWT
const validateToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    return jwt.verify(token, secret);
  } catch (error) {
    return null; // Token inválido
  }
};

module.exports = {
  encryptPassword,
  comparePassword,
  generateToken,
  validateToken
};

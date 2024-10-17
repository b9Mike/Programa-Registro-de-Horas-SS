import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

// Encriptar contraseña
export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Comparar contraseña
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generar JWT
export const generateToken = (userId) => {
  const payload = { id: userId };
  const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Asegúrate de definir JWT_SECRET en tu archivo .env
  const options = { expiresIn: '1h' }; // Expira en 1 hora
  return jwt.sign(payload, secret, options);
};

// Validar JWT
export const validateToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    return jwt.verify(token, secret);
  } catch (error) {
    return null; // Token inválido
  }
};

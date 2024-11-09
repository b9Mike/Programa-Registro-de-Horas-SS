import { Router } from 'express';
import { body, param } from 'express-validator';
import { createAdvisee, getAdviseById, getAllAdvisees, toggleAdviseeActivation, updateAdvisee } from '../controllers/advisees.controller.js';
import { validateRequest } from '../middlewares/routerValidation.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = Router();

//rutas para asesorados
// Ruta para traer todos los asesorados
router.get('/advisees', authMiddleware, getAllAdvisees);

//Ruta para traer un asesorado por id
router.get('/advisee/:enrollment', [param('enrollment').isInt().withMessage('La matricula debe ser un numero entero')], validateRequest, authMiddleware, getAdviseById);

// Ruta para crear asesorado
router.post(
  '/advisee',
  [
    body('Enrollment').isInt().notEmpty().withMessage('La matricula es requerida.'),
    body('Gender').isString().notEmpty().withMessage('El genero es requerida.').isLength({ min: 1, max: 50 }).withMessage('El genero debe tener entre 1 a 50 caracteres'),
    body('Name').isString().notEmpty().withMessage('El nombre es requerido.').isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),
    body('DegreeIdentity').isInt().notEmpty().withMessage('El id de la carrera es requerida.'),
  ],
  validateRequest,
  authMiddleware,
  createAdvisee
);

//Ruta para actualizar asesorado
router.put(
  '/advisee/:enrollment',
  [
    param('enrollment').isInt().withMessage('La matricula debe ser un numero entero'),
    body('Gender').isString().notEmpty().withMessage('El genero es requerida.').isLength({ min: 1, max: 255 }).withMessage('El genero debe tener entre 1 a 255 caracteres'),
    body('Name').isString().notEmpty().withMessage('El nombre es requerido.').isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),
    body('DegreeIdentity').isInt().notEmpty().withMessage('El id de la carrera es requerida.'),
  ],
  validateRequest,
  authMiddleware,
  updateAdvisee
);

// Ruta para activar o desactivar un asesorado
router.get('/advisee/active/:enrollment', [param('enrollment').isInt().withMessage('La matricula debe ser un numero entero')], validateRequest, authMiddleware, toggleAdviseeActivation);

export default router;

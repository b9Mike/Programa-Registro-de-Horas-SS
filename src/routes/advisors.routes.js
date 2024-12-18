import { Router } from 'express';
import { body, param } from 'express-validator';
import { createAdvisor, getAdvisorByEnrollment, getAllAdvisors, toggleAdvisorActivation, updateAdvisor } from '../controllers/advisors.controller.js';
import { validateRequest } from '../middlewares/routerValidation.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = Router();

//rutas de asesores
//Ruta para traer todos los asesores
router.get('/advisors', authMiddleware, getAllAdvisors);

//Ruta para traer un asesor por matricula
router.get('/advisor/:enrollment', [param('enrollment').isInt().withMessage('La matricula debe ser un numero entero')], validateRequest, authMiddleware, getAdvisorByEnrollment);

//Rutas para crear un asesor
router.post(
  '/advisor',
  [
    body('Enrollment').isInt().notEmpty().withMessage('La matricula es requerida.'),
    body('Gender').isString().notEmpty().withMessage('El genero es requerida.').isLength({ min: 1, max: 50 }).withMessage('El genero debe tener entre 1 a 50 caracteres'),
    body('Name').isString().notEmpty().withMessage('El nombre es requerido.').isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),
    body('DegreeIdentity').isInt().notEmpty().withMessage('El id de la carrera es requerida.'),
  ],
  validateRequest,
  authMiddleware,
  createAdvisor
);

//Ruta para actualizar asesor
router.put(
  '/advisor/:enrollment',
  [
    param('enrollment').isInt().withMessage('La matricula debe ser un numero entero'),
    body('Gender').isString().notEmpty().withMessage('El genero es requerida.').isLength({ min: 1, max: 255 }).withMessage('El genero debe tener entre 1 a 255 caracteres'),
    body('Name').isString().notEmpty().withMessage('El nombre es requerido.').isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),
    body('DegreeIdentity').isInt().notEmpty().withMessage('El id de la carrera es requerida.'),
  ],
  validateRequest,
  authMiddleware,
  updateAdvisor
);

//Rutapara acttivar o desactivar asesor
router.get('/advisor/active/:enrollment', [param('enrollment').isInt().withMessage('La matricula debe ser un numero entero')], validateRequest, authMiddleware, toggleAdvisorActivation);

export default router;

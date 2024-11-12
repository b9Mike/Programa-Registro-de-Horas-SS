import { Router } from 'express';
import { body, param } from 'express-validator';
import { 
  getEntryExitRecords, 
  getEntryExitRecordById, 
  createEntryExitRecord, 
  updateEntryExitRecord, 
  toggleEntryExitRecordActivation 
} from '../controllers/entryExitRecord.controller.js';
import { validateRequest } from '../middlewares/routerValidation.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas para registros de entrada y salida

// Ruta para obtener todos los registros
router.get('/entry-exit-records', authMiddleware, getEntryExitRecords);

// Ruta para obtener un registro por el ID
router.get(
  '/entry-exit-record/:id',
  [param('id').isInt().withMessage('El id debe ser un número entero')],
  validateRequest,
  authMiddleware,
  getEntryExitRecordById
);

// Ruta para crear un nuevo registro
router.post(
  '/entry-exit-record',
  [
    body('AdvisorIdentity')
      .isInt().withMessage('El ID del asesor debe ser un número entero')
      .notEmpty().withMessage('El ID del asesor es requerido.'),
    body('EntryTime')
      .isISO8601().withMessage('El tiempo de entrada debe ser una fecha válida')
      .notEmpty().withMessage('El tiempo de entrada es requerido.'),
    body('ExitTime')
      .isISO8601().withMessage('El tiempo de salida debe ser una fecha válida')
      .notEmpty().withMessage('El tiempo de salida es requerido.'),
    body('CurrentDate')
      .isISO8601().withMessage('La fecha actual debe ser una fecha válida')
      .notEmpty().withMessage('La fecha actual es requerida.'),
    body('UserCreation')
      .isInt().withMessage('El ID de creación del usuario debe ser un número entero')
      .notEmpty().withMessage('El ID de creación del usuario es requerido.'),
    body('UserUpdate')
      .isInt().withMessage('El ID de actualización del usuario debe ser un número entero')
      .notEmpty().withMessage('El ID de actualización del usuario es requerido.')
  ],
  validateRequest,
  authMiddleware,
  createEntryExitRecord
);

// Ruta para actualizar un registro
router.put(
  '/entry-exit-record/:id',
  [
    param('id').isInt().withMessage('El id debe ser un número entero'),
    body('AdvisorIdentity')
      .optional().isInt().withMessage('El ID del asesor debe ser un número entero'),
    body('EntryTime')
      .optional().isISO8601().withMessage('El tiempo de entrada debe ser una fecha válida'),
    body('ExitTime')
      .optional().isISO8601().withMessage('El tiempo de salida debe ser una fecha válida'),
    body('CurrentDate')
      .optional().isISO8601().withMessage('La fecha actual debe ser una fecha válida'),
    body('UserUpdate')
      .isInt().withMessage('El ID de actualización del usuario debe ser un número entero')
  ],
  validateRequest,
  authMiddleware,
  updateEntryExitRecord
);

// Ruta para activar o desactivar un registro
router.get(
  '/entry-exit-record/active/:id',
  [param('id').isInt().withMessage('El id debe ser un número entero')],
  validateRequest,
  authMiddleware,
  toggleEntryExitRecordActivation
);

export default router;

import { Router } from 'express';
import { body, param } from 'express-validator';
import {
    getAllEntryExitRecords,
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
router.get('/entry-exit-records', authMiddleware, getAllEntryExitRecords);

// Ruta para obtener un registro por el ID
router.get(
    '/entry-exit-record/:id',
    [
        authMiddleware, // Primero verifica la autenticación
        param('id').isInt().withMessage('El id debe ser un número entero'),
        validateRequest // Luego valida los parámetros
    ],
    getEntryExitRecordById
);

// Ruta para crear un nuevo registro
router.post(
    '/entry-exit-record',
    [
        authMiddleware, 
        body('AdvisorIdentity')
            .isInt().withMessage('El ID del asesor debe ser un número entero')
            .notEmpty().withMessage('El ID del asesor es requerido.'),
        body('EntryTime')
            .matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/).withMessage('El tiempo de entrada debe tener el formato HH:mm:ss')
            .notEmpty().withMessage('El tiempo de entrada es requerido.'),
        body('ExitTime')
            .matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/).withMessage('El tiempo de salida debe tener el formato HH:mm:ss')
            .notEmpty().withMessage('El tiempo de salida es requerido.'),
        body('CurrentDate')
            .isISO8601().withMessage('La fecha actual debe ser una fecha válida')
            .notEmpty().withMessage('La fecha actual es requerida.')
    ],
    validateRequest, 
    createEntryExitRecord
);


// Ruta para actualizar un registro
router.put(
    '/entry-exit-record/:id',
    [
        authMiddleware, 
        param('id').isInt().withMessage('El id debe ser un número entero'),
        body('AdvisorIdentity')
            .optional().isInt().withMessage('El ID del asesor debe ser un número entero'),
        body('EntryTime')
            .optional().isISO8601().withMessage('El tiempo de entrada debe ser una fecha válida'),
        body('ExitTime')
            .optional().isISO8601().withMessage('El tiempo de salida debe ser una fecha válida'),
        body('CurrentDate')
            .optional().isISO8601().withMessage('La fecha actual debe ser una fecha válida')
    ],
    validateRequest, 
    updateEntryExitRecord
);

// Ruta para activar o desactivar un registro
router.get(
    '/entry-exit-record/active/:id',
    [
        authMiddleware, 
        param('id').isInt().withMessage('El id debe ser un número entero'),
        validateRequest 
    ],
    toggleEntryExitRecordActivation
);

export default router;

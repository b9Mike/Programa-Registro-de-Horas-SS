import { Router } from "express";
import { body, param } from "express-validator";
import { getDegrees, getDegreeById, createDegree, updateDegree, toggleDegreeActivation } from '../controllers/degrees.controller.js'
import { validateRequest } from "../middlewares/routerValidation.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

//rutas para carrera
// Ruta para obtener todas las carreras
router.get('/degrees', authMiddleware, getDegrees);

//Ruta para obtener una carrera por el id
router.get('/degree/:id',
    [
        param('id').isInt().withMessage('El id debe ser un numero entero'),
    ], validateRequest, authMiddleware, getDegreeById);

//Ruta para crear una carrera
router.post('/degree',
    [
        body('degreeName').isString().notEmpty().withMessage('El nombre de la carrera es requerida.')
            .isLength({ min: 1, max: 255 }).withMessage('El nombre de la carrera debe tener entre 1 a 255 caracteres'),

        body('shortName').isString().notEmpty().withMessage('La abreviatura de la carrera es requerida.')
            .isLength({ min: 1, max: 20 }).withMessage('La abreviatura de la carrera debe tener entre 1 a 20 caracteres'),

    ], validateRequest, authMiddleware, createDegree);

//Ruta para actualizar carrera
router.put('/degree/:id',
    [
        param('id').isInt().withMessage('El id debe ser un numero entero'),

        body('degreeName').isString().notEmpty().withMessage('El nombre de la carrera es requerida.')
            .isLength({ min: 1, max: 255 }).withMessage('El nombre de la carrera debe tener entre 1 a 255 caracteres'),

        body('shortName').isString().notEmpty().withMessage('La abreviatura de la carrera es requerida.')
            .isLength({ min: 1, max: 20 }).withMessage('La abreviatura de la carrera debe tener entre 1 a 20 caracteres'),

    ], validateRequest, authMiddleware, updateDegree);

// Ruta para activar o desactivar carrera 
router.get('/degree/active/:id',
    [
        param('id').isInt().withMessage('El id debe ser un numero entero'),

    ], validateRequest, authMiddleware, toggleDegreeActivation);

export default router
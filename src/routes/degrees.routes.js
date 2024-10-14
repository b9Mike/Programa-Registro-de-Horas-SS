import { Router } from "express";
import { body, param } from "express-validator";
import { getDegrees, getDegreeById, createDegree, updateDegree, toggleDegreeActivation } from '../controllers/degrees.controller.js'
const router = Router();

//rutas para carrera
router.get('/degrees', getDegrees);
router.get('/degree/:id',
    [
        param('id').isInt().withMessage('El id debe ser un numero entero'),
    ], getDegreeById);
router.post('/degrees', 
    [
        body('degreeName').isString().notEmpty().withMessage('El nombre de la carrera es requerida.')
            .isLength({ min: 1, max: 255 }).withMessage('El nombre de la carrera debe tener entre 1 a 255 caracteres'),

        body('userCreation').isInt().notEmpty().withMessage('La matricula del usuario creador es requerida.'),

    ], createDegree);
router.put('/degrees/:id', 
    [
        param('id').isInt().withMessage('El id debe ser un numero entero'),
        
        body('degreeName').isString().notEmpty().withMessage('El nombre de la carrera es requerida.')
            .isLength({ min: 1, max: 255 }).withMessage('El nombre de la carrera debe tener entre 1 a 255 caracteres'),

        body('userUpdate').isInt().notEmpty().withMessage('La matricula del usuario que actualiza es requerida.'),

    ], updateDegree);
router.get('/degrees/:id', 
    [
        param('id').isInt().withMessage('El id debe ser un numero entero'),

    ], toggleDegreeActivation);

export default router
import { Router } from "express";
import { body, param } from "express-validator";
import { createAdvisee, getAdviseById, getAllAdvisees, toggleAdviseeActivation, updateAdvisee } from "../controllers/advisees.controller";
const router = Router();

//rutas para asesorados
router.get('/advisees', getAllAdvisees);
router.get('/advisees/:enrollment', 
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un numero entero'),
    ], getAdviseById);
router.post('/advisees',
    [
        body('enrollment').isInt().notEmpty().withMessage('La matricula es requerida.'),

        body('gender').isString().notEmpty().withMessage('El genero es requerida.')
            .isLength({ min: 1, max: 255 }).withMessage('La contraseña debe tener entre 1 a 255 caracteres'),

        body('name').isString().notEmpty().withMessage('El nombre es requerido.')
            .isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),

        body('degreeIdentity').isInt().notEmpty().withMessage('El id de la carrera es requerido.'),

        body('userCreation').isInt().notEmpty().withMessage('La matricula del usuario creador es requerida.'),

    ], createAdvisee);
router.put('/advisees/:enrollment', 
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un numero entero'),
        
        body('gender').isString().notEmpty().withMessage('El genero es requerida.')
            .isLength({ min: 1, max: 255 }).withMessage('La contraseña debe tener entre 1 a 255 caracteres'),

        body('name').isString().notEmpty().withMessage('El nombre es requerido.')
            .isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),

        body('degreeIdentity').isInt().notEmpty().withMessage('El id de la carrera es requerido.'),

        body('userUpdate').isInt().notEmpty().withMessage('La matricula del usuario que actualiza es requerida.'),

    ], updateAdvisee);
router.get('/advisees/:enrollment', 
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un numero entero'),
    ], toggleAdviseeActivation);

export default router
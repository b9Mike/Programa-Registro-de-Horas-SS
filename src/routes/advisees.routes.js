import { Router } from "express";
import { body, param } from "express-validator";
import { createAdvisee, getAdviseById, getAllAdvisees, toggleAdviseeActivation, updateAdvisee } from "../controllers/advisees.controller.js";
const router = Router();

//rutas para asesorados
// Ruta para traer todos los asesorados
router.get('/advisees', getAllAdvisees);

//Ruta para traer un asesorado por id
router.get('/advisee/:enrollment', 
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un numero entero'),
    ], getAdviseById);

// Ruta para crear asesorado
router.post('/advisee',
    [
        body('enrollment').isInt().notEmpty().withMessage('La matricula es requerida.'),

        body('gender').isString().notEmpty().withMessage('El genero es requerida.')
            .isLength({ min: 1, max: 50 }).withMessage('El genero debe tener entre 1 a 50 caracteres'),

        body('name').isString().notEmpty().withMessage('El nombre es requerido.')
            .isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),

        body('degreeIdentity').isInt().notEmpty().withMessage('El id de la carrera es requerido.'),

        body('userCreation').isInt().notEmpty().withMessage('La matricula del usuario creador es requerida.'),

    ], createAdvisee);

//Ruta para actualizar asesorado
router.put('/advisee/:enrollment', 
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un numero entero'),
        
        body('gender').isString().notEmpty().withMessage('El genero es requerida.')
            .isLength({ min: 1, max: 255 }).withMessage('La contraseña debe tener entre 1 a 255 caracteres'),

        body('name').isString().notEmpty().withMessage('El nombre es requerido.')
            .isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),

        body('degreeIdentity').isInt().notEmpty().withMessage('El id de la carrera es requerido.'),

        body('userUpdate').isInt().notEmpty().withMessage('La matricula del usuario que actualiza es requerida.'),

    ], updateAdvisee);

// Ruta para activar o desactivar un asesorado
router.get('/advisee/active/:enrollment', 
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un numero entero'),
    ], toggleAdviseeActivation);

export default router
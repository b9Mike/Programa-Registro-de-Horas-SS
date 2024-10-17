import { Router } from "express";
import { body, param } from "express-validator";
import { createAdvisor, getAdvisorByEnrollment, getAllAdvisors, toggleAdvisorActivation, updateAdvisor } from "../controllers/advisors.controller.js";
const router = Router();

//rutas de asesores
//Ruta para traer todos los asesores
router.get('/advisors', getAllAdvisors);

//Ruta para traer un asesor por matricula
router.get('/advisor/:enrollment',
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un numero entero'),
    ], getAdvisorByEnrollment);

//Rutas para crear un asesor
router.post('/advisor', 
    [
        body('enrollment').isInt().notEmpty().withMessage('La matricula es requerida.'),

        body('gender').isString().notEmpty().withMessage('El genero es requerida.')
            .isLength({ min: 1, max: 50 }).withMessage('El genero debe tener entre 1 a 50 caracteres'),

        body('name').isString().notEmpty().withMessage('El nombre es requerido.')
            .isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),

        body('degreeIdentity').isInt().notEmpty().withMessage('El id de la carrera es requerido.'),

        body('userCreation').isInt().notEmpty().withMessage('La matricula del usuario creador es requerida.'),

    ], createAdvisor);

//Ruta para actualizar asesor
router.put('/advisor/:enrollment', 
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un numero entero'),
        
        body('gender').isString().notEmpty().withMessage('El genero es requerida.')
            .isLength({ min: 1, max: 255 }).withMessage('La contraseña debe tener entre 1 a 255 caracteres'),

        body('name').isString().notEmpty().withMessage('El nombre es requerido.')
            .isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),

        body('degreeIdentity').isInt().notEmpty().withMessage('El id de la carrera es requerido.'),

        body('userUpdate').isInt().notEmpty().withMessage('La matricula del usuario que actualiza es requerida.'),

    ] , updateAdvisor);

//Rutapara acttivar o desactivar asesor
router.get('/advisor/active/:enrollment', 
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un numero entero'),
    ], toggleAdvisorActivation);

export default router
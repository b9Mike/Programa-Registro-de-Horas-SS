import { Router } from "express";
import { body, param } from "express-validator";
import { createLearningUnit, getAllLearningUnits, getLearningUnitById, toggleLearningUnitActivation, updateLearningUnit } from "../controllers/learningUnits.controller.js";
const router = Router();

//rutas de unidad de aprendizaje
//Ruta para traer todas las materias
router.get('/learningUnits', getAllLearningUnits);

//Ruta para traer una materia por el id
router.get('/learningUnit/:id', 
    [
        param('id').isInt().withMessage('El id debe ser un numero entero'),
    ], getLearningUnitById);

// Ruta para crear una materia
router.post('/learningUnit',
    [
        body('name').isString().notEmpty().withMessage('El nombre es requerido.')
        .isLength({ min: 1, max: 255}).withMessage('El nombre debe tener entre 1 a 255 caracteres'),

        body('degreeIdentity').isInt().notEmpty().withMessage('El id de la carrera es requerido.'),

        body('userCreation').isInt().notEmpty().withMessage('La matricula de usuario creador es requerido.'),

    ], createLearningUnit);

//Ruta para actualizar materias
router.put('/learningUnit/:id', 
    [
        param('id').isInt().withMessage('El id debe ser un numero entero'),

        body('name').isString().notEmpty().withMessage('El nombre es requerido.')
        .isLength({ min: 1, max: 255}).withMessage('El nombre debe tener entre 1 a 255 caracteres'),

        body('degreeIdentity').isInt().notEmpty().withMessage('El id de la carrera es requerido.'),

        body('userUpdate').isInt().notEmpty().withMessage('La matricula de usuario que actualiza es requerido.'),

    ], updateLearningUnit);

//Ruta para activar o desactivar una materia
router.get('/learningUnit/active/:id', 
    [
        param('id').isInt().withMessage('El id debe ser un numero entero'),
        
    ], toggleLearningUnitActivation);

export default router
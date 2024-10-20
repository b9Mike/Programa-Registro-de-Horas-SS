import { Router } from "express";
import { body, param } from "express-validator";
import { createAdvisorySession, getAdvisorySessionById, getAllAdvisorySessions, toggleAdvisorySessionActivation, updateAdvisorySession, getAdvisorySessionsByAdvisor} from "../controllers/advisorySession.controller.js";
import { validateRequest } from "../middlewares/routerValidation.middleware.js";
const router = Router();

//rutas de asesorias
//Ruta para traer todas las asesorias
router.get('/advisorySessions', getAllAdvisorySessions);

//Ruta para traer una sesion de asesoria por id
router.get('/advisorySession/:sessionId', 
    [
        param('sessionId').isInt().withMessage('El id debe ser un numero entero'),
    ], validateRequest, getAdvisorySessionById);

//Ruta para crear una sesion de asesoria
router.post('/advisorySession', 
    [
        body('learningUnitIdentity').isInt().notEmpty().withMessage('El id de la materia es requerida.'),
        
        body('topic').isString().notEmpty().withMessage('El tema es requerido.')
            .isLength({ min: 1, max: 255 }).withMessage('El tema debe tener entre 1 a 255 caracteres'),

        body('professor').isString().notEmpty().withMessage('El nombre del maestro/a es requerido.')
            .isLength({ min: 1, max: 255 }).withMessage('El nombre del maestro/a debe tener entre 1 a 255 caracteres'),

        body('classType').isString().notEmpty().withMessage('El tipo de clase es requerida.')
            .isLength({ min: 1, max: 255 }).withMessage('El tipo de clase debe tener entre 1 a 255 caracteres'),

        body('advisorIdentity').isInt().notEmpty().withMessage('La matricula del asesor es requerida.'),

        body('adviseeIdentity').isInt().notEmpty().withMessage('La matricula del asesorado es requerida.'),

        body('sessionDate').isDate().notEmpty().withMessage('El dia de la asesoria  es requerida.'),

        body('startTime').isISO8601().notEmpty().withMessage('Los datos de inicio de la asesoria es requerida.'),

        body('userCreation').isInt().notEmpty().withMessage('La matricula del usuario creador es requerida.'),

    ], validateRequest, createAdvisorySession);

//Ruta para actualizar una sesion de asesoria
router.put('/advisorySession/:sessionId',
    [
        param('sessionId').isInt().withMessage('El id debe ser un numero entero'),

        body('learningUnitIdentity').isInt().notEmpty().withMessage('El id de la materia es requerida.'),
        
        body('topic').isString().notEmpty().withMessage('El tema es requerido.')
            .isLength({ min: 1, max: 255 }).withMessage('El tema debe tener entre 1 a 255 caracteres'),

        body('professor').isString().notEmpty().withMessage('El nombre del maestro/a es requerido.')
            .isLength({ min: 1, max: 255 }).withMessage('El nombre del maestro/a debe tener entre 1 a 255 caracteres'),

        body('classType').isString().notEmpty().withMessage('El tipo de clase es requerida.')
            .isLength({ min: 1, max: 255 }).withMessage('El tipo de clase debe tener entre 1 a 255 caracteres'),

        body('advisorIdentity').isInt().notEmpty().withMessage('La matricula del asesor es requerida.'),

        body('adviseeIdentity').isInt().notEmpty().withMessage('La matricula del asesorado es requerida.'),

        body('sessionDate').isDate().notEmpty().withMessage('El dia de la asesoria  es requerida.'),

        body('startTime').isISO8601().notEmpty().withMessage('Los datos de inicio de la asesoria es requerida.'),

        body('endTime').isISO8601()
        .optional({nullable: true})
        .withMessage('Los datos de inicio de la asesoria es requerida.'),

        body('userUpdate').isInt().notEmpty().withMessage('La matricula del usuario creador es requerida.'),

    ], validateRequest, updateAdvisorySession);

//Ruta para activar o desactiver una sesion de asesoria
router.get('/advisorySession/active/:sessionId', 
    [
        param('sessionId').isInt().withMessage('El id debe ser un numero entero'),
    ], validateRequest, toggleAdvisorySessionActivation);

//ruta para obtener las asesorías de un asesor específico
router.get('/advisorySessions/advisor/:enrollment', 
    [
        param('enrollment').isInt().withMessage('El id debe ser un numero entero'),
    ], validateRequest, getAdvisorySessionsByAdvisor);

export default router
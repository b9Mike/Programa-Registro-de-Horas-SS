import { Router } from "express";
import { body, param } from "express-validator";
import { createAdvisorySession, getAdvisorySessionById, getAllAdvisorySessions, toggleAdvisorySessionActivation, updateAdvisorySession, getAdvisorySessionsByAdvisor, getAdvisorySessionsByDegree } from "../controllers/advisorySession.controller.js";
import { validateRequest } from "../middlewares/routerValidation.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

//rutas de asesorias
//Ruta para traer todas las asesorias
router.get('/advisorySessions', authMiddleware, getAllAdvisorySessions);

//Ruta para traer una sesion de asesoria por id
router.get('/advisorySession/:sessionId',
    [
        param('sessionId').isInt().withMessage('El id debe ser un numero entero'),
    ], validateRequest, authMiddleware, getAdvisorySessionById);

//Ruta para crear una sesion de asesoria
router.post('/advisorySession',
    [
        body('learningUnit').isInt().notEmpty().withMessage('El id de la materia es requerida.'),

        body('topic').isString().notEmpty().withMessage('El tema es requerido.')
            .isLength({ min: 1, max: 255 }).withMessage('El tema debe tener entre 1 a 255 caracteres'),

        body('professor').isString().notEmpty().withMessage('El nombre del maestro/a es requerido.')
            .isLength({ min: 1, max: 255 }).withMessage('El nombre del maestro/a debe tener entre 1 a 255 caracteres'),

        body('classType').isString().notEmpty().withMessage('El tipo de clase es requerida.')
            .isLength({ min: 1, max: 255 }).withMessage('El tipo de clase debe tener entre 1 a 255 caracteres'),

        body('advisorIdentity').isInt().notEmpty().withMessage('La matricula del asesor es requerida.'),

        body('adviseeIdentity').isInt().notEmpty().withMessage('La matricula del asesorado es requerida.'),

        body('sessionDate').isDate().notEmpty().withMessage('El dia de la asesoria  es requerida.'),

        body('startTime').matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).notEmpty().withMessage('La hora de inicio de la asesoria es requerida, formato HH::MM::SS.'),

    ], validateRequest, authMiddleware, createAdvisorySession);

//Ruta para actualizar una sesion de asesoria
router.put('/advisorySession/:sessionId',
    [
        param('sessionId').isInt().withMessage('El id debe ser un numero entero'),

        body('learningUnit').isInt().notEmpty().withMessage('El id de la materia es requerida.'),

        body('topic').isString().notEmpty().withMessage('El tema es requerido.')
            .isLength({ min: 1, max: 255 }).withMessage('El tema debe tener entre 1 a 255 caracteres'),

        body('professor').isString().notEmpty().withMessage('El nombre del maestro/a es requerido.')
            .isLength({ min: 1, max: 255 }).withMessage('El nombre del maestro/a debe tener entre 1 a 255 caracteres'),

        body('classType').isString().notEmpty().withMessage('El tipo de clase es requerida.')
            .isLength({ min: 1, max: 255 }).withMessage('El tipo de clase debe tener entre 1 a 255 caracteres'),

        body('advisorIdentity').isInt().notEmpty().withMessage('La matricula del asesor es requerida.'),

        body('adviseeIdentity').isInt().notEmpty().withMessage('La matricula del asesorado es requerida.'),

        body('sessionDate').isDate().notEmpty().withMessage('El dia de la asesoria  es requerida.'),

        body('startTime').matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).notEmpty().withMessage('La hora de inicio de la asesoria es requerida, formato HH::MM::SS.'),

        body('endTime').matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/).optional({ nullable: true }).withMessage('La hora de fin es requerido, nulo o formato HH:mm:ss')
    ], validateRequest, authMiddleware, updateAdvisorySession);

//Ruta para activar o desactiver una sesion de asesoria
router.get('/advisorySession/active/:sessionId',
    [
        param('sessionId').isInt().withMessage('El id debe ser un numero entero'),
    ], validateRequest, authMiddleware, toggleAdvisorySessionActivation);

//ruta para obtener las asesorías de un asesor específico
router.get('/advisorySessions/advisor/:enrollment',
    [
        param('enrollment').isInt().withMessage('El id debe ser un numero entero'),
    ], validateRequest, authMiddleware, getAdvisorySessionsByAdvisor);

//ruta para obtener reporte de asesoria por carrera mediante la materia

    router.get('/advisorySessions/degrees/:identity', 
        [
            param('identity').isInt().withMessage('El id debe ser un numero entero'),
        ], validateRequest, getAdvisorySessionsByDegree);

export default router
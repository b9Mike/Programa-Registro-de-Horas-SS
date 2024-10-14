import { Router } from "express";
import { body, param } from "express-validator";
import { createAdvisorySession, getAdvisorySessionById, getAllAdvisorySessions, toggleAdvisorySessionActivation, updateAdvisorySession } from "../controllers/advisorySession.controller";

const router = Router();

//rutas de asesorias
router.get('/advisorySessions', getAllAdvisorySessions);
router.get('/advisorySessions/:sessionId', 
    [
        param('sessionId').isInt().withMessage('El id debe ser un numero entero'),
    ] , getAdvisorySessionById);
router.post('/advisorySessions', 
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

    ], createAdvisorySession);
router.put('/advisorySessions/:id',
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

    ], updateAdvisorySession);
router.get('/advisorySessions/:id', 
    [
        param('sessionId').isInt().withMessage('El id debe ser un numero entero'),
    ], toggleAdvisorySessionActivation);

export default router
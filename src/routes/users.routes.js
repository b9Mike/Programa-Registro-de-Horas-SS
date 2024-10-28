import { Router } from "express";
import { body, param } from "express-validator";
import { getAllUsers, logIn, register, updateUser, toggleUserActivation } from '../controllers/users.controller.js'
import { validateRequest } from "../middlewares/routerValidation.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

//rutas para el usuario
//Ruta para traer todos los usuarios existentes
router.get('/users', authMiddleware, getAllUsers);
//Ruta para login
router.post('/login/',
    [
        body('enrollment').isInt().notEmpty().withMessage('La matricula es requerida.'),

        body('password').isString().notEmpty().withMessage('La contraseña es requerida.')
            .isLength({ min: 5, max: 255 }).withMessage('La contraseña debe tener entre 5 a 255 caracteres'),

    ], validateRequest, logIn);
//Ruta para registrar usuario
router.post('/register/',
    [
        body('enrollment').isInt().notEmpty().withMessage('La matricula es requerida.'),

        body('name').isString().notEmpty().withMessage('El nombre es requerido.')
            .isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),

        body('password').isString().notEmpty().withMessage('La contraseña es requerida.')
            .isLength({ min: 5, max: 255 }).withMessage('La contraseña debe tener entre 5 a 255 caracteres'),

        body('type').isInt().notEmpty().withMessage('El tipo de usuario es requerido.'),

        body('userCreation').isInt().notEmpty().withMessage('La matricula del usuario creador es requerida.'),

    ], validateRequest, register);
//Ruta para actualizar usuario
router.put('/user/:enrollment',
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un entero.'),

        body('name').isString().notEmpty().withMessage('El nombre es requerido.')
            .isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),

        body('password').isString().notEmpty().withMessage('La contraseña es requerida.')
            .isLength({ min: 5, max: 255 }).withMessage('La contraseña debe tener entre 5 a 255 caracteres'),

        body('type').isInt().notEmpty().withMessage('El tipo de usuario es requerido.'),

        body('userUpdate').isInt().notEmpty().withMessage('La matricula del usuario que actualiza es requerida.'),

    ], validateRequest, authMiddleware, updateUser);
//Ruta para activar o desactivar usuario
router.get('/user/active/:enrollment',
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un número entero.'),

    ], validateRequest, authMiddleware, toggleUserActivation);

export default router
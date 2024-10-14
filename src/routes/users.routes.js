import { Router } from "express";
import { body, param } from "express-validator";
import { getAllUsers, getUserByEnrollment, logIn, register, updateUser, toggleUserActivation } from '../controllers/users.controller.js'
const router = Router();

//rutas para el usuario
router.get('/users', getAllUsers);
router.get('/user/:enrollment',
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un número entero.'),
    ], getUserByEnrollment);
router.post('/login/',
    [
        body('enrollment').isInt().notEmpty().withMessage('La matricula es requerida.'),

        body('password').isString().notEmpty().withMessage('La contraseña es requerida.')
            .isLength({ min: 5, max: 255 }).withMessage('La contraseña debe tener entre 5 a 255 caracteres'),

    ], logIn);
router.post('/register/',
    [
        body('enrollment').isInt().notEmpty().withMessage('La matricula es requerida.'),

        body('name').isString().notEmpty().withMessage('El nombre es requerido.')
            .isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),

        body('password').isString().notEmpty().withMessage('La contraseña es requerida.')
            .isLength({ min: 5, max: 255 }).withMessage('La contraseña debe tener entre 5 a 255 caracteres'),

        body('type').isInt().notEmpty().withMessage('El tipo de usuario es requerido.'),

        body('userCreation').isInt().notEmpty().withMessage('La matricula del usuario creador es requerida.'),

    ], register);
router.put('/user/:enrollment',
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un entero.'),

        body('name').isString().notEmpty().withMessage('El nombre es requerido.')
            .isLength({ min: 5, max: 255 }).withMessage('El nombre debe tener entre 5 a 255 caracteres'),

        body('password').isString().notEmpty().withMessage('La contraseña es requerida.')
            .isLength({ min: 5, max: 255 }).withMessage('La contraseña debe tener entre 5 a 255 caracteres'),

        body('type').isInt().notEmpty().withMessage('El tipo de usuario es requerido.'),

        body('userUpdate').isInt().notEmpty().withMessage('La matricula del usuario que actualiza es requerida.'),

    ], updateUser);
router.get('user/active/:enrollment',
    [
        param('enrollment').isInt().withMessage('La matricula debe ser un número entero.'),

    ], toggleUserActivation);

export default router
import { Router } from "express";
import { getUsers, createUsers, updateUsers, deleteUsers, getByIdUsers } from '../controllers/users.controller.js'
const router = Router();

//rutas para el usuario
router.get('/users', getUsers);
router.post('/users', createUsers);
router.put('/users/:id', updateUsers);
router.delete('/users/:id', deleteUsers);
router.get('/users/:id', getByIdUsers);

export default router
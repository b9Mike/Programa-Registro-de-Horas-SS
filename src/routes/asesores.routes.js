import { Router } from "express";
//import { getUsers, createUsers, updateUsers, deleteUsers, getByIdUsers } from '../controllers/users.controller.js'
const router = Router();

router.get('/asesores', getUsers);
router.post('/asesores', createUsers);
router.put('/asesores/:id', updateUsers);
router.delete('/asesores/:id', deleteUsers);
router.get('/asesores/:id', getByIdUsers);

export default router
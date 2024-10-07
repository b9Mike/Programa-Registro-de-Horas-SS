import { Router } from "express";
//import { getUsers, createUsers, updateUsers, deleteUsers, getByIdUsers } from '../controllers/users.controller.js'
const router = Router();

//rutas para asesorados
router.get('/advised', getAdvised);
router.post('/advised', createAdvised);
router.put('/advised/:id', updateAdvised);
router.delete('/advised/:id', deleteAdvised);
router.get('/advised/:id', getByIdAdvised);

export default router
import { Router } from "express";
//import { getUsers, createUsers, updateUsers, deleteUsers, getByIdUsers } from '../controllers/users.controller.js'
const router = Router();

//rutas de asesorias
router.get('/advice', getAdvice);
router.post('/advice', createAdvice);
router.put('/advice/:id', updateAdvice);
router.delete('/advice/:id', deleteAdvice);
router.get('/advice/:id', getByIdAdvice);

export default router
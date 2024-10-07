import { Router } from "express";
//import { getUsers, createUsers, updateUsers, deleteUsers, getByIdUsers } from '../controllers/users.controller.js'
const router = Router();

//rutas de asesores
router.get('/advisor', getAdvisor);
router.post('/advisor', createAdvisor);
router.put('/advisor/:id', updateAdvisor);
router.delete('/advisor/:id', deleteAdvisor);
router.get('/advisor/:id', getByIdAdvisor);

export default router
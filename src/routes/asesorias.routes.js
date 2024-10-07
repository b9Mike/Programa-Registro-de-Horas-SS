import { Router } from "express";
//import { getUsers, createUsers, updateUsers, deleteUsers, getByIdUsers } from '../controllers/users.controller.js'
const router = Router();

router.get('/asesorias', getAsesorias);
router.post('/asesorias', createUsers);
router.put('/asesorias/:id', updateUsers);
router.delete('/asesorias/:id', deleteUsers);
router.get('/asesorias/:id', getByIdUsers);

export default router
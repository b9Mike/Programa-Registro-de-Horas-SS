import { Router } from "express";
//import { getUsers, createUsers, updateUsers, deleteUsers, getByIdUsers } from '../controllers/users.controller.js'
const router = Router();

router.get('/asesorados', getUsers);
router.post('/asesorados', createUsers);
router.put('/asesorados/:id', updateUsers);
router.delete('/asesorados/:id', deleteUsers);
router.get('/asesorados/:id', getByIdUsers);

export default router
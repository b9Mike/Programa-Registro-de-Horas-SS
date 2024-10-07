import { Router } from "express";
//import { getUsers, createUsers, updateUsers, deleteUsers, getByIdUsers } from '../controllers/users.controller.js'
const router = Router();

router.get('/unidadAprendizaje', getUsers);
router.post('/unidadAprendizaje', createUsers);
router.put('/unidadAprendizaje/:id', updateUsers);
router.delete('/unidadAprendizaje/:id', deleteUsers);
router.get('/unidadAprendizaje/:id', getByIdUsers);

export default router
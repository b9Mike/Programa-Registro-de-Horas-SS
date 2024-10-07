import { Router } from "express";
//import { getUsers, createUsers, updateUsers, deleteUsers, getByIdUsers } from '../controllers/users.controller.js'
const router = Router();

//rutas de unidad de aprendizaje
router.get('/learningUnit', getLearningUnit);
router.post('/learningUnit', createLearningUnit);
router.put('/learningUnit/:id', updateLearningUnit);
router.delete('/learningUnit/:id', deleteLearningUnit);
router.get('/learningUnit/:id', getByIdLearningUnit);

export default router
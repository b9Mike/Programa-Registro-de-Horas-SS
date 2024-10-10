import { Router } from "express";
import { getCareers, createCareer, updateCareer, deleteCareer, getByIdCareer } from '../controllers/career.controller.js'
const router = Router();

//rutas de unidad de aprendizaje
router.get('/career', getCareers);
router.post('/career', createCareer);
router.put('/career/:id', updateCareer);
router.delete('/career/:id', deleteCareer);
router.get('/career/:id', getByIdCareer);

export default router
import { Router } from "express";
import { getDegrees, createDegrees, updateDegrees, deleteDegrees, getByIdDegrees } from '../controllers/degrees.controller.js'
const router = Router();

//rutas para carrera
router.get('/degrees', getDegrees);
router.post('/degrees', createDegrees);
router.put('/degrees/:id', updateDegrees);
router.delete('/degrees/:id', deleteDegrees);
router.get('/degrees/:id', getByIdDegrees);

export default router
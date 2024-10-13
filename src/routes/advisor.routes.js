import { Router } from "express";
//import { getAdvisors, createAdvisors, updateAdvisors, deleteAdvisors, getByIdAdvisors } from '../controllers/Advisors.controller.js'
const router = Router();

//rutas de asesores
router.get('/advisors', getAdvisors);
router.post('/advisors', createAdvisors);
router.put('/advisors/:id', updateAdvisors);
router.delete('/advisors/:id', deleteAdvisors);
router.get('/advisors/:id', getByIdAdvisors);

export default router
import { Router } from "express";
//import { getAdvisees, createAdvisees, updateAdvisees, deleteAdvisees, getByIdAdvisees } from '../controllers/Advisees.controller.js'
const router = Router();

//rutas para asesorados
router.get('/advisees', getAdvisees);
router.post('/advisees', createAdvisees);
router.put('/advisees/:id', updateAdvisees);
router.delete('/advisees/:id', deleteAdvisees);
router.get('/advisees/:id', getByIdAdvisees);

export default router
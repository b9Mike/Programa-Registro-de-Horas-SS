import { Router } from "express";
//import { getAdvisorySessions, createAdvisorySessions, updateAdvisorySessions, deleteAdvisorySessions, getByIdAdvisorySessions } from '../controllers/AdvisorySessions.controller.js'
const router = Router();

//rutas de asesorias
router.get('/advisorySessions', getAdvisorySessions);
router.post('/advisorySessions', createAdvisorySessions);
router.put('/advisorySessions/:id', updateAdvisorySessions);
router.delete('/advisorySessions/:id', deleteAdvisorySessions);
router.get('/advisorySessions/:id', getByIdAdvisorySessions);

export default router
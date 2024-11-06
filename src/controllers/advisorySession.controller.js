import { SessionMapper } from '../mappers/advisorySessionMapper.js';
import { advisorySessionRepository } from '../repositories/advisorySessionRepository.js';
import { getDateRange } from '../services/advisorySession.service.js';

export const getAllAdvisorySessions = async (req, res) => {
    const { range } = req.query;
    let { start, end } = getDateRange(range);
    try{
        const advisorySessions = await advisorySessionRepository.getAllAdvisorySessions(start, end);
        return res.status(200).json(advisorySessions);
    } catch (error){
        return res.status(500).json({message: error.message});
    } 
}

export const getAdvisorySessionById = async (req, res) =>{
    const { sessionId } = req.params;

    if(!sessionId)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const advisorySession = await advisorySessionRepository.getAdvisorySessionById(sessionId);
        return res.status(200).json(advisorySession);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const createAdvisorySession = async (req, res) => {
    if(!(req.user.Type == 1 || req.use.Type == 2) || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    try{
        const sessionCreateDTO = SessionMapper.toCreateDTO(req.body, req.user.id);
        const advisorySession = await advisorySessionRepository.createAdvisorySession(sessionCreateDTO);
        const sessionResponseDTO = SessionMapper.toResponseDTO(advisorySession);
        return res.status(200).json(sessionResponseDTO);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const updateAdvisorySession = async (req, res) =>{ 
    if(!(req.user.Type == 1 || req.use.Type == 2) || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    try{
        const sessionUpdateDTO = SessionMapper.toUpdateDTO(req.params, req.body, req.user.id);
        const updatedAdvisorySession = await advisorySessionRepository.updateAdvisorySession(sessionUpdateDTO.Identity, sessionUpdateDTO);
        const sessionResponseDTO = SessionMapper.toResponseDTO(updatedAdvisorySession);
        return res.status(200).json(sessionResponseDTO);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const toggleAdvisorySessionActivation = async (req, res) => {
    if(req.user.Type != 1 || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    const { sessionId } = req.params;

    if(!sessionId)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const result = await advisorySessionRepository.toggleAdvisorySessionActivation(sessionId);
        return res.status(200).json(result);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
    
}

export const getAdvisorySessionsByAdvisor = async (req, res) => {
    const { enrollment } = req.params;

    try {
        const advisories = await advisorySessionRepository.getAdvisorySessionsByAdvisor(enrollment);
        if (!advisories || advisories.length === 0) {
            return res.status(404).json({ message: 'No se encontraron asesorías para este asesor.' });
        }
        return res.json(advisories);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las asesorías del asesor', error: error.message });
    }
};


export const getAdvisorySessionsByDegree = async (req, res) => {
    const { identity } = req.params;

    try {
        const advisories = await advisorySessionRepository.getAdvisorySessionsByDegreeUsingUnit(identity);

        if (!advisories || advisories.length === 0) {
            return res.status(404).json({ message: 'No se encontraron asesorías para esta carrera.' });
        }
        return res.json(advisories);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las asesorías de la carrera', error: error.message });
    }
};

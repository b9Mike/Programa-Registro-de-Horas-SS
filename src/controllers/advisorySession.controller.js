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

    const { learningUnitIdentity, topic, professor, classType, 
        advisorIdentity, adviseeIdentity, sessionDate, startTime, userCreation } = req.body;
    
    if(!learningUnitIdentity || !topic || !professor || !classType 
        || !advisorIdentity || !adviseeIdentity || !sessionDate || !startTime || !userCreation)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const advisorySession = await advisorySessionRepository.createAdvisorySession({
            LearningUnitIdentity: learningUnitIdentity,
            Topic: topic,
            Professor: professor,
            ClassType: classType,
            AdvisorIdentity: advisorIdentity,
            AdviseeIdentity: adviseeIdentity,
            SessionDate: sessionDate,
            StartTime: startTime,
            EndTime: null,
            UserCreation: userCreation,
            CreatedAt: new Date(),
            UserUpdate: userCreation,
            UpdateAt: new Date(),
            Active: true
        });

        return res.status(200).json(advisorySession);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const updateAdvisorySession = async (req, res) =>{ 
    if(!(req.user.Type == 1 || req.use.Type == 2) || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    const { sessionId } = req.params;
    const { learningUnitIdentity, topic, professor, classType, 
        advisorIdentity, adviseeIdentity, sessionDate, startTime, 
        endTime, userUpdate } = req.body;
    
    if(!sessionId || !learningUnitIdentity || !topic || !professor 
        || !classType || !advisorIdentity || !adviseeIdentity || !sessionDate 
        || !startTime || (!endTime && endTime !== undefined) || !userUpdate)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const updatedAdvisorySession = await advisorySessionRepository.updateAdvisorySession(sessionId,  {
            LearningUnitIdentity: learningUnitIdentity,
            Topic: topic, 
            Professor: professor, 
            ClassType: classType, 
            AdvisorIdentity: advisorIdentity, 
            AdviseeIdentity: adviseeIdentity, 
            SessionDate: sessionDate, 
            StartTime: startTime, 
            EndTime: endTime, 
            UserUpdate: userUpdate, 
            UpdateAt: new Date() 
        });
        return res.status(200).json(updatedAdvisorySession);
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

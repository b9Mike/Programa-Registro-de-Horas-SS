import { advisorySessionRepository } from '../repositories/advisorySessionRepository';

export const getAllAdvisorySessions = async (req, res) => {
    try{
        const advisorySessions = await advisorySessionRepository.getAllAdvisorySessions();
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
    const { learningUnitIdentity, topic, professor, classType, 
        advisorIdentity, adviseeIdentity, sessionDate, startTime, userCreation } = req.body;
    
    if(!learningUnitIdentity || !topic || !professor || !classType 
        || !advisorIdentity || !adviseeIdentity || !sessionDate || !startTime || !userCreation)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const advisorySession = await advisorySessionRepository.createAdvisorySession({
            learningUnitIdentity,
            topic,
            professor,
            classType,
            advisorIdentity,
            adviseeIdentity,
            sessionDate,
            startTime,
            EndTime: null,
            userCreation,
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
            UpdatedAt: new Date() 
        });
        return res.status(200).json(updatedAdvisorySession);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const toggleAdvisorySessionActivation = async (req, res) => {
    const { sessionId } = req.params;

    if(!sessionId)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const result = await advisorySessionRepository.toggleAdvisorySessionActivation(Enrollment);
        return res.status(200).json(result);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
    
}

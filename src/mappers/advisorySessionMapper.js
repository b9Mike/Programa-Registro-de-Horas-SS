import { sessionCreate, sessionUpdate, sessionResponse } from "../DTOs/advisorySessionDTO.js";
import { learningUnitRepository } from '../repositories/learningUnitRepository.js'; 

export class SessionMapper{
    static toCreateDTO(requestBody, requestUser){
        const { learningUnit, topic, professor, classType, 
            advisorIdentity, adviseeIdentity, sessionDate, startTime } = requestBody;

        if(!learningUnit || !topic || !professor || !classType 
        || !advisorIdentity || !adviseeIdentity || !sessionDate || !startTime)
            throw new Error('Campos faltantes');

        return new sessionCreate(learningUnit, topic, professor, classType, advisorIdentity, 
            adviseeIdentity, sessionDate, startTime, requestUser);
    }

    static toUpdateDTO(requestParams, requestBody, requestUser){
        const { sessionId } = requestParams;
        const { learningUnit, topic, professor, classType, 
            advisorIdentity, adviseeIdentity, sessionDate, startTime, endTime } = requestBody;

        if(!sessionId || !learningUnit || !topic || !professor || !classType 
        || !advisorIdentity || !adviseeIdentity || !sessionDate || !startTime || !endTime || !requestUser)
            throw new Error('Campos faltantes');

        return new sessionUpdate(sessionId, learningUnit, topic, professor, classType, advisorIdentity, 
            adviseeIdentity, sessionDate, startTime, endTime, requestUser);
    }

    static toResponseDTO(session){
        const { Identity, LearningUnitIdentity, Topic, Professor, ClassType, 
            AdvisorIdentity, AdviseeIdentity, SessionDate, StartTime, EndTime } = session.dataValues;

        if(!Identity || !LearningUnitIdentity || !Topic || !Professor || !ClassType 
        || !AdvisorIdentity || !AdviseeIdentity || !SessionDate || !StartTime || (!EndTime && EndTime != null))
            throw new Error('Campos faltantes');

            return new sessionResponse(Identity, LearningUnitIdentity, Topic, Professor, ClassType, 
            AdvisorIdentity, AdviseeIdentity, SessionDate, StartTime, EndTime);

    }

}
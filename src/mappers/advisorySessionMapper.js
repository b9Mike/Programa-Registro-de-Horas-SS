import { sessionCreate, sessionUpdate, sessionResponse } from '../DTOs/advisorySessionDTO.js';

export class SessionMapper {
  static toCreateDTO(requestBody, requestUser) {
    const { LearningUnitIdentity, Topic, Professor, ClassType, AdvisorIdentity, AdviseeIdentity, SessionDate, StartTime } = requestBody;

    if (!LearningUnitIdentity || !Topic || !Professor || !ClassType || !AdvisorIdentity || !AdviseeIdentity || !SessionDate || !StartTime) throw new Error('Campos faltantes');

    return new sessionCreate(LearningUnitIdentity, Topic, Professor, ClassType, AdvisorIdentity, AdviseeIdentity, SessionDate, StartTime, requestUser);
  }

  static toUpdateDTO(requestParams, requestBody, requestUser) {
    const { sessionId } = requestParams;
    const { LearningUnitIdentity, Topic, Professor, ClassType, AdvisorIdentity, AdviseeIdentity, SessionDate, StartTime, EndTime } = requestBody;

    if (!sessionId || !LearningUnitIdentity || !Topic || !Professor || !ClassType || !AdvisorIdentity || !AdviseeIdentity || !SessionDate || !StartTime || !EndTime || !requestUser) throw new Error('Campos faltantes');

    return new sessionUpdate(sessionId, LearningUnitIdentity, Topic, Professor, ClassType, AdvisorIdentity, AdviseeIdentity, SessionDate, StartTime, EndTime, requestUser);
  }

  static toResponseDTO(session) {
    const { Identity, LearningUnitIdentity, Topic, Professor, ClassType, AdvisorIdentity, AdviseeIdentity, SessionDate, StartTime, EndTime } = session.dataValues;

    if (!Identity || !LearningUnitIdentity || !Topic || !Professor || !ClassType || !AdvisorIdentity || !AdviseeIdentity || !SessionDate || !StartTime || (!EndTime && EndTime != null)) throw new Error('Campos faltantes');

    return new sessionResponse(Identity, LearningUnitIdentity, Topic, Professor, ClassType, AdvisorIdentity, AdviseeIdentity, SessionDate, StartTime, EndTime);
  }
}

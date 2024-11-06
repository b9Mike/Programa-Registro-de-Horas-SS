//Que aceptar - Create
/*
    Body:
    learningUnit
    topic
    professor
    classType
    advisorIdentity
    adviseeIdentity
    sessionDate
    startTime
    endTime

    Header:
    Usuario Actual
*/
export class sessionCreate{
    constructor(learningUnitIdentity, topic, professor, classType, 
        advisorIdentity, adviseeIdentity, sessionDate, startTime, requestUser){
        this.LearningUnitIdentity = learningUnitIdentity;
        this.Topic = topic;
        this.Professor = professor;
        this.ClassType = classType;
        this.AdvisorIdentity = advisorIdentity;
        this.AdviseeIdentity = adviseeIdentity;
        this.SessionDate = sessionDate;
        this.StartTime = startTime;
        this.EndTime = null;
        this.UserCreation = requestUser;
        this.CreatedAt = new Date();
        this.UserUpdate = requestUser;
        this.UpdateAt = new Date();
        this.Active = true;
    }
}

//Que aceptar - Update
/* 
    Params:
    id

    Body:
    learningUnit
    topic
    professor
    classType
    advisorIdentity
    adviseeIdentity
    sessionDate
    startTime
    endTime

    Header:
    Usuario Actual
*/
export class sessionUpdate{
    constructor(id, learningUnitIdentity, topic, professor, classType, 
        advisorIdentity, adviseeIdentity, sessionDate, startTime, endTime, requestUser){
        this.Identity = id;
        this.LearningUnitIdentity = learningUnitIdentity;
        this.Topic = topic;
        this.Professor = professor;
        this.ClassType = classType;
        this.AdvisorIdentity = advisorIdentity;
        this.AdviseeIdentity = adviseeIdentity;
        this.SessionDate = sessionDate;
        this.StartTime = startTime;
        this.EndTime = endTime;
        this.UserUpdate = requestUser;
        this.UpdateAt = new Date();
        this.Active = true;
    }
}

//Que mostrar en getAdvisors y getAdvisorById || getAdvisees y getAdviseeById
/*
    LearningUnit
    Topic
    Professor
    ClassType
    AdvisorIdentity
    AdviseeIdentity
    SessionDate
    StartTime
    EndTime
*/
export class sessionResponse{
    constructor(id, learningUnit, topic, professor, classType, 
        advisorIdentity, adviseeIdentity, sessionDate, startTime, endTime){
        this.Identity = id;
        this.LearningUnit = learningUnit;
        this.Topic = topic;
        this.Professor = professor;
        this.ClassType = classType;
        this.AdvisorIdentity = advisorIdentity;
        this.AdviseeIdentity = adviseeIdentity;
        this.SessionDate = sessionDate;
        this.StartTime = startTime;
        this.EndTime = endTime;
    }
}
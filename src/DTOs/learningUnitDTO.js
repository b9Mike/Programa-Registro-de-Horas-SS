//Que aceptar - Create
/*
    Body:
    name
    degreeIdentity

    Header:
    Usuario Actual
*/
export class learningUnitCreate{
    constructor(name, degreeIdentity, requestUser){
        this.Name = name;
        this.DegreeIdentity = degreeIdentity;
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

    body:
    name
    degreeIdentity

    Header:
    Usuario Actual
*/
export class learningUnitUpdate{
    constructor(id, name, degreeIdentity, requestUser){
        this.Identity = id
        this.Name = name;
        this.DegreeIdentity = degreeIdentity;
        this.UserUpdate = requestUser;
        this.UpdateAt = new Date();
    }
}

//Que mostrar en getLearningUnits y getLearningUnitsById
/*
    Identity
    Name
    DegreeIdentity
*/
export class learningUnitResponse{
    constructor(identity, name, degreeIdentity){
        this.Identity = identity;
        this.Name = name;
        this.DegreeIdentity = degreeIdentity;
    }
}
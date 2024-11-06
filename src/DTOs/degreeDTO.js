//Que aceptar - Create
/*
    Body:
    degreeName
    shortName

    Header:
    Usuario Actual
*/
export class degreeCreate{
    constructor(degreName, shortName, requestUser){
        this.DegreeName = degreName;
        this.ShortName = shortName;
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
    degreeName
    shortName

    Header:
    Usuario Actual
*/
export class degreeUpdate{
    constructor(id, degreeName, shortName, requestUser){
        this.Identity = id
        this.DegreeName = degreeName;
        this.ShortName = shortName;
        this.UserUpdate = requestUser;
        this.UpdateAt = new Date();
    }
}

//Que mostrar en getDegrees y getDegreeById
/*
    Id
    DegreeName
    ShortName
*/
export class degreeResponse{
    constructor(identity, degreeName, shortName){
        this.Identity = identity;
        this.DegreeName = degreeName;
        this.ShortName = shortName;
    }
}
//Que aceptar - Create
/*
    Body:
    enrollment
    gender
    name
    degreeShortName

    Header:
    Usuario Actual
*/
export class studentCreate{
    constructor(enrollment, gender, name, degreeIdentity, requestUser){
        this.Enrollment = enrollment
        this.Gender = gender;
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
    enrollment

    Body:
    gender
    name
    degreeShortName

    Header:
    Usuario Actual
*/
export class studentUpdate{
    constructor(enrollment, gender, name, degreeIdentity, requestUser){
        this.Enrollment = enrollment
        this.Gender = gender;
        this.Name = name;
        this.DegreeIdentity = degreeIdentity;
        this.UserUpdate = requestUser;
        this.UpdateAt = new Date();
    }
}

//Que mostrar en getAdvisors y getAdvisorById || getAdvisees y getAdviseeById
/*
    Enrollment
    Gender
    Name
    DegreeIdentity
*/
export class studentResponse{
    constructor(enrollment, gender, name, degreeIdentity){
        this.Enrollment = enrollment;
        this.Gender = gender;
        this.Name = name;
        this.DegreeIdentity = degreeIdentity
    }
}
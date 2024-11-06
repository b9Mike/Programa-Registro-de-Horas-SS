//Que aceptar - Register
/*  
    Body:
    enrollment
    name
    password
    type = {1 (Admin) - 2 (Recepcion) - ... }

    Header:
    Usuario Actual
*/
export class userRegister{
    constructor(enrollment, name, password, type, requestUser){
        this.Enrollment = enrollment;
        this.Name = name;
        this.Password = password;
        this.Type = type;
        this.UserCreation = requestUser;
        this.CreatedAt = new Date();
        this.UserUpdate = requestUser;
        this.UpdatedAt = new Date();
        this.Active = true;
    }
}


//Que aceptar - Login
/*
    Body:
    enrollment
    password
*/
export class userLogin{
    constructor(enrollment, password){
        this.Enrollment = enrollment;
        this.Password = password;
    }
}

//Que aceptar - update
/* 
    Params:
    enrollment

    Body:
    name
    password
    type = {1 (Admin) - 2 (Recepcion) - ... }

    Header:
    Usuario Actual
*/
export class userUpdate{
    constructor(enrollment, name, password, type, requestUser){
        this.Enrollment = enrollment
        this.Name = name;
        this.Password = password;
        this.Type = type;
        this.UserUpdate = requestUser;
        this.UpdatedAt = new Date();
    }
}

//Que mostrar en getAllUsers
/*
    Enrollment
    Name
    type = {1 (Admin) - 2 (Recepcion) - ... }
*/
export class userResponse{
    constructor(enrollment, name, type){
        this.Enrollment = enrollment;
        this.Name = name;
        this.Type = type;
    }
}
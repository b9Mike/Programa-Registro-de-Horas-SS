import { studentCreate, studentUpdate, studentResponse } from "../DTOs/studentDTO.js";

export class StudentMapper{
    static toCreateDTO(requestBody, requestUser){
        //Validar si los campos son falsy
        const { enrollment, gender, name, degree } = requestBody;
        if (!enrollment || !gender || !name || !degree || !requestUser)
            throw new Error('Campos faltantes');

        return new studentCreate(enrollment, gender, name, degree, requestUser);
    }

    static toUpdateDTO(requestParams, requestBody, requestUser){
        //Validar si los campos son falsy
        const { enrollment } = requestParams;
        const { gender, name, degree } = requestBody;
        if (!enrollment || !gender || !name || !degree || !requestUser)
            throw new Error('Campos faltantes');

        return new studentUpdate(enrollment, gender, name, degree, requestUser);
    }

    static toResponseDTO(student){
        const { Enrollment, Gender, Name, DegreeIdentity } = student.dataValues;
        if (!Enrollment || !Gender || !Name || !DegreeIdentity)
            throw new Error('Campos faltantes');


        return new studentResponse(Enrollment, Gender, Name, DegreeIdentity);
    }

}
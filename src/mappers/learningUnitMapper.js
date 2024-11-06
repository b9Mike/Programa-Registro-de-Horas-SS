import { learningUnitCreate, learningUnitUpdate, learningUnitResponse } from "../DTOs/learningUnitDTO.js";
import { degreeRepository } from '../repositories/degreeRepository.js'; 

export class LearningUnitMapper{
    static toCreateDTO(requestBody, requestUser){
        //Validar si los campos son falsy
        const { name, degreeIdentity } = requestBody;
        if (!name || !degreeIdentity || !requestUser)
            throw new Error('Campos faltantes');
        
        return new learningUnitCreate(name, degreeIdentity, requestUser);
    }

    static toUpdateDTO(requestParams, requestBody, requestUser){
        //Validar si los campos son falsy
        const { id } = requestParams;
        const { name, degreeIdentity } = requestBody;
        if (!id || !name || !degreeIdentity || !requestUser)
            throw new Error('Campos faltantes');

        return new learningUnitUpdate(id, name, degreeIdentity, requestUser);
    }

    static toResponseDTO(learningUnit){
        //Validar si los campos son falsy
        const {Identity, Name, DegreeIdentity} = learningUnit.dataValues;
        if (!Identity || !Name || !DegreeIdentity)
            throw new Error('Campos faltantes');

        //Conseguir abreviatura de la carrera con el id
        return new learningUnitResponse(Identity, Name, DegreeIdentity);
    }

}
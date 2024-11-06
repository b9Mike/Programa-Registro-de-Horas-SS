import { degreeCreate, degreeUpdate, degreeResponse } from "../DTOs/degreeDTO.js";

export class DegreeMapper{
    static toCreateDTO(requestBody, requestUser){
        //Validar si los campos son falsy
        const { degreeName, shortName } = requestBody;
        if (!degreeName || !shortName || !requestUser)
            throw new Error('Campos faltantes');
        
        return new degreeCreate(degreeName, shortName, requestUser);
    }

    static toUpdateDTO(requestParams, requestBody, requestUser){
        //Validar si los campos son falsy
        const { id } = requestParams;
        const { degreeName, shortName } = requestBody;
        if (!degreeName || !shortName || !requestUser || !id)
            throw new Error('Campos faltantes');
        
        return new degreeUpdate(id, degreeName, shortName, requestUser);
    }

    static toResponseDTO(degree){
        //Validar si los campos son falsy
        const { Identity, DegreeName, ShortName} = degree.dataValues;
        if (!Identity || !DegreeName || !ShortName)
            throw new Error('Campos faltantes');

        return new degreeResponse(Identity, DegreeName, ShortName);
    }
    
}

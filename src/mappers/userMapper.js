import { userRegister, userLogin, userUpdate, userResponse } from "../DTOs/userDTO.js";

export class UserMapper {
    static toRegisterDTO(requestBody, requestUser){
        //Validar si los campos son falsy
        const { enrollment, name, password, type } = requestBody;
        if (!enrollment || !name || !password || !type || !requestUser)
            throw new Error('Campos faltantes');

        return new userRegister(enrollment, name, password, type, requestUser);
    }

    static toLoginDTO(requestBody){
        //Validar si los campos son falsy
        const { enrollment, password } = requestBody;
        if (!enrollment || !password)
            throw new Error('Campos faltantes');

        return new userLogin(enrollment, password);
    }

    static toUpdateDTO(requestParams, requestBody, requestUser){
        //Validar si los campos son falsy
        const { enrollment } = requestParams;
        const {name, password, type } = requestBody;
        if (!enrollment || !name || !password || !type || !requestUser)
            throw new Error('Campos faltantes');

        return new userUpdate(enrollment, name, password, type, requestUser);
    }

    static toResponseDTO(user){
        //Validar si los campos son falsy
        const { Enrollment, Name, Type} = user.dataValues;
        if (!Enrollment || !Name || !Type)
            throw new Error('Campos faltantes');
        
        return new userResponse(Enrollment, Name, Type);
    }

}

import { userRegister, userLogin, userUpdate, userResponse } from '../DTOs/userDTO.js';

export class UserMapper {
  static toRegisterDTO(requestBody, requestUser) {
    //Validar si los campos son falsy
    const { Enrollment, Name, Password, Type } = requestBody;
    if (!Enrollment || !Name || !Password || !Type || !requestUser) throw new Error('Campos faltantes');

    return new userRegister(Enrollment, Name, Password, Type, requestUser);
  }

  static toLoginDTO(requestBody) {
    //Validar si los campos son falsy
    const { Enrollment, Password } = requestBody;
    if (!Enrollment || !Password) throw new Error('Campos faltantes');

    return new userLogin(Enrollment, Password);
  }

  static toUpdateDTO(requestParams, requestBody, requestUser) {
    //Validar si los campos son falsy
    const { enrollment } = requestParams;
    const { Name, Password, Type } = requestBody;
    if (!enrollment || !Name || !Type || !requestUser) throw new Error('Campos faltantes');

    return new userUpdate(enrollment, Name, Password, Type, requestUser);
  }

  static toResponseDTO(user) {
    //Validar si los campos son falsy
    const { Enrollment, Name, Type } = user.dataValues;
    if (!Enrollment || !Name || !Type) throw new Error('Campos faltantes');

    return new userResponse(Enrollment, Name, Type);
  }
}

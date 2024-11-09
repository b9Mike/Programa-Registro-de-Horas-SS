import { studentCreate, studentUpdate, studentResponse } from '../DTOs/studentDTO.js';

export class StudentMapper {
  static toCreateDTO(requestBody, requestUser) {
    //Validar si los campos son falsy
    const { Enrollment, Gender, Name, DegreeIdentity } = requestBody;
    if (!Enrollment || !Gender || !Name || !DegreeIdentity || !requestUser) throw new Error('Campos faltantes');

    return new studentCreate(Enrollment, Gender, Name, DegreeIdentity, requestUser);
  }

  static toUpdateDTO(requestParams, requestBody, requestUser) {
    //Validar si los campos son falsy
    const { enrollment } = requestParams;
    const { Gender, Name, DegreeIdentity } = requestBody;
    if (!enrollment || !Gender || !Name || !DegreeIdentity || !requestUser) throw new Error('Campos faltantes');

    return new studentUpdate(Enrollment, Gender, Name, DegreeIdentity, requestUser);
  }

  static toResponseDTO(student) {
    const { Enrollment, Gender, Name, DegreeIdentity } = student.dataValues;
    if (!Enrollment || !Gender || !Name || !DegreeIdentity) throw new Error('Campos faltantes');

    return new studentResponse(Enrollment, Gender, Name, DegreeIdentity);
  }
}

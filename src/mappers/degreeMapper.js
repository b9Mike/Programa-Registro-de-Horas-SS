import { degreeCreate, degreeUpdate, degreeResponse } from '../DTOs/degreeDTO.js';

export class DegreeMapper {
  static toCreateDTO(requestBody, requestUser) {
    //Validar si los campos son falsy
    const { DegreeName, ShortName } = requestBody;
    if (!DegreeName || !ShortName || !requestUser) throw new Error('Campos faltantes');

    return new degreeCreate(DegreeName, ShortName, requestUser);
  }

  static toUpdateDTO(requestParams, requestBody, requestUser) {
    //Validar si los campos son falsy
    const { id } = requestParams;
    const { DegreeName, ShortName } = requestBody;
    if (!DegreeName || !ShortName || !requestUser || !id) throw new Error('Campos faltantes');

    return new degreeUpdate(id, DegreeName, ShortName, requestUser);
  }

  static toResponseDTO(degree) {
    //Validar si los campos son falsy
    const { Identity, DegreeName, ShortName } = degree.dataValues;
    if (!Identity || !DegreeName || !ShortName) throw new Error('Campos faltantes');

    return new degreeResponse(Identity, DegreeName, ShortName);
  }
}

import { learningUnitCreate, learningUnitUpdate, learningUnitResponse } from '../DTOs/learningUnitDTO.js';

export class LearningUnitMapper {
  static toCreateDTO(requestBody, requestUser) {
    //Validar si los campos son falsy
    const { Name, DegreeIdentity } = requestBody;
    if (!Name || !DegreeIdentity || !requestUser) throw new Error('Campos faltantes');
    return new learningUnitCreate(Name, DegreeIdentity, requestUser);
  }

  static toUpdateDTO(requestParams, requestBody, requestUser) {
    //Validar si los campos son falsy
    const { id } = requestParams;
    const { Name, DegreeIdentity } = requestBody;
    if (!id || !Name || !DegreeIdentity || !requestUser) throw new Error('Campos faltantes');
    return new learningUnitUpdate(id, Name, DegreeIdentity, requestUser);
  }

  static toResponseDTO(learningUnit) {
    //Validar si los campos son falsy
    const { Identity, Name, DegreeIdentity } = learningUnit.dataValues;
    if (!Identity || !Name || !DegreeIdentity) throw new Error('Campos faltantes');
    //Conseguir abreviatura de la carrera con el id
    return new learningUnitResponse(Identity, Name, DegreeIdentity);
  }
}

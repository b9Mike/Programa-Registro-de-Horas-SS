// EntryExitRecordMapper.js
import { EntryExitRecordCreate, EntryExitRecordUpdate, EntryExitRecordResponse } from '../DTOs/entryExitRecordDTO.js';

export class EntryExitRecordMapper {
    static toCreateDTO(requestBody, requestUser) {
        const { AdvisorIdentity, EntryTime, ExitTime, CurrentDate } = requestBody;

        if (!AdvisorIdentity || !EntryTime || !ExitTime || !CurrentDate || !requestUser) {
            throw new Error('Campos faltantes');
        }

        const formattedEntryTime = this.formatTime(EntryTime);
        const formattedExitTime = this.formatTime(ExitTime);

        // Crea el DTO con los valores formateados
        return new EntryExitRecordCreate(
            AdvisorIdentity,
            formattedEntryTime,
            formattedExitTime,
            CurrentDate,
            requestUser
        );
    }

    static toUpdateDTO(requestParams, requestBody, requestUser) {
        const { id } = requestParams;
        const { EntryTime, ExitTime, CurrentDate } = requestBody;
        if (!id || !EntryTime || !ExitTime || !CurrentDate || !requestUser) {
            throw new Error('Campos faltantes');
        }

        const formattedEntryTime = this.formatTime(EntryTime);
        const formattedExitTime = this.formatTime(ExitTime);

        return new EntryExitRecordUpdate(id, formattedEntryTime, formattedExitTime, CurrentDate, requestUser);
    }

    static toResponseDTO(entryExitRecord) {
        const { Identity, AdvisorIdentity, EntryTime, ExitTime, CurrentDate } = entryExitRecord.dataValues;
        if (!Identity || !AdvisorIdentity || !EntryTime || !ExitTime || !CurrentDate) {
            throw new Error('Campos faltantes');
        }

        return new EntryExitRecordResponse(Identity, AdvisorIdentity, EntryTime, ExitTime, CurrentDate);
    }

    static formatTime(time) {
        if (!time) {
            throw new Error("El tiempo debe ser válido");
        }

        const date = new Date(`1970-01-01T${time}Z`);

        if (isNaN(date.getTime())) {
            throw new Error('Formato de hora inválido');
        }

        return date.toISOString().slice(11, 19);
    }
}

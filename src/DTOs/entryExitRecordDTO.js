export class EntryExitRecordCreate {
    constructor(advisorIdentity, entryTime, exitTime, currentDate, requestUser) {
        this.AdvisorIdentity = advisorIdentity;
        // Para enviar la hora hay que madnarlo en formato 'HH:mm:ss'
        this.EntryTime = this.formatTime(entryTime);
        this.ExitTime = this.formatTime(exitTime);
        this.CurrentDate = currentDate;
        this.UserCreation = requestUser;
        this.CreatedAt = new Date();
        this.UserUpdate = requestUser;
        this.UpdatedAt = new Date();
        this.Active = true;
    }

    // Función para asegurar que la hora esté en formato 'HH:mm:ss'
    formatTime(time) {
        if (!time) {
            throw new Error("El tiempo debe ser válido");
        }
        
        // Si el tiempo ya está en formato 'HH:mm:ss', lo retorna directamente
        const date = new Date(`1970-01-01T${time}Z`);
        
        // Si el tiempo es inválido, arrojar un error
        if (isNaN(date.getTime())) {
            throw new Error('Formato de hora inválido');
        }

        // Retornar solo la parte de la hra: 'HH:mm:ss'
        return date.toISOString().slice(11, 19);
    }
}

export class EntryExitRecordUpdate {
    constructor(id, entryTime, exitTime, currentDate, requestUser) {
        this.Identity = id;
        this.EntryTime = this.formatTime(entryTime);
        this.ExitTime = this.formatTime(exitTime);
        this.CurrentDate = currentDate;
        this.UserUpdate = requestUser;
        this.UpdatedAt = new Date();
    }

    
    formatTime(time) {
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

export class EntryExitRecordResponse {
    constructor(identity, advisorIdentity, entryTime, exitTime, currentDate) {
        this.Identity = identity;
        this.AdvisorIdentity = advisorIdentity;
        this.EntryTime = entryTime;
        this.ExitTime = exitTime;
        this.CurrentDate = currentDate;
    }
}

import { EntryExitRecord } from "../models/EntryExitRecord.js";

// Funciones para interactuar con la tabla EntryExitRecord
export const entryExitRecordRepository = {

    // Obtener todos los registros de entrada y salida
    getAllEntryExitRecords: async () => {
        try {
            const records = await EntryExitRecord.findAll({
                attributes: [
                    'Identity',
                    'AdvisorIdentity',
                    'EntryTime',
                    'ExitTime',
                    'CurrentDate',
                    'UserCreation',
                    'CreatedAt',
                    'UserUpdate',
                    'UpdatedAt',
                    'Active'
                ],
            });
            return records;
        } catch (error) {
            throw new Error('Error al obtener los registros de entrada/salida: ' + error.message);
        }
    },

    // Obtener un registro de entrada y salida por su ID (Identity)
    getEntryExitRecordById: async (id) => {
        try {
            const record = await EntryExitRecord.findOne({
                attributes: [
                    'Identity',
                    'AdvisorIdentity',
                    'EntryTime',
                    'ExitTime',
                    'CurrentDate',
                    'UserCreation',
                    'CreatedAt',
                    'UserUpdate',
                    'UpdatedAt',
                    'Active'
                ],
                where: { Identity: id },
            });
            return record;
        } catch (error) {
            throw new Error('Error al obtener el registro de entrada/salida: ' + error.message);
        }
    },

    // Crear un nuevo registro de entrada y salida
    createEntryExitRecord: async (recordData) => {
        try {
            const newRecord = await EntryExitRecord.create(recordData);
            return newRecord;
        } catch (error) {
            throw new Error('Error al crear el registro de entrada/salida: ' + error.message);
        }
    },

    // Actualizar un registro de entrada y salida existente
    updateEntryExitRecord: async (id, updatedData) => {
        try {
            const [updated] = await EntryExitRecord.update(updatedData, {
                where: { Identity: id },
            });

            if (updated) {
                const updatedRecord = await EntryExitRecord.findOne({ where: { Identity: id } });
                return updatedRecord;
            }
            throw new Error('Registro de entrada/salida no encontrado');
        } catch (error) {
            throw new Error('Error al actualizar el registro de entrada/salida: ' + error.message);
        }
    },

    // Activar o desactivar un registro de entrada y salida
    toggleEntryExitRecordActivation: async (id) => {
        try {
            const record = await EntryExitRecord.findOne({ where: { Identity: id } });
            if (!record) {
                throw new Error('El registro de entrada/salida no existe');
            }

            const newStatus = !record.Active;

            await record.update({
                Active: newStatus,
                UpdatedAt: new Date(),
            });

            return {
                message: newStatus ? 'Registro activado exitosamente' : 'Registro desactivado exitosamente',
                record,
            };
        } catch (error) {
            throw new Error('Error al actualizar el estado del registro de entrada/salida: ' + error.message);
        }
    },
};

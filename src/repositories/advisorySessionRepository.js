//Repository de sesion de asesorias
import { AdvisorySession } from "../models/AdvisorySession.js";

//Funciones para interactuar con la tabla de sesion de asesorias
export const advisorySessionRepository = {

    // Crear una nueva sesión de asesoría
    createAdvisorySession: async (sessionData) => {
        try {
            const newSession = await AdvisorySession.create(sessionData);
            return newSession;
        } catch (error) {
            throw new Error('Error al crear la sesión de asesoría: ' + error.message);
        }
    },

    // Obtener todas las sesiones de asesoría
    getAllAdvisorySessions: async () => {
        try {
            const sessions = await AdvisorySession.findAll();
            return sessions;
        } catch (error) {
            throw new Error('Error al obtener las sesiones de asesoría: ' + error.message);
        }
    },

    // Obtener una sesión de asesoría por ID
    getAdvisorySessionById: async (sessionId) => {
        try {
            const session = await AdvisorySession.findOne({
                where: { Identity: sessionId }
            });
            return session;
        } catch (error) {
            throw new Error('Error al obtener la sesión de asesoría: ' + error.message);
        }
    },

    // Actualizar una sesión de asesoría
    updateAdvisorySession: async (sessionId, sessionData) => {
        try {
            const updatedSession = await AdvisorySession.update(sessionData, {
                where: { Identity: sessionId }
            });
            return updatedSession;
        } catch (error) {
            throw new Error('Error al actualizar la sesión de asesoría: ' + error.message);
        }
    },

    // Eliminar una sesión de asesoría
    deleteAdvisorySession: async (sessionId) => {
        try {
            const deletedSession = await AdvisorySession.destroy({
                where: { Identity: sessionId }
            });
            return deletedSession;
        } catch (error) {
            throw new Error('Error al eliminar la sesión de asesoría: ' + error.message);
        }
    }
};

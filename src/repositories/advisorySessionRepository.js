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

    // Activar o desactivar una sesión de asesoría
    toggleAdvisorySessionActivation: async (identity) => {
        try {
            const advisorySession = await AdvisorySession.findOne({ where: { Identity: identity } });
            if (!advisorySession) {
                throw new Error('La sesión de asesoría no existe');
            }
    
            const newStatus = !advisorySession.Active;
    
            await advisorySession.update({
                Active: newStatus,
                UpdateAt: new Date(),
            });
    
            return {
                message: newStatus ? 'Sesión de asesoría activada exitosamente' : 'Sesión de asesoría desactivada exitosamente',
                advisorySession,
            };
        } catch (error) {
            throw new Error('Error al actualizar el estado de la sesión de asesoría: ' + error.message);
        }
    }
};
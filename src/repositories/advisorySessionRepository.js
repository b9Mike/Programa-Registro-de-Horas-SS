//Repository de sesion de asesorias
import { SessionMapper } from "../mappers/advisorySessionMapper.js";
import { AdvisorySession } from "../models/AdvisorySession.js";
import { Op } from "sequelize";
import { LearningUnit } from "../models/LearningUnit.js";
import { Advisor } from "../models/Advisor.js";
import { Advisee  } from "../models/Advisee.js";


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
    getAllAdvisorySessions: async (startDate, endDate) => {
        const whereClause = {};

        //Si existe un rango de fecha se aplicara en la busqueda
        //Si no existe un rango se regresan todas las asesorias
        if (startDate || endDate) {
            whereClause.SessionDate = {};
            if (startDate) {
                whereClause.SessionDate[Op.gte] = startDate;
            }
            if (endDate) {
                whereClause.SessionDate[Op.lt] = endDate;
            }
        }

        try {
            //Contador de todas las asesorias en el rango
            const totalSessions = await AdvisorySession.count({
                where: whereClause,
            });

            //Contador de todas las asesorias del turno matutino en el rango
            const morningCount = await AdvisorySession.count({
                where: {
                    [Op.and]: [
                        whereClause,
                        {
                            StartTime: {
                                [Op.and]: [
                                    { [Op.gte]: '08:00:00' }, // Hora de inicio mayor o igual a 8 AM
                                    { [Op.lt]: '12:00:00' }   // Hora de inicio menor a 12 PM
                                ]
                            }
                        }
                    ]
                }
            });
            
            //Contador de todas las asesorias del turno intermedio en el rango
            const afternoonCount = await AdvisorySession.count({
                where: {
                    [Op.and]: [
                        whereClause,
                        {
                            StartTime: {
                                [Op.and]: [
                                    { [Op.gte]: '12:00:00' }, // Hora de inicio mayor o igual a 12 PM
                                    { [Op.lt]: '16:00:00' }   // Hora de inicio menor a 4 PM
                                ]
                            }
                        }
                    ]
                }
            });
            
            //Contador de todas las asesorias del turno vespertino en el rango
            const eveningCount = await AdvisorySession.count({
                where: {
                    [Op.and]: [
                        whereClause,
                        {
                            StartTime: {
                                [Op.and]: [
                                    { [Op.gte]: '16:00:00' }, // Hora de inicio mayor o igual a 4 PM
                                    { [Op.lt]: '20:00:00' }   // Hora de inicio menor a 8 PM
                                ]
                            }
                        }
                    ]
                }
            });

            //Lista con todas las asesorias en el rango
            const sessions = await AdvisorySession.findAll({
                attributes: ['Identity', 'Topic', 'Professor', 'ClassType' , 'Active'],
                include: [{
                    model: LearningUnit,
                    as: 'learningUnit',
                    attributes: ['Identity', 'Name'],
                },
                {
                    model: Advisor,
                    as: 'advisor',
                    attributes: ['Enrollment', 'Name'],
                },
                {
                    model: Advisee,
                    as: 'advisee',
                    attributes: ['Enrollment', 'Name'],
                }],
                where: whereClause,
            });

            return {totalSessions, morningCount, afternoonCount, eveningCount, sessions};
        } catch (error) {
            throw new Error('Error al obtener las sesiones de asesoría: ' + error.message);
        }
    },

    // Obtener una sesión de asesoría por ID
    getAdvisorySessionById: async (sessionId) => {
        try {
            const session = await AdvisorySession.findOne({
                attributes: ['Identity', 'Topic', 'Professor', 'ClassType' , 'Active'],
                include: [{
                    model: LearningUnit,
                    as: 'learningUnit',
                    attributes: ['Identity', 'Name'],
                },
                {
                    model: Advisor,
                    as: 'advisor',
                    attributes: ['Enrollment', 'Name'],
                },
                {
                    model: Advisee,
                    as: 'advisee',
                    attributes: ['Enrollment', 'Name'],
                }],
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
            // Actualiza la sesión de asesoría
            const [rowsUpdated] = await AdvisorySession.update(sessionData, {
                where: { Identity: sessionId }
            });

            // Verifica si alguna fila fue actualizada
            if (rowsUpdated === 0) {
                throw new Error('No se encontró la sesión de asesoría con el ID proporcionado o no hubo cambios');
            }

            // Consulta la sesión actualizada
            const updatedSession = await AdvisorySession.findOne({ where: { Identity: sessionId } });

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
            
            const sessionResponseDTO = SessionMapper.toResponseDTO(advisorySession);

            return {
                message: newStatus ? 'Sesión de asesoría activada exitosamente' : 'Sesión de asesoría desactivada exitosamente',
                sessionResponseDTO,
            };
        } catch (error) {
            throw new Error('Error al actualizar el estado de la sesión de asesoría: ' + error.message);
        }
    },

    getAdvisorySessionsByAdvisor: async (enrollment) => {
        try {
            // Consulta para obtener las sesiones de asesoría del asesor con su enrollment
            const advisories = await AdvisorySession.findAll({
                attributes: ['Identity', 'Topic', 'Professor', 'ClassType' , 'Active'],
                include: [{
                    model: LearningUnit,
                    as: 'learningUnit',
                    attributes: ['Identity', 'Name'],
                },
                {
                    model: Advisor,
                    as: 'advisor',
                    attributes: ['Enrollment', 'Name'],
                },
                {
                    model: Advisee,
                    as: 'advisee',
                    attributes: ['Enrollment', 'Name'],
                }],
                where: { AdvisorIdentity: enrollment },
            });

            return advisories;
        } catch (error) {
            throw new Error('Error al obtener las asesorías: ' + error.message);
        }
    },

    //reporte por carera mediante id de materia
    getAdvisorySessionsByDegreeUsingUnit: async (identity) => {
        try {
            const advisories = await AdvisorySession.findAll({
                attributes: ['Identity', 'Topic', 'Professor', 'ClassType' , 'Active'],
                include: [{
                    model: LearningUnit,  // Relación con LearningUnit
                    as: 'learningUnit',
                    where: { DegreeIdentity: identity },  // Filtrar por el ID de la carrera (DegreeIdentity)
                    attributes: ['Name'],  // Campos de LearningUnit
                },
                {
                    model: Advisor,
                    as: 'advisor',
                    attributes: ['Enrollment', 'Name'],
                },
                {
                    model: Advisee,
                    as: 'advisee',
                    attributes: ['Enrollment', 'Name'],
                }]
            });
    
            return advisories;
        } catch (error) {
            throw new Error('Error al obtener las asesorías: ' + error.message);
        }
    }
    
};

//Repository de Asesores
import { Advisor } from "../models/Advisor.js";

//Funciones para interactuar con la tabla de Asesores
export const advisorRepository = {
  
    // Crear un nuevo asesor
    createAdvisor: async (advisorData) => {
        try {
            const newAdvisor = await Advisor.create(advisorData);
            return newAdvisor;
        } catch (error) {
            throw new Error('Error al crear el asesor: ' + error.message);
        }
    },

    // Obtener todos los asesores
    getAllAdvisors: async () => {
        try {
            const advisors = await Advisor.findAll();
            return advisors;
        } catch (error) {
            throw new Error('Error al obtener los asesores: ' + error.message);
        }
    },

    // Obtener un asesor por matrícula
    getAdvisorByEnrollment: async (enrollment) => {
        try {
            const advisor = await Advisor.findOne({
                where: { Enrollment: enrollment }
            });
            return advisor;
        } catch (error) {
            throw new Error('Error al obtener el asesor: ' + error.message);
        }
    },

    // Actualizar un asesor
    updateAdvisor: async (enrollment, advisorData) => {
        try {
            const updatedAdvisor = await Advisor.update(advisorData, {
                where: { Enrollment: enrollment }
            });
            return updatedAdvisor;
        } catch (error) {
            throw new Error('Error al actualizar el asesor: ' + error.message);
        }
    },

    // Eliminar un asesor
    deleteAdvisor: async (enrollment) => {
        try {
            const deletedAdvisor = await Advisor.destroy({
                where: { Enrollment: enrollment }
            });
            return deletedAdvisor;
        } catch (error) {
            throw new Error('Error al eliminar el asesor: ' + error.message);
        }
    }
};

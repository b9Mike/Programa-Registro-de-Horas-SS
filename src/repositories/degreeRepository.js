// Repository de la carrera
import { Degree } from "../models/Degrees.js";

//funciones para interactuar con la tabla carreras
export const degreeRepository = {

    // Obtener todas las carreras (degrees)
    getAllDegrees: async () => {
        try {
            const degrees = await Degree.findAll();
            return degrees;
        } catch (error) {
            throw new Error('Error al obtener las carreras: ' + error.message);
        }
    },

    // Obtener una carrera por su ID (Identity)
    getDegreeById: async (id) => {
        try {
            const degree = await Degree.findOne({
                where: { Identity: id }
            });
            return degree;
        } catch (error) {
            throw new Error('Error al obtener la carrera: ' + error.message);
        }
    },

    // Crear una nueva carrera
    createDegree: async (degreeData) => {
        try {
            const newDegree = await Degree.create(degreeData);
            return newDegree;
        } catch (error) {
            throw new Error('Error al crear la carrera: ' + error.message);
        }
    },

    // Actualizar una carrera existente
    updateDegree: async (id, updatedData) => {
        try {
            const [updated] = await Degree.update(updatedData, {
                where: { Identity: id }
            });

            if (updated) {
                const updatedDegree = await Degree.findOne({ where: { Identity: id } });
                return updatedDegree;
            }
            throw new Error('Carrera no encontrada');
        } catch (error) {
            throw new Error('Error al actualizar la carrera: ' + error.message);
        }
    },

    // Desactivar una carrera (marcarla como inactiva)
    deactivateDegree: async (id) => {
        try {
            const updated = await Degree.update(
                { Active: false }, // Desactivamos la carrera
                { where: { Identity: id } }
            );
            return updated;
        } catch (error) {
            throw new Error('Error al desactivar la carrera: ' + error.message);
        }
    }
};
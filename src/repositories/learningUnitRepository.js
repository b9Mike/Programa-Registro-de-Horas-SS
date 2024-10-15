//Repository de unidad de aprendizaje
import { LearningUnit } from "../models/LearningUnit.js";

//Funciones para interactuar con la tabla de unidad de aprendizaje
export const learningUnitRepository = {

    // Obtener todas las materias (LearningUnits)
    getAllLearningUnits: async () => {
        try {
            const learningUnits = await LearningUnit.findAll();
            return learningUnits;
        } catch (error) {
            throw new Error('Error al obtener las materias: ' + error.message);
        }
    },

    // Obtener una materia por su ID (Identity)
    getLearningUnitById: async (id) => {
        try {
            const learningUnit = await LearningUnit.findOne({
                where: { Identity: id }
            });
            return learningUnit;
        } catch (error) {
            throw new Error('Error al obtener la materia: ' + error.message);
        }
    },

    // Crear una nueva materia
    createLearningUnit: async (learningUnitData) => {
        try {
            const newLearningUnit = await LearningUnit.create(learningUnitData);
            return newLearningUnit;
        } catch (error) {
            throw new Error('Error al crear la materia: ' + error.message);
        }
    },

    // Actualizar una materia existente
    updateLearningUnit: async (id, updatedData) => {
        try {
            const [updated] = await LearningUnit.update(updatedData, {
                where: { Identity: id }
            });

            if (updated) {
                const updatedLearningUnit = await LearningUnit.findOne({ where: { Identity: id } });
                return updatedLearningUnit;
            }
            throw new Error('Materia no encontrada');
        } catch (error) {
            throw new Error('Error al actualizar la materia: ' + error.message);
        }
    },

    // Activar o desactivar Unidad de aprendizaje
    toggleLearningUnitActivation: async (identity) => {
        try {
            const learningUnit = await LearningUnit.findOne({ where: { Identity: identity } });
            if (!learningUnit) {
                throw new Error('La materia no existe');
            }
    
            const newStatus = !learningUnit.Active;
    
            await learningUnit.update({
                Active: newStatus,
                UpdateAt: new Date(),
            });
    
            return {
                message: newStatus ? 'Materia activada exitosamente' : 'Materia desactivada exitosamente',
                learningUnit,
            };
        } catch (error) {
            throw new Error('Error al actualizar el estado de la materia: ' + error.message);
        }
    }
};
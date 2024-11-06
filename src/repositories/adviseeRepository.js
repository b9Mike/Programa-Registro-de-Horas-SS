//Repository de asesorado
import { StudentMapper } from "../mappers/studentMapper.js";
import { Advisee } from "../models/Advisee.js";
import { Degree } from "../models/Degrees.js";

//Funciones para interactuar con la tabla de asesorado
export const adviseeRepository = {
  
    // Crear un nuevo asesorado
    createAdvisee: async (adviseeData) => {
        try {
            const newAdvisee = await Advisee.create(adviseeData);
            return newAdvisee;
        } catch (error) {
            throw new Error('Error al crear el asesorado: ' + error.message);
        }
    },

    // Obtener todos los asesorados
    getAllAdvisees: async () => {
        try {
            const advisees = await Advisee.findAll({
                attributes:['Enrollment', 'Gender', 'Name', 'Active'],
                include: [{
                    model: Degree,
                    as: 'degree',
                    attributes: ['Identity', 'ShortName'],
                }]
            });
            return advisees;
        } catch (error) {
            throw new Error('Error al obtener los asesorados: ' + error.message);
        }
    },

    // Obtener un asesorado por matrícula
    getAdviseeByEnrollment: async (enrollment) => {
        try {
            const advisee = await Advisee.findOne({
                attributes:['Enrollment', 'Gender', 'Name', 'Active'],
                include: [{
                    model: Degree,
                    as: 'degree',
                    attributes: ['Identity', 'ShortName'],
                }],
                where: { Enrollment: enrollment }
            });
            return advisee;
        } catch (error) {
            throw new Error('Error al obtener el asesorado: ' + error.message);
        }
    },

    // Actualizar un asesorado
    updateAdvisee: async (enrollment, adviseeData) => {
        try {

            const [updatedRowsCount] = await Advisee.update(adviseeData, {
                where: { Enrollment: enrollment }
            });
    
            if (updatedRowsCount === 0) {
                throw new Error('No se encontró ningún asesor con esa matrícula.');
            }
    
            const updatedAdvisee = await Advisee.findOne({ where: { Enrollment: enrollment } });
            
            return updatedAdvisee;
        } catch (error) {
            throw new Error('Error al actualizar el asesorado: ' + error.message);
        }
    },

    // Activar o desactivar un asesorado
    toggleAdviseeActivation: async (enrollment) => {
        try {
            const advisee = await Advisee.findOne({ where: { Enrollment: enrollment } });
            if (!advisee) {
                throw new Error('El asesorado no existe');
            }
    
            const newStatus = !advisee.Active;
    
            await advisee.update({
                Active: newStatus,
                UpdateAt: new Date(),
            });

            //Regresar el asesorado con el DTO de respuesta
            const adviseeResponseDTO = StudentMapper.toResponseDTO(advisee);
    
            return {
                message: newStatus ? 'Asesorado activado exitosamente' : 'Asesorado desactivado exitosamente',
                adviseeResponseDTO,
            };
        } catch (error) {
            throw new Error('Error al actualizar el estado del asesorado: ' + error.message);
        }
    }
};

// Repository de la carrera
import { DegreeMapper } from "../mappers/degreeMapper.js";
import { Degree } from "../models/Degrees.js";

//funciones para interactuar con la tabla carreras
export const degreeRepository = {

    // Obtener todas las carreras (degrees)
    getAllDegrees: async () => {
        try {
            const degrees = await Degree.findAll({
                attributes: ['Identity', 'DegreeName', 'ShortName', 'Active'],
            });
            return degrees;
        } catch (error) {
            throw new Error('Error al obtener las carreras: ' + error.message);
        }
    },

    // Obtener una carrera por su ID (Identity)
    getDegreeById: async (id) => {
        try {
            const degree = await Degree.findOne({
                attributes: ['Identity', 'DegreeName', 'ShortName', 'Active'],
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

    // Activar o desactivar una carrera
    toggleDegreeActivation: async (identity) => {
        try {
            const degree = await Degree.findOne({ where: { Identity: identity } });
            if (!degree) {
                throw new Error('La carrera no existe');
            }
    
            const newStatus = !degree.Active;
    
            await degree.update({
                Active: newStatus,
                UpdateAt: new Date(),
            });
            
            const degreeResponseDTO = DegreeMapper.toResponseDTO(degree);

            return {
                message: newStatus ? 'Carrera activada exitosamente' : 'Carrera desactivada exitosamente',
                degreeResponseDTO,
            };
        } catch (error) {
            throw new Error('Error al actualizar el estado de la carrera: ' + error.message);
        }
    },

    //Conseguir el Id de la carrera buscando con su abreviatura
    getDegreeIdByShortName: async (shortName) =>{
        try {
            const degree = await Degree.findOne({
                attributes: ['Identity', 'DegreeName', 'ShortName', 'Active'],
                where: { ShortName: shortName }
            });
            return degree.Identity;
        } catch (error) {
            throw new Error('Error al obtener la carrera: ' + error.message);
        }
    },

    //Conseguir la abreviatura de la carrera buscando con su id
    getDegreeShortNameById: async (identity) =>{
        try {
            const degree = await Degree.findOne({
                attributes: ['Identity', 'DegreeName', 'ShortName', 'Active'],
                where: { Identity: identity }
            });
            return degree.ShortName;
        } catch (error) {
            throw new Error('Error al obtener la carrera: ' + error.message);
        }
    }


};
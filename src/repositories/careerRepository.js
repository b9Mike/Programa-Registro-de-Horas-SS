import { Career } from "../models/Career.js";

//funciones para interactuar con la tabla carreras
export const CareerRepository = {
    //Obtener todas las carreras
    findAll: async () => {
        return await Career.findAll();
    },

    // Crear una nueva carrera
    create: async (career_name) => {
        return await Career.create({ career_name });
    },

    // Buscar una carrera por ID
    findById: async (id) => {
        return await Career.findByPk(id);
    },

    // Actualizar una carrera
    update: async (id, career_name) => {
        const career = await Career.findByPk(id);
        if (career) {
            career.career_name = career_name;
            await career.save();
            return career;
        }
        return null;
    },

    // Eliminar una carrera
    delete: async (id) => {
        const career = await Career.findByPk(id);
        if (career) {
            await career.destroy();
            return true;
        }
        return false;
    }

}
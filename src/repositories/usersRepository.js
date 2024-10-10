import { User } from "../models/User.js";

//funciones para interactuar con la tabla usuarios
export const CareerRepository = {
    // Obtener todos los usuarios
    findAll: async () => {
        return await User.findAll();
    },

    // Buscar un usuario por su ID
    findById: async (id) => {
        return await User.findByPk(id);
    },

    // Crear un nuevo usuario
    create: async (name_user, password, type) => {
        return await User.create({ name_user, password, type });
    },

    // Actualizar un usuario
    update: async (id, data) => {
        const user = await User.findByPk(id);
        if (user) {
            user.name_user = data.name_user || user.name_user;
            user.password = data.password || user.password;
            user.type = data.type || user.type;
            await user.save();
            return user;
        }
        return null;
    },

    // Eliminar un usuario
    delete: async (id) => {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            return true;
        }
        return false;
    }
};
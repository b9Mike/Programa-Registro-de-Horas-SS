import { User } from "../models/User.js";

//funciones para interactuar con la tabla usuarios
export const userRepository = {
    
    // Obtener todos los usuarios
    getAllUsers: async () => {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw new Error('Error al obtener usuarios: ' + error.message);
        }
    },

    // Obtener un usuario por su matrícula (enrollment)
    getUserByEnrollment: async (enrollment) => {
        try {
            const user = await User.findOne({
                where: { Enrollment: enrollment }
            });
            return user;
        } catch (error) {
            throw new Error('Error al obtener usuario por matrícula: ' + error.message);
        }
    },

    // Crear un nuevo usuario
    createUser: async (userData) => {
        try {
            const newUser = await User.create(userData);
            return newUser;
        } catch (error) {
            throw new Error('Error al crear usuario: ' + error.message);
        }
    },

    // Actualizar un usuario existente
    updateUser: async (enrollment, updatedData) => {
        try {
            const [updated] = await User.update(updatedData, {
                where: { Enrollment: enrollment }
            });

            if (updated) {
                const updatedUser = await User.findOne({ where: { Enrollment: enrollment } });
                return updatedUser;
            }
            throw new Error('Usuario no encontrado');
        } catch (error) {
            throw new Error('Error al actualizar usuario: ' + error.message);
        }
    },

    // Eliminar (desactivar) un usuario por matrícula
    deactivateUser: async (enrollment) => {
        try {
            const updated = await User.update(
                { Active: false }, // Cambiamos el estado de activo a falso
                { where: { Enrollment: enrollment } }
            );
            return updated;
        } catch (error) {
            throw new Error('Error al desactivar usuario: ' + error.message);
        }
    }
};
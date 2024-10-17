import { User } from "../models/User.js";
//import bcrypt from 'bcrypt';  // Para comparar la contraseña encriptada

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

    // Funcion de login
    getUserByEnrollment: async (enrollment) => {
        try {
            // Buscamos al usuario por la matrícula y la contraseña
            const user = await User.findOne({
                where: {
                    Enrollment: enrollment,
                },
            });
    
            if (!user) {
                throw new Error('Matrícula o contraseña incorrecta');
            }
    
            return user;
        } catch (error) {
            throw new Error('Error al buscar el usuario: ' + error.message);
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

    // Activar o desactivar usuario
    toggleUserActivation: async (enrollment) => {
        try {
            // Buscar el usuario por matrícula (enrollment)
            const user = await User.findOne({
                where: { Enrollment: enrollment }
            });
    
            // Si el usuario no existe, devolver un error
            if (!user) {
                throw new Error('La matrícula no existe');
            }
    
            // Alternar el estado de activación del usuario
            const newStatus = !user.Active;
    
            // Actualizar el estado de activación
            await user.update({
                Active: newStatus,
                UpdateAt: new Date() // Actualizar el campo UpdateAt con la fecha actual
            });
    
            // Devolver un mensaje indicando el nuevo estado del usuario
            return {
                message: newStatus ? 'Usuario activado exitosamente' : 'Usuario desactivado exitosamente',
                user
            };
            
        } catch (error) {
            throw new Error('Error al actualizar el estado del usuario: ' + error.message);
        }
    }
};
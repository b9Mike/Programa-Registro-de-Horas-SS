'use strict';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const seedDemoUsers = {
    up: async (queryInterface, Sequelize) => {
        try {
            const hashedPassword1 = await bcrypt.hash(process.env.USER1_PASS, 10);
            const hashedPassword2 = await bcrypt.hash(process.env.USER2_PASS, 10);
            const hashedPassword3 = await bcrypt.hash(process.env.USER3_PASS, 10);

            await queryInterface.bulkInsert('Users', [
                { Enrollment: 159734, Name: "Coordinacion", Password: hashedPassword1, Type: 1, UserCreation: 159734, CreatedAt: new Date(), UserUpdate: 159734, UpdatedAt: new Date, Active: true},
                { Enrollment: 472158, Name: "Recepcion1", Password: hashedPassword2, Type: 2, UserCreation: 159734, CreatedAt: new Date(), UserUpdate: 159734, UpdatedAt: new Date, Active: true},
                { Enrollment: 836294, Name: "Recepcion2", Password: hashedPassword3, Type: 2, UserCreation: 159734, CreatedAt: new Date(), UserUpdate: 159734, UpdatedAt: new Date, Active: true}
            ]);
        } catch (error) {
            console.error('Error al insertar usuarios:', error);
            throw error; // Lanzar el error para manejo adicional si es necesario
        }
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.truncate('Users'); // Eliminar todos los registros
    },
};
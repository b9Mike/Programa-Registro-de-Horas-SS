'use strict';

export const seedDemoDegrees = {
    up: async (queryInterface, Sequelize) => {
        try {

            await queryInterface.bulkInsert('Degrees', [
                { DegreeName: "Matematicas", ShortName: "LM", UserCreation: 159734, CreatedAt: new Date(), UserUpdate: 159734, UpdateAt: new Date(), Active: true },
                { DegreeName: "Fisica", ShortName: "LF", UserCreation: 159734, CreatedAt: new Date(), UserUpdate: 159734, UpdateAt: new Date(), Active: true },
                { DegreeName: "Ciencias Computacionales", ShortName: "LCC", UserCreation: 159734, CreatedAt: new Date(), UserUpdate: 159734, UpdateAt: new Date(), Active: true },
                { DegreeName: "Actuaria", ShortName: "LA", UserCreation: 159734, CreatedAt: new Date(), UserUpdate: 159734, UpdateAt: new Date(), Active: true },
                { DegreeName: "Multimedia y Animacion Digital", ShortName: "LMAD", UserCreation: 159734, CreatedAt: new Date(), UserUpdate: 159734, UpdateAt: new Date(), Active: true },
                { DegreeName: "Seguridad en Tecnologias de Informacion", ShortName: "LSTI", UserCreation: 159734, CreatedAt: new Date(), UserUpdate: 159734, UpdateAt: new Date(), Active: true }

            ]);
        } catch (error) {
            console.error('Error al insertar carreras:', error);
            throw error;
        }
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.truncate('Degrees'); // Eliminar todos los registros
    },
};
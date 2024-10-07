import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    'db_sistema_asesorias', 
    'postgres', 
    'password', 
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);
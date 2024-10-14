import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

//Usuarios
export const User = sequelize.define('Users', {
    //Matricula
    Enrollment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    Name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    UserCreation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    UserUpdate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    UpdatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},
{
    tableName: 'Users',
    timestamps: false,
});
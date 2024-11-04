import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

//Carreras
export const Degree = sequelize.define('Degrees', {
    Identity: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    DegreeName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    ShortName: {
        type: DataTypes.STRING(255),
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
    UpdateAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},
{
    tableName: 'Degrees',
    timestamps: false,
});
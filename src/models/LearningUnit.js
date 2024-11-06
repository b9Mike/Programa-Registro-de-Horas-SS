import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Degree } from "./Degrees.js";

//Materias
export const LearningUnit = sequelize.define('LearningUnits', {
    Identity: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    //Id de la carrera
    DegreeIdentity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Degree,
            key: 'Identity',
        },
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
    tableName: 'LearningUnits',
    timestamps: false,
});

LearningUnit.associate = (models) => {
    LearningUnit.belongsTo(models.Degree, {
        foreignKey: 'DegreeIdentity',
        targetKey: 'Identity',
        as: 'degree',
    });
};
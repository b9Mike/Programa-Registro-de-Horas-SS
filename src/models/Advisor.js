import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Degree } from "./Degrees.js";

//Asesores
export const Advisor = sequelize.define('Advisors', {
    //Matricula
    Enrollment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    Gender: {
        type: DataTypes.STRING(50),
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
    tableName: 'Advisors',
    timestamps: false,
});

Advisor.associate = (models) => {
    Advisor.belongsTo(models.Degree, {
        foreignKey: 'DegreeIdentity',
        tagetKey: 'Identity',
    });
};
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Degree } from "./Degrees";

//Asesorados
export const Advisee = sequelize.define('Advisees', {
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
    tableName: 'Advisees',
    timestamps: false,
});

Advisee.associate = (models) => {
    Advisee.belongsTo(models.Degree, {
        foreignKey: 'DegreeIdentity',
        tagetKey: 'Identity',
    });
};
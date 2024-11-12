import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database/database.js";
import { Advisor } from "./Advisor.js";

export const EntryExitRecord = sequelize.define('EntryExitRecord', {
    Identity: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // SERIAL en SQL es equivalente a autoIncrement en Sequelize
    },
    AdvisorIdentity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Advisor,
            key: 'Enrollment', // Relación con la clave primaria de Advisors
        },
    },
    EntryTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    ExitTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },    
    CurrentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    UserCreation: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    UserUpdate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    UpdatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    Active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: 'EntryExitRecord',
    timestamps: false, 
});

// Relacion con el modelo Advisor
EntryExitRecord.associate = (models) => {
    EntryExitRecord.belongsTo(models.Advisor, {
        foreignKey: 'AdvisorIdentity',
        targetKey: 'Enrollment',
        as: 'advisor'
    });
};

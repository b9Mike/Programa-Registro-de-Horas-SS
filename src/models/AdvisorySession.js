import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { LearningUnit } from "./LearningUnit.js";
import { Advisor } from "./Advisor.js";
import { Advisee } from "./Advisee.js";

//Asesorias
export const AdvisorySession = sequelize.define('AdvisorySessions', {
    Identity: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    //Id de la materia
    LearningUnitIdentity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: LearningUnit,
            key: 'Identity',
        },
    },
    Topic: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Professor: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    ClassType: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    //Matricula del asesor
    AdvisorIdentity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: Advisor,
            key: 'Enrollment',
        },
    },
    //Matricula del asesorado
    AdviseeIdentity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Advisee,
            key: 'Enrollment',
        },
    },
    SessionDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    StartTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    EndTime: {
        type: DataTypes.DATE,
        allowNull: true,
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
    tableName: 'AdvisorySessions',
    timestamps: false,
});

AdvisorySession.associate = (models) => {
    AdvisorySession.belongsTo(models.LearningUnit, {
        foreignKey: 'LearningUnitIdentity',
        targetKey: 'Identity',
    });
    AdvisorySession.belongsTo(models.Advisor, {
        foreignKey: 'AdvisorIdentity',
        targetKey: 'Enrollment',
    });
    AdvisorySession.belongsTo(models.Advisee, {
        foreignKey: 'AdviseeIdentity',
        targetKey: 'Enrollment',
    });
};
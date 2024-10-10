import { DataTypes } from "sequelize";
import { sequelize } from "../repositories/database.js";

export const Career = sequelize.define('Careers', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    career_name:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})
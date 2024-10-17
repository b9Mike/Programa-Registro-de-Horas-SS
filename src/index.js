// arrancar servidor
import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import {sequelize} from './database/database.js';

import {} from './models/Advisee.js';
import {} from './models/Advisor.js';
import {} from './models/AdvisorySession.js';
import { Degree } from './models/Degrees.js';
import {} from './models/LearningUnit.js';
import { User } from './models/User.js';
import {seedDemoUsers} from './seeders/users.seeder.js';
import {seedDemoDegrees} from './seeders/degrees.seeder.js';


const PORT = process.env.DB_PORT || 3000;

async function runSeeders() {
  try {
    const users = await User.findAll();
    if(users.length === 0){
      await seedDemoUsers.up(sequelize.getQueryInterface(), sequelize.constructor);
      console.log('User-Seeders executed successfully.');
    }
    const degrees = await Degree.findAll();
    if(degrees.length === 0){
      await seedDemoDegrees.up(sequelize.getQueryInterface(), sequelize.constructor);
      console.log('Degree-Seeders executed successfully.');
    }
  } catch (error) {
    console.error('Error running seeders:', error);
  }
}

async function main () {
    try {
        await sequelize.sync();
        await runSeeders();
        app.listen(PORT);
        console.log(`Server is listening on port: ${PORT}...`);
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

main();
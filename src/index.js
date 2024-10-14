// arrancar servidor
import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import {sequelize} from './database/database.js';

import {} from './models/Advisee.js';
import {} from './models/Advisor.js';
import {} from './models/AdvisorySession.js';
import {} from './models/Degrees.js';
import {} from './models/LearningUnit.js';
import {} from './models/User.js';

const PORT = process.env.DB_PORT || 3000;

async function main () {
    try {
        //await sequelize.sync();
        app.listen(PORT)
        console.log(`Server is listening on port: ${PORT}...`);
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

main();
// arrancar servidor
import app from './app.js';
import {sequelize} from './repositories/database.js';

const PORT = 4000;

async function main () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        app.listen(PORT)
        console.log(`Server is listening on port: ${PORT}...`);
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

main();
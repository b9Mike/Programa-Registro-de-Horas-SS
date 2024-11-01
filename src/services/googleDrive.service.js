import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obtener __filename y __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

//pa que jale bien el dir name lo definimos como arriba

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../config/departamento-asesorias-02a726e2e629.json'), // Las credenciales las pondremos en la carpeta raiz config
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

export const uploadFile = async (filePath, fileName) => {
    const folderId = '1PheHop9DIOg5AjuKF47Zu0ymbKNG1wc4'; // Es el ID de la carpeta en drive la cual es "Reportes"

    try {
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // MIME type para .xlsx
                parents: [folderId], // Aqui pusimos el id de la carpeta para que se guarde justo ahí
            },
            media: {
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // MIME type para .xlsx 
                body: fs.createReadStream(filePath),
            },
        });

        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error al subir el archivo a Google Drive:', error);
        throw new Error('No se pudo subir el archivo a Google Drive');
    }
};


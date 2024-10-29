import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../../config/google-service-account.json'), // Las credenciales las pondremos en la carpeta raiz config
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

export const uploadFile = async (filePath, fileName) => {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // MIME type para .xlsx excel
            },
            media: {
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // MIME type para .xlsx excel 
                body: fs.createReadStream(filePath),
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al subir el archivo a Google Drive:', error);
        throw new Error('No se pudo subir el archivo a Google Drive');
    }
};

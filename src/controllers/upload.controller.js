import { uploadFile } from '../services/googleDrive.service.js';

export const uploadDocumentToDrive = async (req, res) => {
    const { filePath, fileName } = req.body; // Supongamos que recibes estos datos en el cuerpo de la petición

    try {
        const fileData = await uploadFile(filePath, fileName);
        res.status(200).json({ message: 'Archivo subido con éxito', fileData });
    } catch (error) {
        res.status(500).json({ message: 'Error al subir el archivo', error: error.message });
    }
};

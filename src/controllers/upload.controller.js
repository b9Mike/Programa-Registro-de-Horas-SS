import { uploadFile } from '../services/googleDrive.service.js';

export const uploadDocumentToDrive = async (req, res) => {
  const { filePath, fileName } = req.body; // Recibimos el la ruta del excel y el nuevo nombre que tendra en el drive

  if (!filePath || !fileName) {
    console.log(filePath);
    return res.status(400).json({ message: 'filePath y fileName son obligatorios' });
  }

  try {
    const fileData = await uploadFile(filePath, fileName); // se lo mandamos a servies de google drive api
    res.status(200).json({ message: 'Archivo subido con éxito', fileData });
  } catch (error) {
    res.status(500).json({ message: 'Error al subir el archivo', error: error.message });
  }
};

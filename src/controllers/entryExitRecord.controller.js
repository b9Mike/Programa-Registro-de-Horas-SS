import { entryExitRecordRepository } from '../repositories/entryExitRecordRepository.js';

// Obtener todos los registros de entrada y salida
export const getEntryExitRecords = async (req, res) => {
  try {
    const records = await entryExitRecordRepository.getAllEntryExitRecords();
    res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un registro de entrada y salida por su ID
export const getEntryExitRecordById = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'Faltan campos requeridos.' });

  try {
    const record = await entryExitRecordRepository.getEntryExitRecordById(id);
    if (!record) return res.status(404).json({ message: 'Registro no encontrado.' });
    res.status(200).json(record);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo registro de entrada y salida
export const createEntryExitRecord = async (req, res) => {
  try {
    const newRecord = await entryExitRecordRepository.createEntryExitRecord(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un registro de entrada y salida
export const updateEntryExitRecord = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'Faltan campos requeridos.' });

  try {
    const updatedRecord = await entryExitRecordRepository.updateEntryExitRecord(id, req.body);
    if (!updatedRecord) return res.status(404).json({ message: 'Registro no encontrado.' });
    res.status(200).json(updatedRecord);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Cambiar estado de un registro de entrada y salida (activar/desactivar)
export const toggleEntryExitRecordActivation = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'Faltan campos requeridos.' });

  try {
    const result = await entryExitRecordRepository.toggleEntryExitRecordActivation(id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import { EntryExitRecordMapper } from '../mappers/entryExitRecordMapper.js';
import { entryExitRecordRepository } from '../repositories/entryExitRecordRepository.js';

// Obtener todos los registros de entrada y salida
export const getAllEntryExitRecords = async (req, res) => {
    try {
        const records = await entryExitRecordRepository.getAllEntryExitRecords();
        return res.status(200).json(records);
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
        return res.status(200).json(record);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo registro de entrada y salida
export const createEntryExitRecord = async (req, res) => {
    if (!req.user || !req.user.Active) {
        return res.status(403).json({ message: 'No autorizado.' });
    }

    try {
        // Validación de campos requeridos
        const { AdvisorIdentity, EntryTime, ExitTime, CurrentDate } = req.body;
        if (!AdvisorIdentity || !EntryTime || !ExitTime || !CurrentDate) {
            return res.status(400).json({ message: 'Faltan campos requeridos en el cuerpo de la solicitud.' });
        }

        const entryExitRecordCreateDTO = EntryExitRecordMapper.toCreateDTO(req.body, req.user.id);
        const newRecord = await entryExitRecordRepository.createEntryExitRecord(entryExitRecordCreateDTO);
        const entryExitRecordResponseDTO = EntryExitRecordMapper.toResponseDTO(newRecord);

        return res.status(201).json(entryExitRecordResponseDTO);
    } catch (error) {
        // Manejo de error si el formato del tiempo es inválido
        if (error.message.includes('Formato de hora inválido')) {
            return res.status(400).json({ message: 'El formato de hora es inválido.' });
        }
        return res.status(500).json({ message: error.message });
    }
};

// Actualizar un registro de entrada y salida
export const updateEntryExitRecord = async (req, res) => {
    if (!req.user || !req.user.Active) {
        return res.status(403).json({ message: 'No autorizado.' });
    }

    const { id } = req.params;
    const { EntryTime, ExitTime, CurrentDate } = req.body;

    if (!id || !EntryTime || !ExitTime || !CurrentDate) {
        return res.status(400).json({ message: 'Faltan campos requeridos en el cuerpo de la solicitud.' });
    }

    try {
        const entryExitRecordUpdateDTO = EntryExitRecordMapper.toUpdateDTO(req.params, req.body, req.user.id);
        const updatedRecord = await entryExitRecordRepository.updateEntryExitRecord(entryExitRecordUpdateDTO.id, entryExitRecordUpdateDTO);
        const entryExitRecordResponseDTO = EntryExitRecordMapper.toResponseDTO(updatedRecord);

        return res.status(200).json(entryExitRecordResponseDTO);
    } catch (error) {
        // Manejo de error si el formato del tiempo es inválido
        if (error.message.includes('Formato de hora inválido')) {
            return res.status(400).json({ message: 'El formato de hora es inválido.' });
        }
        return res.status(500).json({ message: error.message });
    }
};

// Cambiar el estado de activación de un registro de entrada y salida
export const toggleEntryExitRecordActivation = async (req, res) => {
    if (!req.user || !req.user.Active) {
        return res.status(403).json({ message: 'No autorizado.' });
    }

    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Faltan campos requeridos.' });

    try {
        const result = await entryExitRecordRepository.toggleEntryExitRecordActivation(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

import { DegreeMapper } from "../mappers/degreeMapper.js";
import { degreeRepository } from "../repositories/degreeRepository.js";

//Obtener carreras
export const getDegrees = async (req, res) => {
    try {
        const degrees = await degreeRepository.getAllDegrees();
        res.status(200).json(degrees);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Obtener carrera por Id
export const getDegreeById = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(400).json({ message: 'Faltan campos requeridos.' });

    try {
        const degree = await degreeRepository.getDegreeById(id);
        res.status(200).json(degree);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Crear Carrera
export const createDegree = async (req, res) => {
    if(req.user.Type != 1 || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    try {
        const degreeCreateDTO = DegreeMapper.toCreateDTO(req.body, req.user.id);
        const degree = await degreeRepository.createDegree(degreeCreateDTO);
        const degreeResponseDTO = DegreeMapper.toResponseDTO(degree);
        res.status(201).json(degreeResponseDTO);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Actualizar Carrera
export const updateDegree = async (req, res) => {
    if(req.user.Type != 1 || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });
    
    try {
        const degreeUpdateDTO = DegreeMapper.toUpdateDTO(req.params, req.body, req.user.id);
        const updatedDegree = await degreeRepository.updateDegree(degreeUpdateDTO.Identity, degreeUpdateDTO);
        const degreeResponseDTO = DegreeMapper.toResponseDTO(updatedDegree);
        return res.status(200).json(degreeResponseDTO);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Cambiar estado de la Carrera
export const toggleDegreeActivation = async (req, res) => {
    if(req.user.Type != 1 || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    const { id } = req.params;

    if (!id)
        return res.status(400).json({ message: 'Faltan campos requeridos.' });

    try {
        const result = await degreeRepository.toggleDegreeActivation(id);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};


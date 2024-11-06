import { LearningUnitMapper } from "../mappers/learningUnitMapper.js";
import { learningUnitRepository } from "../repositories/learningUnitRepository.js";

//Obtener Materias
export const getAllLearningUnits = async (req, res) => {
    try {
        const learningUnits = await learningUnitRepository.getAllLearningUnits();
        res.status(200).json(learningUnits);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Obtener materia por Id
export const getLearningUnitById = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(403).json({ message: "Faltan campos requeridos." });

    try {
        const learningUnit = await learningUnitRepository.getLearningUnitById(id);
        res.status(200).json(learningUnit);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Crear materia
export const createLearningUnit = async (req, res) => {
    if(req.user.Type != 1  || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    try {
        const learningUnitCreateDTO = LearningUnitMapper.toCreateDTO(req.body, req.user.id);
        const learningUnit = await learningUnitRepository.createLearningUnit(learningUnitCreateDTO);
        const learningUnitResponseDTO = LearningUnitMapper.toResponseDTO(learningUnit);
        return res.status(200).json(learningUnitResponseDTO);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Actualizar materia
export const updateLearningUnit = async (req, res) => {
    if(req.user.Type != 1  || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    try {
        const learningUnitUpdateDTO = LearningUnitMapper.toUpdateDTO(req.params, req.body, req.user.id);
        const updatedLearningUnit = await learningUnitRepository.updateLearningUnit(learningUnitUpdateDTO.Identity, learningUnitUpdateDTO);

        const learningUnitResponseDTO = LearningUnitMapper.toResponseDTO(updatedLearningUnit);
        return res.status(200).json(learningUnitResponseDTO);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Cambiar estado de la materia
export const toggleLearningUnitActivation = async (req, res) => {
    if(req.user.Type != 1  || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    const { id } = req.params;

    if (!id)
        return res.status(400).json({ message: "Faltan campos requeridos." });

    try {
        const result = await learningUnitRepository.toggleLearningUnitActivation(
            id
        );
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

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
    const { degreeName, userCreation } = req.body;

    if (!degreeName || !userCreation)
        return res.status(400).json({ message: 'Faltan campos requeridos.' });

    try {
        const degree = await degreeRepository.createDegree({
            DegreeName: degreeName,
            UserCreation: userCreation,
            CreatedAt: new Date(),
            UserUpdate: userCreation,
            UpdateAt: new Date(),
            Active: true
        });

        res.status(201).json(degree);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Actualizar Carrera
export const updateDegree = async (req, res) => {
    const { id } = req.params;
    const { degreeName, userUpdate } = req.body;

    if (!degreeName || !userUpdate || !id)
        return res.status(400).json({ message: 'Faltan campos requeridos.' });

    try {
        const updatedDegree = await degreeRepository.updateDegree(id, {
            DegreeName: degreeName, 
            UserUpdate: userUpdate,
            UpdateAt: new Date() 
        });
        return res.status(200).json(updatedDegree);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Cambiar estado de la Carrera
export const toggleDegreeActivation = async (req, res) => {
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

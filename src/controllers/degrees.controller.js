import { DegreeRepository } from "../repositories/degreeRepository.js";

//Obtener carrera
export const getCareers = async (req, res) => {
    try {
        const degree = await DegreeRepository.findAll();
        res.json(degree);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

//Crear Carrera
export const createCareer = async (req, res) => {
    res.send('creando usuarios');
};

export const updateCareer = (req, res) => {
    res.send('Obteniendo usuarios');
};

export const deleteCareer = (req, res) => {
    res.send('Obteniendo usuarios');
};

export const getByIdCareer = (req, res) => {
    res.send('Obteniendo usuarios');
};

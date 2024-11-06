import { StudentMapper } from '../mappers/studentMapper.js';
import { adviseeRepository } from '../repositories/adviseeRepository.js';

export const getAllAdvisees = async (req, res) => {
    try {
        const advisee = await adviseeRepository.getAllAdvisees();
        return res.status(200).json(advisee);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getAdviseById = async (req, res) => {
    const { enrollment } = req.params;

    if(!enrollment)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const advisee = await adviseeRepository.getAdviseeByEnrollment(enrollment);
        return res.status(200).json(advisee);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const createAdvisee = async (req, res) => {
    if(!(req.user.Type == 1 || req.use.Type == 2) || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    try{
        const adviseeCreateDTO = StudentMapper.toCreateDTO(req.body, req.user.id);
        const advisee = await adviseeRepository.createAdvisee(adviseeCreateDTO);
        const adviseeResponseDTO = StudentMapper.toResponseDTO(advisee);

        return res.status(200).json(adviseeResponseDTO);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const updateAdvisee = async (req, res) => {
    if(!(req.user.Type == 1 || req.use.Type == 2) || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    try{
        const adviseeUpdateDTO = StudentMapper.toUpdateDTO(req.params, req.body, req.user.id);
        const updatedAdvisee = await adviseeRepository.updateAdvisee(adviseeUpdateDTO.Enrollment, adviseeUpdateDTO);
        const adviseeesponseDTO = StudentMapper.toResponseDTO(updatedAdvisee);
        return res.status(200).json(adviseeesponseDTO);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const toggleAdviseeActivation = async (req, res) => {
    if(!(req.user.Type == 1 || req.use.Type == 2) || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    const { enrollment } = req.params;

    if(!enrollment)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const result = await adviseeRepository.toggleAdviseeActivation(enrollment);
        return res.status(200).json(result);
    } catch (error){
        return res.status(500).json({message: error.message});
    }

}
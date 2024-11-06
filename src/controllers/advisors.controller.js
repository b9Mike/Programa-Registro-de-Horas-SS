import { StudentMapper } from '../mappers/studentMapper.js';
import { advisorRepository } from '../repositories/advisorRepository.js';

export const getAllAdvisors = async (req, res) => {
    try {
        const advisors = await advisorRepository.getAllAdvisors();
        return res.status(200).json(advisors);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getAdvisorByEnrollment = async (req, res) => {
    const { enrollment } = req.params;

    if(!enrollment)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const advisor = await advisorRepository.getAdvisorByEnrollment(enrollment);
        return res.status(200).json(advisor);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const createAdvisor = async (req, res) => {
    if(req.user.Type != 1 || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    try{
        const advisorCreateDTO = StudentMapper.toCreateDTO(req.body, req.user.id);
        const advisor = await advisorRepository.createAdvisor(advisorCreateDTO);
        const advisorResponseDTO = StudentMapper.toResponseDTO(advisor);
        return res.status(200).json(advisorResponseDTO);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const updateAdvisor = async (req, res) => {
    if(req.user.Type != 1 || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    try{
        const advisorUpdateDTO = StudentMapper.toUpdateDTO(req.params, req.body, req.user.id);
        const updatedAdvisor = await advisorRepository.updateAdvisor(advisorUpdateDTO.Enrollment, advisorUpdateDTO);
        const advisorResponseDTO = StudentMapper.toResponseDTO(updatedAdvisor);
        return res.status(200).json(advisorResponseDTO);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const toggleAdvisorActivation = async (req, res) => {
    if(req.user.Type != 1 || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    const { enrollment } = req.params;

    if(!enrollment)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const result = await advisorRepository.toggleAdvisorActivation(enrollment);
        return res.status(200).json(result);
    } catch (error){
        return res.status(500).json({message: error.message});
    }

}
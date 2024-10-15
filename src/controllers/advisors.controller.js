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
    const {enrollment, gender, name, degreeIdentity, userCreation } = req.body;
    
    if(!enrollment || !gender || !name || !degreeIdentity || !userCreation)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const advisor = await advisorRepository.createAdvisor({
            Enrollment: enrollment,
            Gender: gender,
            Name: name,
            DegreeIdentity: degreeIdentity,
            UserCreation: userCreation,
            CreatedAt: new Date(),
            UserUpdate: userCreation,
            UpdateAt: new Date(),
            Active: true
        });

        return res.status(200).json(advisor);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const updateAdvisor = async (req, res) => {
    const { enrollment } = req.params;
    const { gender, name, degreeIdentity, userUpdate } = req.body;

    if(!enrollment || !gender || !name || !degreeIdentity || !userUpdate)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const updatedAdvisor = await advisorRepository.updateAdvisor(enrollment,  {
            Gender: gender,
            Name: name, 
            DegreeIdentity: degreeIdentity, 
            UserUpdate: userUpdate, 
            UpdateAt: new Date() 
        });
        return res.status(200).json(updatedAdvisor);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const toggleAdvisorActivation = async (req, res) => {
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
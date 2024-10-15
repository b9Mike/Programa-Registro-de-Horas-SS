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
    const { enrollment, gender, name, degreeIdentity, userCreation } = req.body;
    
    if(!enrollment || !gender || !name || !degreeIdentity || !userCreation)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const advisee = await adviseeRepository.createAdvisee({
            enrollment,
            gender,
            name,
            degreeIdentity,
            userCreation,
            CreatedAt: new Date(),
            UserUpdate: userCreation,
            UpdateAt: new Date(),
            Active: true
        });

        return res.status(200).json(advisee);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const updateAdvisee = async (req, res) => {
    const { enrollment } = req.params;
    const { gender, name, degreeIdentity, userUpdate } = req.body;

    if(!enrollment || !gender || !name || !degreeIdentity || !userUpdate)
        return res.status(400).json({ message: 'Faltan campos requeridos.'});

    try{
        const updatedAdvisee = await adviseeRepository.updateAdvisee(enrollment,  {
            Gender: gender, 
            Name: name, 
            DegreeIdentity: degreeIdentity, 
            UserUpdate: userUpdate, 
            UpdatedAt: new Date() 
        });
        return res.status(200).json(updatedAdvisee);
    } catch (error){
        return res.status(500).json({message: error.message});
    }
}

export const toggleAdviseeActivation = async (req, res) => {
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
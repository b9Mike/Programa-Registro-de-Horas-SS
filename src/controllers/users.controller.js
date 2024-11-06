import { UserMapper } from "../mappers/userMapper.js";
import { userRepository } from "../repositories/usersRepository.js";

import { encryptPassword, comparePassword, generateToken } from "../services/auth.service.js";


//Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    if(req.user.Type != 1 || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    try {
        const users = await userRepository.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//Log In
export const logIn = async (req, res) => {
    try {
        const userLoginDTO = UserMapper.toLoginDTO(req.body);

        const user = await userRepository.getUserByEnrollment(userLoginDTO.Enrollment);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Validar la contraseña
        const isMatch = await comparePassword(userLoginDTO.Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta." });
        }

        // Generar JWT
        const token = generateToken(user.Enrollment);
        res.status(200).header('Authorization', `Bearer ${token}`).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Register
export const register = async (req, res) => {
    try {
        //Convertir el body en un usuario de registroDTO para guardarlo
        const userRegisterDTO = UserMapper.toRegisterDTO(req.body, req.user.id);
        // Encriptar la contraseña
        const hashedPassword = await encryptPassword(userRegisterDTO.Password);
        userRegisterDTO.Password = hashedPassword;
        
        const user = await userRepository.createUser(userRegisterDTO);
        
        //Convertis los usuarios en los DTOs de respuesta para mostrarlos
        const userResponseDTO = UserMapper.toResponseDTO(user);
        res.status(200).json(userResponseDTO);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Actualizar usuario
export const updateUser = async (req, res) => {
    if(req.user.Type != 1 || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });
    
    try {
        const userUpdateDTO = UserMapper.toUpdateDTO(req.params, req.body, req.user.id);
        // Encriptar la nueva contraseña si se actualiza
        const hashedPassword = await encryptPassword(userUpdateDTO.Password);
        userUpdateDTO.Password = hashedPassword;

        const user = await userRepository.updateUser(userUpdateDTO.Enrollment, userUpdateDTO);
        const userResponseDTO = UserMapper.toResponseDTO(user);

        res.status(200).json(userResponseDTO);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Cambiar estado del usuario
export const toggleUserActivation = async (req, res) => {
    if(req.user.Type != 1  || !req.user.Active)
        return res.status(403).json({ message: "No autorizado." });

    const { enrollment } = req.params;

    try {
        const result = await userRepository.toggleUserActivation(enrollment);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

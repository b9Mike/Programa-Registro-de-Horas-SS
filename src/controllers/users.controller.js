import { userRepository } from "../repositories/usersRepository.js";

//Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Obtener usuario por Matricula
export const getUserByEnrollment = async (req, res) => {
    const { enrollment } = req.params;
    if (!enrollment)
        return res.status(400).json({ message: "Faltan campos requeridos." });

    try {
        const user = await userRepository.getUserByEnrollment(enrollment);
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Log In
export const logIn = async (req, res) => {
    const { enrollment, password } = req.body;
    if (!enrollment || !password)
        return res.status(400).json({ message: "Faltan campos requeridos." });

    try {
        const user = await userRepository.getUserByEnrollment(enrollment, password);
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Register
export const register = async (req, res) => {
    const { enrollment, name, password, type, userCreation } = req.body;
    if (!enrollment || !name || !password || !type || !userCreation)
        return res.status(400).json({ message: "Faltan campos requeridos." });

    try {
        const user = await userRepository.createUser({
            enrollment,
            name,
            password,
            type,
            userCreation,
            CreatedAt: new Date(),
            UserUpdate: userCreation,
            UpdatedAt: new Date(),
            Active: true,
        });

        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Actualizar usuario
export const updateUser = async (req, res) => {
    const { enrollment } = req.params;
    const { name, password, type, userUpdate } = req.body;
    if (!enrollment || !name || !password || !type || !userUpdate)
        return res.status(400).json({ message: "Faltan campos requeridos." });

    try {
        const user = await userRepository.updateUser(enrollment, {
            Name: name,
            Password: password,
            Type: type,
            UserUpdate: userUpdate,
            UpdatedAt: new Date(),
        });
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Cambiar estado del usuario
export const toggleUserActivation = async (req, res) => {
    const { enrollment } = req.params;

    try {
        const result = await userRepository.toggleUserActivation(enrollment);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

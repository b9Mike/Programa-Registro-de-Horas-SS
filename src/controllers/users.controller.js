import { userRepository } from "../repositories/usersRepository.js";

import { encryptPassword, comparePassword, generateToken } from "../services/auth.service.js";


//Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        res.status(200).json(users);
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

        const user = await userRepository.getUserByEnrollment(enrollment);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Validar la contraseña
        const isMatch = await comparePassword(password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta." });
        }

        // Generar JWT
        const token = generateToken(user.Enrollment);
        /*
        const user = await userRepository.getUserByEnrollment(enrollment, password);
        */
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

          // Encriptar la contraseña
          const hashedPassword = await encryptPassword(password);

          const user = await userRepository.createUser({
              Enrollment: enrollment,
              Name: name,
              Password: hashedPassword, // Guardar contraseña encriptada
              Type: type,
              UserCreation: userCreation,
              UserUpdate: userCreation,
              CreatedAt: new Date(),
              UpdatedAt: new Date(),
              Active: true // Valor por defecto
          });

        /*
        const user = await userRepository.createUser({
            Enrollment: enrollment,
            Name: name,
            Password: password,
            Type: type,
            UserCreation: userCreation,
            UserUpdate: userCreation,
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
            Active: true // Valor por defecto
        });
        */

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
        // Encriptar la nueva contraseña si se actualiza
        const hashedPassword = await encryptPassword(password);

        const user = await userRepository.updateUser(enrollment, {
            Name: name,
            Password: hashedPassword, // Actualizar con contraseña encriptada
            Type: type,
            UserUpdate: userUpdate,
            UpdatedAt: new Date(),
        });
        /*
        const user = await userRepository.updateUser(enrollment, {
            Name: name,
            Password: password,
            Type: type,
            UserUpdate: userUpdate,
            UpdatedAt: new Date(),
        });
        */
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

import { userRepository } from "../repositories/usersRepository.js";
import { validateToken } from "../services/auth.service.js";
export const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token)
        return res.status(401).json({ message: 'Acceso denegado. No se encontró token.' });

    const validToken = validateToken(token);

    if(!validToken)
        return res.status(401).json({ message: 'Token inválido.' });



    try{
        req.user = validToken; // Puedes acceder a los datos del usuario a través de req.user
        const user = await userRepository.getUserByEnrollment(req.user.id);
        req.user.Type = user.Type;
        req.user.Active = user.Active;
        console.log(req.user);
    } catch (error){
        throw new Error('Error al buscar el usuario: ' + error.message);
    }
    next();
}
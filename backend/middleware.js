import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from './config.js';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Authorization header missing or invalid');
        return res.status(403).send('Unauthorized01');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).send('Unauthorized02');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.log('Token verification failed:', error.message); // Log the error message
        return res.status(403).send('Unauthorized04');
    }
};

export default authMiddleware;
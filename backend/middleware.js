import {JWT_SECRET} from './config.js';
import jwt from 'jsonwebtoken';

const authMiddleware = (req,res,next) => {
    const authHeader = req.header.authrization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(403).send('Unauthorized');
    }
    
    const token = authHeader.split(' ')[1];
    try {
       const decoded = jwt.verify(token,JWT_SECRET);
       if(decoded){
           req.userId = decoded.userId;
           next();
       }
       else{
          return res.status(403).send('Unauthorized');
       }
    } catch (error) {
        return res.status(403).send('Unauthorized');
    }
}

export default authMiddleware;
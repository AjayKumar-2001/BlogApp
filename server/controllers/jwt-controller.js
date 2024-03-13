
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers[`authorization`];
    // console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token)

    if(token == null){
        return response.status(401).json({ msg: 'token is missing'});
    } 

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (user, error) => {
        if (error) {
            return response.status(403).json({ msg: 'invalid token'})
        }
        request.user = user;
        next();
    })

}
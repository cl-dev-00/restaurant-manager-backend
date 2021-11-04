import jwt from 'jsonwebtoken';

export const generateJWT = (payload: any): Promise<unknown> => new Promise((resolve, reject) => {

    const privateKey = process.env.PRIVATE_SECRET_KEY || '';


    jwt.sign({
        data: payload,
    }, privateKey, {
        expiresIn: '120ms'
    }, (error, token) => {
        if(error) {
            console.log(error);
            reject('No se pudo generar el token');
        } else {
            resolve(token);
        }
    });

});
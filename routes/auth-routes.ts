import express from "express";
import {User} from "../model/user";
import jwt, {Secret} from 'jsonwebtoken';
import {createUser, verifyUserCredentials} from "../database/user-client";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
    console.log('Login')
    const email = req.body.user.email;
    const password = req.body.user.password;

    const user : User = {email, password};

    try{
        const isVerified =  await verifyUserCredentials(user);

        if(isVerified){
            const token = jwt.sign({ email }, process.env.SECRET_KEY as Secret, {expiresIn: "1m"});
            const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN as Secret, {expiresIn: "7d"});
            res.json({accessToken : token, refreshToken : refreshToken});
        }else{
            res.sendStatus(403).send('Invalid credentials')
        }
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})

router.post("/register", async (req, res) => {
    console.log('Register', req.body);
    const email = req.body.user.email;
    const password = req.body.user.password;

    const user : User = {email, password};

    try{
        const registration = await createUser(user);
        res.status(201).json(registration);
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
})

router.post("/refresh-token", async (req, res) => {
    const authHeader = req.headers.authorization;
    const refresh_token = authHeader?.split(' ')[1];

    if(!refresh_token)res.status(401).send('No token provided');

    try{
        const payload = jwt.verify(refresh_token as string, process.env.REFRESH_TOKEN as Secret) as {email: string, iat: number};
        const token = jwt.sign({ email: payload.email }, process.env.SECRET_KEY as Secret, {expiresIn: "1m"});
        res.json({accessToken : token});
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
})
export function authenticateToken(req : express.Request, res : express.Response, next : express.NextFunction){
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    console.log(token);
    if(!token)res.status(401).send('No token provided');

    try{
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as {email: string, iat: number};
        console.log(payload.email);
        req.body.email = payload.email;
        next();
    }catch(err){
        res.status(401).send(err);
    }
}

export default router;
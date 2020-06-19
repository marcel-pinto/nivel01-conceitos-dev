import { Request, Response } from "express";
import createUser from "./services/CreateUser";
export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        email: 'marcel@gmail.com',
        password: '123456778',
        techs: [
            'ReactJS', 
            'Node', 
            'ReactNative',
            {
                title: 'JavaScript',
                experience: 100
            }
        ]
    });

    return response.json(user);
};
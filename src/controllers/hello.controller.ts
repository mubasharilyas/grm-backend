


import { Request, Response } from 'express'

export async function hello(req: Request, res: Response) {
    try {
        res.json({message:"Hello from Server! v2"});

    }
    catch (err) {
        res.json({ errorMessage: "Something has gone wrong on the server" });
    }


}
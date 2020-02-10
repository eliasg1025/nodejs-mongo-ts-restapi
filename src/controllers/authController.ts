import { Request, Response } from 'express'

export const signup = (req: Request, res: Response) => {
    return res.send('signup')
}

export const signin = (req: Request, res: Response) => {
    return res.send('signin')
}

export const profile = (req: Request, res: Response) => {
    return res.status(200).json({message: 'hola'})
}
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'
import { signupValidation, signinValidation } from '../libs/joi'

export const signup = async (req: Request, res: Response) => {

    // Validation
    const { error } = signupValidation(req.body)
    if (error) return res.status(400).json({ error: error.message })

    // Email Validation
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).json({ message: 'Email already exist' })

    // Saving user
    try {
        const { username, email, password } = req.body
    
        const user: IUser = new User({ username, email, password })
        user.password = await user.encryptPassword(password)
        const savedUser = await user.save()
    
        // Generating token
        const token: string = jwt.sign({ _id: savedUser._id }, process.env['TOKEN_SECRET'] ||  'tokentest')
    
        return res.status(201)
                  .header('auth-token', token)
                  .json({ savedUser })
    } catch (error) {
        return res.status(400).json({ error })
    }
}

export const signin = async (req: Request, res: Response) => {
    
    const { error } = signinValidation(req.body)
    if (error) return res.status(400).json({ error: error.message })
    
    const { email, password } = req.body 
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: 'Email or password is wrong' })
    }

    const is_correct = await user.validatePassword(password)
    if (!is_correct) {
        return res.status(400).json({ message: 'Invalid password' })
    }

    const token: string = jwt.sign({ _id: user._id }, process.env['TOKEN_SECRET'] ||  'tokentest', {
        expiresIn: 60 * 60 * 24
    })

    return res.status(200)
              .header('auth-token', token)
              .json({ user })
}

export const profile = async (req: Request, res: Response) => {
    const user = await User.findById(req.user_id, { password: 0 })
    if (!user) {
        return res.status(404).json({ message: 'No user found' })
    }
    return res.status(200).json({ user })
}
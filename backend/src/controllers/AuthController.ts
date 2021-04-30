import {Request, Response} from 'express'
import * as jwt from 'jsonwebtoken'
import {getRepository} from 'typeorm'
import {validate} from 'class-validator'

import {User} from '../entity/User'
import config from '../config/config'

class AuthController {

    static login = async (req: Request, res: Response) => {
        // Chack if user and password are set
        let {nickname, password} = req.body
        if(!(nickname && password))
            res.status(400).send()

        // Check user from database
        const userRepository = getRepository(User)
        let user: User
        try {
            user = await userRepository.findOneOrFail({where: {nickname}})
            // Check if encrypted password match
            if(!user.checkIfUnencryptedPasswordIsValid(password)) {
                res.status(401).send()
                return
            }

            // Sing JWT, valid for 1 hour
            const token = jwt.sign({userId: user.userId, nickname: user.nickname, userName: `${user.firstname} ${user.lastname}`}, config.jwtScreet, {expiresIn: "2h"})

            // send the jwt in the response
            res.send(token)
        } catch(error){
            res.status(401).send()
        }
    }

    static changePassword = async (req: Request, res: Response) => {
        // GetId from JWT
        const userId = res.locals.jwtPayload.userId

        // Get parameters from body
        const {oldPassword, newPassword} = req.body
        if (!(oldPassword && newPassword))
            res.status(400).send()

        // Get user from the database
        const userRepository = getRepository(User)
        let user: User
        try{
            user = await userRepository.findOneOrFail(userId)
        } catch(userId){
            res.status(401).send()
            return
        }

        // Validate model
        user.password = newPassword
        const errors = await validate(user)
        if(errors.length > 0){
            res.status(400).send()
            return
        }


        // Has the new password and save
        user.hashPassword()
        userRepository.save(user)

        res.status(204).send()
    }
}

export default AuthController
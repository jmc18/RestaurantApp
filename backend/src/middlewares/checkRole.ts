import {Request, Response, NextFunction} from 'express'
import {getRepository} from 'typeorm'

import {User} from '../entity/User'
import {Role} from '../entity/Role'

export const checkRole = (roles: Array<string>) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        // Get the user ID from checkJwt middleware
        const userId = res.locals.jwtPayload.userId

        // Get user role from the database
        const userRepository = getRepository(User)
        const roleRepository = getRepository(Role)
        let user: User
        let role: Role

        try {
            user = await userRepository.findOneOrFail(userId)
            role = await roleRepository.findOneOrFail(user.role)

            // Check if array of authorized roles includes the user's role
            if(roles.indexOf(role.description) > -1) 
                next()
            else 
                return res.status(401).send()

        } catch(e) {
            return res.status(401).send(e)
        }
    }
}
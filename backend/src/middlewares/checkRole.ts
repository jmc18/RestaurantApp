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
        let user: User

        try {
            user = await userRepository.findOneOrFail({relations:["role"], where: {userId}})

            // Check if array of authorized roles includes the user's role
            if(roles.indexOf(user.role.description) > -1) 
                next()
            else 
                res.status(401).send()

        } catch(error) {
            res.status(401).send()
        }
    }
}
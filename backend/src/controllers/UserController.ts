import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import {validate} from 'class-validator'

import {User} from '../entity/User'

class UserController {

    static listAll = async (req: Request, res: Response): Promise<Response> => {
        // Get users from database
        const userRepository = getRepository(User)
        const users = await userRepository.find({select: ["userId", "firstname", "lastname", "surname", "isActive"]})

        //Send the users object
        return res.json(users)
    }

    static getUserById = async (req: Request, res: Response): Promise<Response> => {
        // Get userId from the URL
        const userId = req.params.userId

        // Get the user from database
        const userRepository = getRepository(User)
        try {
            const user = await userRepository.findOneOrFail(userId, {
                select: ["userId", "firstname", "lastname", "surname", "nickname", "isActive"]
            })
            return res.json(user)
        } catch(error) {
            return res.status(404).send('User not found')
        }
    }

    static addUser = async(req: Request, res: Response): Promise<Response> => {
        
        // Get paramaters from the body
        const {firstname, lastname, surname, nickname, password, email, phone, address, isActive, role} = req.body.userData
        
        let user = new User();
        user.firstname = firstname
        user.lastname = lastname
        user.surname = surname
        user.nickname = nickname
        user.password = password
        user.email = email
        user.phone = phone
        user.address = address
        user.isActive = isActive
        user.role = role

        // Validate if the parameter are ok
        /*const errors = await validate(user)
        if(errors.length > 0) {
            return res.status(400).send();
        }*/

        // Hash the password, to securely store on database
        user.hashPassword()

        // Try to save. If fails, the nickname is already in use
        const userRepository = getRepository(User)
        try {
            await userRepository.save(user)
        } catch (e) {
            return res.status(409).send('nickname already in use')
        }
        return res.status(201).send('The user has been successfully created')
    }

    static updateUser = async (req: Request, res: Response): Promise<Response> => {
        // Get the userId from the URL
        const userId = req.params.userId

        //Get values from the body
        const {firstname, lastname, surname, nickname, email, phone, address, isActive} = req.body.userData

        // Try to find user on database
        const userRepository = getRepository(User)
        let user: User
        try {
            user = await userRepository.findOneOrFail(userId)
            // Validate the new values on model
            user.firstname = firstname
            user.lastname = lastname
            user.surname = surname
            user.nickname = nickname
            user.email = email
            user.phone = phone
            user.address = address
            user.isActive = isActive
        } catch (error) {
            return res.status(404).send('User not found')
        }

        const errors = await validate(user)
            if(errors.length > 0)
                return res.status(400).send(errors)
            
        try{
            await userRepository.save(user)
        } catch (e) {
            return res.status(409).send('nickname already in use')
        }

        return res.status(204).send()
    }

    static deleteUSer = async (req: Request, res: Response): Promise<Response> => {
        // Get the userId from the URL
        const userId = req.params.userId

        const userRepository = getRepository(User)
        let user: User

        try {
            user = await userRepository.findOneOrFail(userId)
        } catch(error) {
            return res.status(404).send('User not found')
        }

        userRepository.delete(userId)

        return res.status(204).send()
    }
}

export default UserController
import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import {Role} from '../entity/Role'

export const getRoles = async (req: Request, res: Response): Promise<Response> => {
    const roles = await getRepository(Role).find();
    return res.json(roles)
}
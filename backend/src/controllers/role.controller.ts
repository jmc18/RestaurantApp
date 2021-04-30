import {request, Request, Response} from 'express'
import {getRepository} from 'typeorm'
import {Role} from '../entity/Role'

export const getRoles = async (req: Request, res: Response): Promise<Response> => {
    const roles = await getRepository(Role).find();
    return res.json(roles)
}

export const getRole = async (req: Request, res: Response): Promise<Response> => {
    const role = await getRepository(Role).findOne(req.params.idRol)
    return res.json(role)
}

export const createRole = async (req: Request, res: Response): Promise<Response> => {
    const roleRepository = getRepository(Role)
    const newRole = roleRepository.create(req.body)
    const roleResult = await roleRepository.save(newRole)
    return res.json(roleResult)
}

export const updateRole = async (req: Request, res: Response): Promise<Response> => {
    const roleRepository = getRepository(Role)
    const role = await roleRepository.findOne(req.params.idRol)
    if(role){
        const roleUpdate = roleRepository.merge(role, req.body)
        const roleResult = await roleRepository.save(roleUpdate)
        return res.json(roleResult)
    }
    return res.status(404).json({msg: 'Not Role found'})
}

export const deleteRole = async (req: Request, res: Response): Promise<Response> => {
    const role = await getRepository(Role).delete(req.params.idRole)
    return res.json(role)
}
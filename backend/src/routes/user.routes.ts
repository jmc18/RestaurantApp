import {Router} from 'express'

import UserController from "../controllers/UserController";
import { checkJwt } from '../middlewares/checkJwt'
import { checkRole } from '../middlewares/checkRole'

const router = Router()

//Get all users
router.get('/list-all', [checkJwt, checkRole(["Administrador"])], UserController.listAll)

//Get one user
router.get("/get-user/:userId\b(uuid:){0,1}\s*([a-f0-9\\-]*){1}\s*", [checkJwt, checkRole(['Administrador'])], UserController.getUserById)

//Create a new user
router.post('/add-user', [checkJwt, checkRole(["Administrador"])], UserController.addUser)

//Update one user
router.put("/update-user/:userId\b(uuid:){0,1}\s*([a-f0-9\\-]*){1}\s*", [checkJwt, checkRole(['Administrador'])], UserController.updateUser)

//Delete one user
router.delete("/delete-user/:userId\b(uuid:){0,1}\s*([a-f0-9\\-]*){1}\s*", [checkJwt, checkRole(['Administrador'])], UserController.deleteUSer)

export default router
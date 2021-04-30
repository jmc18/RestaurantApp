import {Router} from 'express'

const router = Router()

import {getRoles, getRole, createRole, updateRole, deleteRole} from '../controllers/role.controller'

router.get('/get-all', getRoles)
router.get('/get-role/:idRol', getRole)
router.post('/add-role', createRole)
router.put('/update-role/:idRol', updateRole)
router.delete('/delete-role/:idRol', deleteRole)


export default router
import {Router} from 'express'

const router = Router()

import {getRoles} from '../controllers/role.controller'

router.get('/roles', getRoles)
/*router.get('/roles/:idRol')
router.post('/roles')
router.put('/roles')
router.delete('/roles/:idRol')*/


export default router
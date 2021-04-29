import {Router, Request, Response} from 'express'
import auth from './auth.routes'
import router from './roles.routes'

const routes = Router()

router.use('/auth', auth)


export default router
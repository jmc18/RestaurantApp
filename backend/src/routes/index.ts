import {Router, Request, Response} from 'express'
import auth from './auth.routes'
import roles from './roles.routes'

const routes = Router()

routes.use('/auth', auth)
routes.use('/roles', roles)


export default routes
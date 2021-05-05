import {Router, Request, Response} from 'express'
import auth from './auth.routes'
import roles from './roles.routes'
import users from './user.routes'

const routes = Router()

routes.use('/auth', auth)
routes.use('/roles', roles)
routes.use('/users', users)


export default routes
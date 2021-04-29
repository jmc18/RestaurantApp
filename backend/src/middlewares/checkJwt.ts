import {Request, Response, NextFunction} from 'express'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

    //Get the JWT token from the head
    const token = <string>req.headers["auth"]
    let jwtPayload

    // try to validate the token and get data
    try {
        jwtPayload = <any>jwt,jwt.verify(token, config.jwtScreet)
        res.locals.jwtPayload = jwtPayload
    } catch (error) {
        // If token is not valid, response with 401 (unauthorized)
        res.status(401).send()
        return
    }

    /*
        The token is valid for 2 hours
        We want to send a new token on every request
    */
   const {userId, nickname, userName} = jwtPayload
   const nextToken = jwt.sign({userId, nickname, userName}, config.jwtScreet, {expiresIn: "2h"})

   res.setHeader('token', nextToken)

   // Call the next middleware or controller
   next()
}
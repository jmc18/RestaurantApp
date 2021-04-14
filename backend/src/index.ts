import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import "reflect-metadata";
import {createConnection} from "typeorm";

import userRoutes from './routes/user.routes'

const app = express()

// middlewares

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

createConnection().then(connection => {
    // here you can start to work with your entities
  }).catch(error => console.log(error));

// Routes
app.use(userRoutes)

const PORT = 3000
app.get('/', (req, res) => res.send('Express + TypeScript'))
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
})
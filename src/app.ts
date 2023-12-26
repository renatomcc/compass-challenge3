import express from 'express'
import connect from './server'
import dotenv from 'dotenv'
import Routes from './routes/Routes'
dotenv.config()

const app = express()
app.use(express.json())
app.use('/', Routes)

connect()

export default app

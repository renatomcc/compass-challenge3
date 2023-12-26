import express from 'express'
import connect from './server'
import Routes from './routes/Routes'

const app = express()
app.use(express.json())
app.use('/', Routes)

connect()

export default app

import express, { Router } from 'express'
const Routes: Router = express.Router()

const prefix = '/api/v1'

Routes.get(`${prefix}/users`, () => {
    //return events
})

export default Routes

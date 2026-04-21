import express from 'express'
import authRoutes from './auth.route.ts'

const v1Router = express.Router()

v1Router.use('/auth', authRoutes)

export default v1Router;
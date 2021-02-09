import express from 'express'
import setupMiddlewatre from '@/main/config/middleware'
import setupRoutes from '@/main/config/routes'

const app = express()
setupMiddlewatre(app)
setupRoutes(app)

export default app

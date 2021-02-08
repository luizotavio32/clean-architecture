import express from 'express'
import setupMiddlewatre from '@/main/config/middleware'

const app = express()
setupMiddlewatre(app)

export default app

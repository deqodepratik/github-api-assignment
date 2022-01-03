/* eslint-disable no-console */
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import fetchUser, { fetchRepoDetails } from './controller/user.controller'
import { checkRepo, checkUser } from './middleware'

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API for Github query',
    version: '1.0.0',
    description:
      'This API is made with Express. It retrieves data from Github.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'deqode',
      url: 'https://deqode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3300',
      description: 'Development server',
    },
  ],
}

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/app.js'],
}

const swaggerSpec = swaggerJSDoc(options)

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * /{user}:
 *  get:
 *    summary: Fetch the details of the github user
 *    description: This API will fetch the user details from the Github and will update the database.
 *    parameters:
 *      - in: path
 *        name: user
 *        required: true
 *        description: Github handle name of the user.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Fetched
 */
app.get('/:user', checkUser, fetchUser)

/**
 * @swagger
 * /repo/{user}:
 *  get:
 *    summary: Fetch the list of repo of the github user
 *    description: This API will fetch all the public repo of the Github user and will update the database.
 *    parameters:
 *      - in: path
 *        name: user
 *        required: true
 *        description: Github handle name of the user.
 *        schema:
 *          type: string
 *      - in: query
 *        name: limit
 *        required: false
 *        description: Handles the limit of results to be returned.
 *        schema:
 *          type: string
 *      - in: query
 *        name: skip
 *        required: false
 *        description: Handles the results to be skipped.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Fetched
 */
app.get('/repo/:user', checkRepo, fetchRepoDetails)

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() =>
    app.listen(3300, () => {
      console.log('Listining on 3300')
    })
  )
  .catch((err) => console.log(err))

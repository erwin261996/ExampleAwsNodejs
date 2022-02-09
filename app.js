const { getInstances } = require('./servicesInstances')
const awsResolve = require('./middleware/awsResolve')

const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.json())

app.use('/api', routes)

app.use((req, res, next) => {
  res.status(404).send("Lo siento, esa ruta no existe. Que tenga un buen dia :)")
})

module.exports = app;
require('dotenv').config()
const app = require('./app')
const http = require('http')

const PORT = process.env.PORT || 8080;
const initServer = http.createServer(app);

initServer.listen(PORT, (req, res) => {
  console.log(`Init server at port ${PORT}`)
})
const express = require('express')
const {getInstances} = require("../servicesInstances");
const awsResolve = require("../middleware/awsResolve");
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.send(`
    <h2>Api de \"AWS\" para diferentes servicios como: S3, IAM</h2>
  `)
})

router.post('/aws', async (req, res, next) => {
  const { params, options } = await req.body;

  const entryRoutes = (params=='project') && params || 'default';

  const ENDPOINT = {
    async project ({...options}) {
      const rootInstances = await getInstances('us-west-2');
      const { identity, instances } = rootInstances;

      awsResolve(identity, instances, options)
    },
    default () {
      return "An error has occurred with the routes.";
    }
  }

  const execEndpoint = ENDPOINT[entryRoutes](options) ?? ENDPOINT[entryRoutes];

  res.send(`Params: ${execEndpoint}`)
})

module.exports = router;
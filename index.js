const { getInstances } = require('./servicesInstances')
const awsResolve = require('./middleware/awsResolve')

const initialProjects = async () => {
  const rootInstances = await getInstances('us-west-2');

  if (!rootInstances)
    throw new Error()

  const { identity, instances } = rootInstances;

  awsResolve(identity, instances, {
    solveMethodsName: {
      Example: 'Example',
    },
    region:  {
      "us-west-2": 'us-west-2'
    }
  })
}

initialProjects();
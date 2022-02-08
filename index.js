const { getInstances } = require('./servicesInstances')
const awsResolve = require('./middleware/awsResolve')

const initialProjects = async () => {
  const rootInstances = await getInstances('us-west-2');
  const { identity, instances } = rootInstances;

  awsResolve(identity, instances, {
    solveMethodsName: 'UploadImageBucket',
    region:  {
      "us-west-2": 'us-west-2'
    }
  })
}

initialProjects();
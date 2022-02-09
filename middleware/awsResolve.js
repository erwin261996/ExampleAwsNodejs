const services = require('./services')

// Middleware Analyze data and solve the method(s) for AWS.
const awsResolve = async (data, instances, option) => {
  const { solveMethodsName, region } = option;

  const message = (nameMethod) => {
    return {
      message: 'We did not find the method: '+ nameMethod
    }
  };

  // Select and run the logic on the service
  const result = (solveMethodsName.length > 1) ? (
    // Multiple services
    solveMethodsName.map(async (name) => {
      const methods = await services(data, instances, region, name) ?? message(name)

      return methods;
    })
  ) : await services(data, instances, region, solveMethodsName[0])
      ?? message(solveMethodsName[0])

  return result;
}

module.exports = awsResolve
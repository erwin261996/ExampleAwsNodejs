const { IAM } = require('../examples')
// middleware Analyze data and solve the methos for AWS.
const awsResolve = (data, instances, option) => {
  const { solveMethodsName, region } = option;
  const resolve = {
    Example: IAM.Example(data, instances, region),
  }

  const result = resolve[solveMethodsName];
  return result;
}

// Funtion Checks from Analyze Data
/*const usersMfaEnabled = (data, instances, {region}={}) => {
  console.log("Estamos Aquui")
}*/

module.exports = awsResolve
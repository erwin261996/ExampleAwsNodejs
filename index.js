const { getInstances } = require('./servicesInstances')

getInstances('us-west-2').then(async result => {
  const { identity, instances } = await result;

  analyzeDataAWS(identity, instances, {
    nameCheck: {
      usersMfaEnabled: 'usersMfaEnabled',
    },
    region:  {
      "us-west-2": 'us-west-2'
    }
  })
}).catch(err => console.error(err))

// Middleware Checks Analyze Data for AWS.
const analyzeDataAWS = (data, instances, option) => {
  const { nameCheck, region } = option;
  const checkes = {
    usersMfaEnabled: usersMfaEnabled(data, instances, region),
  }

  const result = checkes[nameCheck];
  return result;
}

// Funtion Checks from Analyze Data
const usersMfaEnabled = (data, instances, {region}={}) => {
  console.log("Estamos Aquui")
}
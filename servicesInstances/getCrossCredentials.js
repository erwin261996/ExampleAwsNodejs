const AWS = require('aws-sdk')
var sts = new AWS.STS();

module.exports = {
  getCrossCredentials: async (roleArn) =>
  new Promise((resolve, reject) => {
    const timestamp = (new Date()).getTime();
    sts.assumeRole({
      RoleArn: roleArn,
      RoleSessionName: `cloud-${timestamp}`
    }, (err, credentials) => {
      if (err) console.log(err)
      else {
        const stsUser = new AWS.STS(credentials);
    
        sts.getCallerIdentity({}, (err, data) => {
          if (err)
            reject(err)
          else {
            stsUser.getCallerIdentity({}, (err, data)=> {
              if (err) reject(err)
              else {
                resolve({
                  credentials,
                  identity: data
                })
              }
            })
          }
        })
      }
    })
  })
  
}
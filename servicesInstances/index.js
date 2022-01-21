require('dotenv').config()
const AWS = require('aws-sdk')

const roleArn = process.env.roleArn;
AWS.config.update({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  region: process.env.aws_default_region
})
const { getCrossCredentials } = require('./getCrossCredentials')

module.exports = {
  getInstances: async (region) => {
    return await getCrossCredentials(roleArn).then(result => {
      const { credentials, identity } = result
      
      return {
        identity,
        instances: {
          ec2: new AWS.EC2({...credentials, region}),
          lambda: new AWS.Lambda({...credentials, region}),
          iam: new AWS.IAM(credentials),
          elb: new AWS.ELB({...credentials, region}),
        }
      }
    })
    .catch(err => console.error(err));
  }
}

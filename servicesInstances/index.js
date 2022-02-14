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
    const result = await getCrossCredentials(roleArn);
    const { credentials, identity } = result

    return {
      identity,
      instances: {
        IAM: new AWS.IAM({...credentials, region}),
        s3: new AWS.S3({...credentials, region}),
      }
    }
  }
}

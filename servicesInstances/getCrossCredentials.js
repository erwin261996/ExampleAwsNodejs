const AWS = require('aws-sdk')
var sts = new AWS.STS();

module.exports = {
  getCrossCredentials: async (roleArn) => {
    const timestamp = (new Date()).getTime();
    let paramsts = {
      RoleArn: roleArn,
      RoleSessionName: `example-awscli-${timestamp}`
    }

    const credentials = await sts.assumeRole(paramsts).promise();
    if (!credentials) {
      throw new Error("No roleARN Found");
    }

    // Obtenemos las credenciles con el RoleARN
    const stsUser = new AWS.STS(credentials);
    const callerUsersIdentity = await stsUser.getCallerIdentity({}).promise();

    if (!callerUsersIdentity) {
      throw new Error("No Credentials Found");
    }

    return {
      credentials,
      identity: callerUsersIdentity
    }
  }
}
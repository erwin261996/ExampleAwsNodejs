const { IAM, S3 } = require('../examples')

// middleware Analyze data and solve the methos for AWS.
const awsResolve = (data, instances, option) => {
  const { solveMethodsName, region } = option;

  const methods = ({
    Example: IAM.Example(data, instances, region),
    UploadImageBucket: S3.UploadImageBucket(data, instances, region)
  })[solveMethodsName] ?? 'We did not find the method'

  console.log(methods)
  return methods;
}

module.exports = awsResolve
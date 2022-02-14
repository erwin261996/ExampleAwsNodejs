const {IAM, S3} = require("../examples");

module.exports = async (data, instances, region, name) => {
  const todoMethods = {
    Example: () => IAM.Example(data, instances, region),
    UploadImageBucket: () => S3.UploadImageBucket(data, instances, region),
    NotAllowAllActionPrincipals: () => S3.NotAllowAllActionPrincipals(data, instances.IAM, region)
  }

  const resultMethods = await todoMethods[name]();

  return resultMethods

}
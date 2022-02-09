const {IAM, S3} = require("../examples");

module.exports = async (data, instances, region, name) => {
  const todoMethods = {
    Example: () => IAM.Example(data, instances, region),
    UploadImageBucket: () => S3.UploadImageBucket(data, instances.s3, region),
  }

  const resultMethods = await todoMethods[name]();

  return resultMethods

}
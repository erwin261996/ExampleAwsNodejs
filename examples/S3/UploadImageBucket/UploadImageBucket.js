const fs = require('fs');
const path = require('path');
const Util = require('util')

const UploadImageBucket = async (data, instances, region = {}) => {

  const BUCKET_NAME = "examplebucket-v1-example-images";
  const image = fs.createReadStream(path.resolve(__dirname, './image/Landscape.jpg'));
  var message = "";

  image.on('error', (err) => {
    message = err;
  })

  if (!(await CheckBucket(instances, BUCKET_NAME))) {
    instances.createBucket({
      Bucket: BUCKET_NAME,
      ACL: 'public-read'
    }, (err, data) => {
      if (err)
        message = err;
      else {
        message= `
          ----------------------------------------------------------------------------------
          Your previous request to create the named bucket succeeded and you already own it.
          ----------------------------------------------------------------------------------
          Either the bucket was not found or it was not uploaded correctly to AWS... please refresh the bucket in S3 and try again.
          `;
      }
    })
  }

  message = "Awaiting ..."
  if ((await CheckBucket(instances, BUCKET_NAME))) {
    let param = {
      ACL: 'public-read-write',
      Bucket: BUCKET_NAME,
      Key: 'Landscape.jpg',
      Body: image,
    }
    const uploadImage = instances.upload(param).promise();

    if (!uploadImage)
      throw new Error("Error uploading image to bucket")

    message= '-- Image uploaded successfully --';
  }

  const result = {
    status: 200,
    result: 'Uploading image to bucket',
    message
  }

  return result

}

const CheckBucket = async (instances, BUCKET_NAME) => {
  // We check if we have an already existing Bucket
  const bucket = Util.promisify(instances.listBuckets).bind(instances)
  const hasBucket = await bucket({});
  const lstHasBucket = hasBucket?.Buckets ?? [];

  let boolHasBucket = lstHasBucket.filter((bucket) => bucket.Name === BUCKET_NAME);

  return boolHasBucket.length
}

module.exports = UploadImageBucket
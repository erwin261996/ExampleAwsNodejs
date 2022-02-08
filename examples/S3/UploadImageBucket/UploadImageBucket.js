const fs = require('fs');
const path = require('path');
const Util = require('util')

const UploadImageBucket = async (data, instances, region = {}) => {

  const BUCKET_NAME = "examplebucket-v1-example-images";
  const image = fs.createReadStream(path.resolve(__dirname, './image/Landscape.jpg'));

  image.on('error', (err) => {
    console.log(err)
  })

  if (!(await CheckBucket(instances, BUCKET_NAME))) {
    instances.createBucket({
      Bucket: BUCKET_NAME,
      ACL: 'public-read'
    }, (err, data) => {
      if (err)
        console.error('Error: ',err)
      else {
        console.log('----------------------------------------------------------------------------------')
        console.log("Your previous request to create the named bucket succeeded and you already own it.")
        console.log('----------------------------------------------------------------------------------')
        console.log('Either the bucket was not found or it was not uploaded correctly to AWS... please refresh the bucket in S3 and try again.')
      }
    })
  }

  console.log("Awaiting ...")
  if ((await CheckBucket(instances, BUCKET_NAME))) {
    let param = {
      ACL: 'public-read-write',
      Bucket: BUCKET_NAME,
      Key: 'Landscape2.jpg',
      Body: image,
    }
    const uploadImage = instances.upload(param).promise();

    if (!uploadImage)
      throw new Error("Error uploading image to bucket")

    console.log('-- Image uploaded successfully --')
  }

  return {
    status: 200,
    result: 'Uploading image to bucket'
  }

}

const CheckBucket = async (instances, BUCKET_NAME) => {
  // We check if we have an already existing Bucket
  const todo = Util.promisify(instances.listBuckets).bind(instances)
  const hasBucket = await todo({});
  const lstHasBucket = hasBucket?.Buckets ?? [];

  let boolHasBucket = lstHasBucket.filter((bucket) => bucket.Name == BUCKET_NAME);

  return boolHasBucket.length
}

module.exports = UploadImageBucket
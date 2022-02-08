const fs = require('fs');
const path = require('path');

const UploadImageBucket = async (data, instances, region = {}) => {

  const BUCKET_NAME = "examplebucket-v1-example-images";
  const image = fs.readFileSync(path.resolve(__dirname, './image/Landscape.jpg'));

  await instances.createBucket({
    Bucket: BUCKET_NAME,
    ACL: 'public-read'
  }, (err, data) => {
    if (err)
      console.error('Error: ',err)
    else {
      console.log('----------------------------------------------------------------------------------')
      console.log("Your previous request to create the named bucket succeeded and you already own it.")
      console.log('----------------------------------------------------------------------------------')
    }
  })

  let param = {
    ACL: 'public-read-write',
    Bucket: BUCKET_NAME,
    Key: 'Landscape.jpg',
    Body: Buffer.from(image).toString('base64'),
  }
  const uploadImage = await instances.upload(param).promise();

  if (!uploadImage)
    throw new Error("Error uploading image to bucket")

  return {
    status: 200,
    result: 'Uploading image to bucket'
  }

}

module.exports = UploadImageBucket
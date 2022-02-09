# Example Code made with NodeJs and AWS-SDK

#### First install the modules
```
yarn install
```

#### Configure the .env and add your Amazon settings - AWS Console, Creating an IAM User
```
https://aws.amazon.com/
```
#### Run Project
```
node index.js
```

#### To use the API created with AWS-SDK with POST method
```
http(s)://localhost:8080/api/aws
```
#### And as JSON to send, it would be in this format
```json
{
    "params": "project",
    "options": {
        "solveMethodsName": ["UploadImageBucket"],
        "region": {
            "us-west-2": "us-west-2"
        }
    }
}
```

### Code Made by: Erwin Vargas Developer
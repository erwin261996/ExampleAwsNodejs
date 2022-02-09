# AccessDenied: Access Denied in the Insert from Bucket
1. En IAM tenemos que agregar una politica para el Bucket S3

AmazonS3FullAccess - Administrado por AWS
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:*",
                "s3-object-lambda:*"
            ],
            "Resource": "*"
        }
    ]
}
```

AmazonS3ReadOnlyAccess - Administrado por AWS
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:Get*",
                "s3:List*",
                "s3-object-lambda:Get*",
                "s3-object-lambda:List*"
            ],
            "Resource": "*"
        }
    ]
}
```

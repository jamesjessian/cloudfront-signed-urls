# Deploying an S3 bucket and Cloudfront to create signed URLs for private files using CloudFormation

This is a github repository for the examples I've created to go along with my article describing how to use Cloudformation to create the necessary resources for Cloudfront signed URLs.


## Commands to generate private and public keys

```
	openssl genrsa -out private_key.pem 2048
	openssl rsa -pubout -in private_key.pem -out public_key.pem
```

## Example command to deploy the template

```
aws cloudformation deploy  --template ./cloudformation.yml --stack-name cloudfront-signed-urls --parameter-overrides BucketName=cloudfront-signed-urls PublicKey="$(<public_key.pem)"
```

Change the name of the bucket (in this case `cloudfront-signed-urls`) to whatever you like, but it has to be universally unique; The deployment will fail if anybody in the world has already used this bucket name.
The `PublicKey="$(<public_key.pem)"` bit will inject the contents of public_key.pem into this parameter. Make sure you have already generated this file with the open-ssl commands above.
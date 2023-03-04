const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: "ASIARXEN4ITRBRLD77QF",
    secretAccessKey: "p03WOWmOphQEu0hXeyDtQf/4ivLbOrxS0BUGoUpf",
    aws_session_token: "FwoGZXIvYXdzED8aDFYWpKWLGyun0fkmSSLLATvy6d+Nn0kPkv3OwbV4E51eofHfqS6Yo7VMj5ifcih4MDBnSkBo8vgXF9hKLrqfmqwr3WYOkh7Ezhan7G+zo0aeUJeoUiZcsdAdjkXtdJCqKebksZns57uDoczYCZ79r2ZLD2YdF3vAUK8+YGlPAUs2MPWyx1yoRTS/2AO8LcnMO2nj5bs4G7saLaL/q04LrobvQzViQETZ7N5lcm69+KnJzSvhdAFJobB02emeMKgsNzPKNLw8Uh51yAnG6DEUFaZ6QbsQsN1NaokBKIaKjaAGMi2U4XTlWFN4/UPf9AWNZuGeEF1Q3qkneUJlPfNiWdDynrKZcsRe8tYw00dIWDo=",
});

const BUCKET_NAME = 'random-name-bucket-nodejs-test-0123'

const createBucket = (bucketName) => {
    // Create the parameters for calling createBucket
    var bucketParams = {
        Bucket : bucketName
    };
  
    // call S3 to create the bucket
    s3.createBucket(bucketParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Location);
        }
    });
}

const listBuckets = (s3) => {
    s3.listBuckets(function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Buckets);
        }
    });
}

const uploadFile = (filePath,bucketName,keyName) => {
    var fs = require('fs');
    // Read the file
    const file = fs.readFileSync(filePath);

    // Setting up S3 upload parameters
    const uploadParams = {
        Bucket: bucketName, // Bucket into which you want to upload file
        Key: keyName, // Name by which you want to save it
        Body: file // Local file 
    };

    s3.upload(uploadParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } 
        if (data) {
            console.log("Upload Success", data.Location);
        }
    });
};

const listObjectsInBucket = (bucketName) => {
    // Create the parameters for calling listObjects
    var bucketParams = {
        Bucket : bucketName,
    };
  
    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}

const deleteBucket = (bucketName) => {
    // Create params for S3.deleteBucket
    var bucketParams = {
        Bucket : bucketName
    };
  
    // Call S3 to delete the bucket
    s3.deleteBucket(bucketParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}

function sleep(ms) {
    console.log('Wait...')
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){
    console.log('\nCreating bucket : ')
    createBucket(BUCKET_NAME)
    await sleep(5000)
    
    console.log('\nListing out all the buckets in your AWS S3: ')
    listBuckets(s3)
    await sleep(5000)
    
    console.log('\nUploading image1 to '+ BUCKET_NAME)
    uploadFile('nodejs.jpg',BUCKET_NAME,"nodejs.jpg")
    await sleep(5000)
    
    console.log('\nUploading image2 to '+ BUCKET_NAME)
    uploadFile('npm.jpg',BUCKET_NAME,"npm.jpg")
    await sleep(5000)
    
    console.log('\nListing out all the files/objects in the bucket '+ BUCKET_NAME)
    listObjectsInBucket(BUCKET_NAME)
    await sleep(5000)
}
main()


# Upload Files to Server and AWS S3 CRUD Operations

This project allows you to perform two main tasks:

1. Upload files to a local server.
2. Perform CRUD (Create, Read, Update, Delete) operations on an AWS S3 bucket.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)

## Features

- Upload single or multiple files to a local server.
- Perform CRUD operations on an AWS S3 bucket, including listing objects, reading objects, and deleting objects.
- Utilizes the AWS SDK for JavaScript to interact with AWS S3.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/upload-files.git
2. Navigate to the project directory:

   ```bash
   cd aws-s3-crud
3. Install project dependencies:
   
   ```bash
   npm install
5. Run using script

   ```bash
   npm run dev

## Usage

### Uploading Files Locally

To upload files to the local server, you can use the following routes:

- `/api/v1/uploadlocal/singlefile`: Upload a single file to the server.
- `/api/v1/uploadlocal/multiplefiles`: Upload multiple files to the server.
- `/api/v1/uploadlocal/multiplefields`: Upload files with multiple fields.

## AWS S3 CRUD Operations

To perform CRUD operations on an AWS S3 bucket, configure your AWS credentials and set the `AWS_BUCKET_NAME` environment variable. Then, you can use the following routes:

- `/api/v1/s3/object`: Upload a file to the AWS S3 bucket.
- `/api/v1/s3/objects`: Upload multiple files to the AWS S3 bucket.
- `/api/v1/s3/allobjects`: List all objects in the AWS S3 bucket.
- `/api/v1/s3/readobject`: Read a specific object in the AWS S3 bucket.
- `/api/v1/s3/object`: Delete a specific object in the AWS S3 bucket.

## Configuration

To set up the AWS credentials and configure the project, follow these steps:

1. Create a `.env` file in the project's root directory if it doesn't already exist.

2. Open the `.env` file and add the following lines, replacing the placeholders with your actual AWS credentials and bucket name:

   ```env
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_BUCKET_NAME=your-bucket-name
   AWS_REGION=region-name

## Required AWS S3 Bucket Permissions

Before using this project to interact with an AWS S3 bucket, ensure that your AWS Identity and Access Management (IAM) user or role has been granted the following permissions on the bucket:

1. **GetObject**: This permission allows you to retrieve (read) objects from the S3 bucket. It's required for reading objects from the bucket.

2. **PutObject**: This permission allows you to upload (write) objects to the S3 bucket. It's required for uploading files to the bucket.

3. **DeleteObject**: This permission allows you to delete objects from the S3 bucket. It's required for deleting specific objects from the bucket.

4. **ListBucket**: This permission allows you to list the objects within the S3 bucket. It's required for operations like listing all objects in the bucket.

Please ensure that the IAM user or role you are using to access the S3 bucket has been configured with these permissions. Without the proper permissions, certain S3 operations may not work as expected.

If you need to modify or add these permissions to your IAM user or role, you can do so through the AWS IAM console or by updating the IAM policy associated with the user or role.

Once the necessary permissions are granted, you'll be able to use this project to interact with the specified AWS S3 bucket seamlessly.



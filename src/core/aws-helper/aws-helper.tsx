import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import 'web-streams-polyfill/dist/polyfill';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import type { AwsCredentialIdentity } from '@aws-sdk/types';
import { Env } from '@env';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ReadableStream } from 'web-streams-polyfill';

if (typeof globalThis.ReadableStream === 'undefined') {
  // @ts-ignore
  globalThis.ReadableStream = ReadableStream;
}

const AWSHelper = () => {
  const [isLoading, setIsLoading] = useState(false);
  const options = {
    keyPrefix: 'skaners-uploads/',
    bucket: Env.AWS_DEFAULT_S3_BUCKET,
    region: Env.AWS_S3_REGION,
    successActionStatus: 201,
  };

  const credentials: AwsCredentialIdentity = {
    accessKeyId: Env.ACCESS_KEY_ID,
    secretAccessKey: Env.SECRET_ACCESS_KEY,
  };

  const client = new S3Client({
    region: options.region,
    credentials: credentials,
  });

  const uploadS3File = async (
    blob: Blob,
    fileName: string
  ): Promise<string | false> => {
    try {
      setIsLoading(true);
      const key = `${options.keyPrefix}${fileName}-${uuid()}.jpg`;
      const command = new PutObjectCommand({
        Bucket: options.bucket,
        Key: key,
        Body: blob,
        ContentType: 'image/jpeg',
        ACL: 'public-read',
      });

      await client.send(command);

      const fileUrl = `https://${options.bucket}.s3.${options.region}.amazonaws.com/${key}`;

      setIsLoading(false);
      return fileUrl;
    } catch (error) {
      setIsLoading(false);
      console.error('Error uploading file:', error);
      return false;
    }
  };

  return { uploadS3File, isPending: isLoading };
};

export default AWSHelper;

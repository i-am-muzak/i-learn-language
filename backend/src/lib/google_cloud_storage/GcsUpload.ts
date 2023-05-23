import { GetSignedUrlConfig } from '@google-cloud/storage';
import { Storage } from '@google-cloud/storage/build/src/storage';
import { Logger } from '@nestjs/common';

export class GCSManager {
  private bucket: string;
  private destination: string;
  private data: Buffer | string;
  private filename: string;

  constructor(bucket: string, destination: string, data: Buffer | string) {
    this.bucket = bucket;
    this.destination = destination;
    this.data = data;
    this.filename = this.destination.split('/').pop();
  }

  public async upload(make_public: boolean) {
    try {
      const storage = new Storage().bucket(this.bucket);
      const blob = storage.file(this.destination);

      // Logging
      Logger.log(
        `File: ${this.filename} is uploading to ${this.bucket}. Destination: ${this.destination}`,
      );
      await blob.save(this.data);

      if (make_public) {
        await blob.makePublic();
        return `https://storage.googleapis.com/${this.destination}`;
      }

      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }

  public async generateV4ReadSignedUrl() {
    const bucket = new Storage().bucket(this.bucket);
    const options: GetSignedUrlConfig = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 30 * 60 * 1000, // 30 minutes
    };

    try {
      const [url] = await bucket.file(this.destination).getSignedUrl(options);
      return url;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }
}

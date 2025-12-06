export default ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('DO_SPACE_KEY'),
            secretAccessKey: env('DO_SPACE_SECRET'),
          },
          endpoint: env('DO_SPACE_ENDPOINT'),
          region: env('DO_SPACE_REGION'),
          forcePathStyle: true, // required for DigitalOcean Spaces
          signatureVersion: 'v4',
          params: {
            Bucket: env('DO_SPACE_BUCKET'),
            ACL: 'public-read',
          },
        },
        baseUrl: env('DO_SPACE_CDN_URL') || `${env('DO_SPACE_ENDPOINT')}/${env('DO_SPACE_BUCKET')}`,
        rootPath: env('DO_SPACE_ROOT_PATH', ''),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
      security: {
        checkFileSize: true,
        checkFileType: true,
        maxFileSize: 200 * 1024 * 1024,
        allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
      },
    },
  },
});

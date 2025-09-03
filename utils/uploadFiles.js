// utils/uploadFiles.js
import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import s3 from './awsClient.js';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const allowedDocTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const sanitizeFileName = (name) => {
    const base = path.parse(name).name.replace(/\s+/g, '-');
    const ext = path.extname(name);
    const timestamp = Date.now();
    return `${base}-${timestamp}${ext}`;
};

const bucketName = process.env.S3_BUCKET_NAME;

export const uploadFilesToS3 = async ({
    files,
    image = true,
    doc = true,
    imageLimit = 5,
    docLimit = 3,
    s3Folder = '',
}) => {
    const uploadedFiles = [];

    try {
        let imageCount = 0;
        let docCount = 0;

        for (const file of files) {
            const isImage = allowedImageTypes.includes(file.mimetype);
            const isDoc = allowedDocTypes.includes(file.mimetype);

            if (isImage && !image) continue;
            if (isDoc && !doc) continue;

            if (isImage && imageCount >= imageLimit) throw new Error('Image limit exceeded');
            if (isDoc && docCount >= docLimit) throw new Error('Document limit exceeded');

            const sanitized = sanitizeFileName(file.originalname);
            const key = `${s3Folder}${sanitized}`;

            const command = new PutObjectCommand({
                Bucket: bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            });

            await s3.send(command);
            uploadedFiles.push({ key, type: file.mimetype });

            if (isImage) imageCount++;
            if (isDoc) docCount++;
        }

        return uploadedFiles;
    } catch (err) {
        // Rollback uploaded files
        for (const uploaded of uploadedFiles) {
            const delCmd = new DeleteObjectCommand({
                Bucket: bucketName,
                Key: uploaded.key,
            });
            await s3.send(delCmd);
        }
        throw err;
    }
};

export const getFileUrl = async (fileName) => {
    if (!fileName) {
        throw new Error('File name is required');
    }

    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName,
    });

    try {
        const signedUrl = await getSignedUrl(s3, command);
        return signedUrl;
    } catch (error) {
        console.error('Error generating signed URL:', error);
        throw new Error('Failed to generate file URL');
    }
};

export const deleteFilesFromS3 = async (keys = []) => {
    try {
        for (const key of keys) {
            const cmd = new DeleteObjectCommand({ Bucket: bucketName, Key: key });
            await s3.send(cmd);
        }
        return true;
    } catch (err) {
        throw err;
    }
};
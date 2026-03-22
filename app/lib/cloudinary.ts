// app/lib/cloudinary.ts
// Helper untuk upload screenshot ke Cloudinary

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
    });

    export interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string;
    }

    /**
     * Upload image dari URL (buffer) ke Cloudinary
     * @param imageBuffer - Buffer dari screenshot
     * @param publicId - Nama file di Cloudinary (gunakan project slug)
     */
    export async function uploadToCloudinary(
    imageBuffer: Buffer,
    publicId: string
    ): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
        {
            folder: "surfing-whale/projects",
            public_id: publicId,
            overwrite: true,
            transformation: [
            { width: 1200, height: 630, crop: "fill", gravity: "north" },
            { quality: "auto:good", fetch_format: "auto" },
            ],
        },
        (error, result) => {
            if (error || !result) {
            reject(error ?? new Error("Upload failed"));
            } else {
            resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
            });
            }
        }
        );
        uploadStream.end(imageBuffer);
    });
    }

    /**
     * Delete image dari Cloudinary by public_id
     */
    export async function deleteFromCloudinary(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
    }
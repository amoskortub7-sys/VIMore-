'use server';

import { storage, ID } from '@/lib/appwrite';

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;

if (!BUCKET_ID) {
    console.warn("Appwrite bucket ID (NEXT_PUBLIC_APPWRITE_BUCKET_ID) is not set. File uploads will fail.");
}

export async function uploadFile(file: File): Promise<string> {
    if (!BUCKET_ID) {
        throw new Error("Appwrite bucket ID is not set in environment variables.");
    }

    try {
        const uploadedFile = await storage.createFile(
            BUCKET_ID,
            ID.unique(),
            file
        );

        // Get the public URL for the file
        const fileUrl = storage.getFileView(BUCKET_ID, uploadedFile.$id);

        return fileUrl.href;

    } catch (error) {
        console.error("Appwrite file upload failed:", error);
        throw new Error("Failed to upload file.");
    }
}

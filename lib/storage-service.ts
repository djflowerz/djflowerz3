import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { storage } from './firebase';

export const storageService = {
    // Upload a file to Firebase Storage
    async uploadFile(
        file: File,
        path: string,
        onProgress?: (progress: number) => void
    ): Promise<string> {
        try {
            const storageRef = ref(storage, path);

            // Upload file
            const snapshot = await uploadBytes(storageRef, file);

            // Get download URL
            const downloadURL = await getDownloadURL(snapshot.ref);

            return downloadURL;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    },

    // Upload product cover image
    async uploadProductCover(file: File, productId: string): Promise<string> {
        const path = `covers/products/${productId}`;
        return this.uploadFile(file, path);
    },

    // Upload mixtape cover image
    async uploadMixtapeCover(file: File, mixtapeId: string): Promise<string> {
        const path = `covers/mixtapes/${mixtapeId}`;
        return this.uploadFile(file, path);
    },

    // Upload music pool track cover
    async uploadTrackCover(file: File, trackId: string): Promise<string> {
        const path = `covers/music_pool/${trackId}`;
        return this.uploadFile(file, path);
    },

    // Upload mixtape audio file
    async uploadMixtapeAudio(file: File, mixtapeId: string): Promise<string> {
        const path = `mixtapes/${mixtapeId}/${file.name}`;
        return this.uploadFile(file, path);
    },

    // Upload music pool track audio
    async uploadTrackAudio(file: File, trackId: string): Promise<string> {
        const path = `music_pool/${trackId}/${file.name}`;
        return this.uploadFile(file, path);
    },

    // Upload user profile picture
    async uploadUserAvatar(file: File, userId: string): Promise<string> {
        const path = `user_uploads/${userId}/avatar`;
        return this.uploadFile(file, path);
    },

    // Get download URL for a file
    async getDownloadURL(path: string): Promise<string> {
        try {
            const storageRef = ref(storage, path);
            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error('Error getting download URL:', error);
            throw error;
        }
    },

    // Delete a file
    async deleteFile(path: string): Promise<void> {
        try {
            const storageRef = ref(storage, path);
            await deleteObject(storageRef);
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    },

    // List all files in a directory
    async listFiles(path: string): Promise<string[]> {
        try {
            const storageRef = ref(storage, path);
            const result = await listAll(storageRef);

            const urls = await Promise.all(
                result.items.map(item => getDownloadURL(item))
            );

            return urls;
        } catch (error) {
            console.error('Error listing files:', error);
            throw error;
        }
    }
};

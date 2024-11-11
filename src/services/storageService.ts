import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

export const storageService = {
  async uploadImage(file: File, path: string): Promise<string> {
    try {
      // Create storage reference
      const storageRef = ref(storage, path);
      
      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  },

  async uploadProfilePhoto(userId: string, file: File): Promise<string> {
    const path = `profiles/${userId}/${file.name}`;
    return this.uploadImage(file, path);
  },

  async uploadCACPhoto(userId: string, cacId: string, file: File): Promise<string> {
    const path = `cacs/${userId}/${cacId}/${file.name}`;
    return this.uploadImage(file, path);
  }
};
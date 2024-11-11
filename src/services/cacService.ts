import { 
  collection, doc, getDoc, setDoc, getDocs, 
  query, where, deleteDoc, updateDoc 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { CAC } from '../types/cac';

export const cacService = {
  async checkNameAvailability(name: string): Promise<boolean> {
    const cacsRef = collection(db, 'cacs');
    const q = query(cacsRef, where('name', '==', name));
    const snapshot = await getDocs(q);
    return snapshot.empty;
  },

  async createCAC(cac: Omit<CAC, 'id'>): Promise<string> {
    const cacsRef = collection(db, 'cacs');
    const newCacRef = doc(cacsRef);
    await setDoc(newCacRef, {
      ...cac,
      createdAt: Date.now()
    });
    return newCacRef.id;
  },

  async getUserCACs(userId: string): Promise<CAC[]> {
    const cacsRef = collection(db, 'cacs');
    const q = query(cacsRef, where('createdBy', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CAC[];
  },

  async getPublicCACs(): Promise<CAC[]> {
    const cacsRef = collection(db, 'cacs');
    const q = query(cacsRef, where('isPublic', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CAC[];
  },

  async deleteCAC(cacId: string): Promise<void> {
    await deleteDoc(doc(db, 'cacs', cacId));
  },

  async updateCAC(cacId: string, data: Partial<CAC>): Promise<void> {
    await updateDoc(doc(db, 'cacs', cacId), data);
  }
};
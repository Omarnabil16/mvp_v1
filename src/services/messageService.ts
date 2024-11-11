import {
  collection,
  doc,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Message } from '../types/cac';

export const messageService = {
  async saveMessage(userId: string, cacId: string, message: Omit<Message, 'id'>): Promise<string> {
    const messagesRef = collection(db, 'users', userId, 'cacs', cacId, 'messages');
    const docRef = await addDoc(messagesRef, {
      ...message,
      timestamp: Date.now()
    });
    return docRef.id;
  },

  async getMessages(userId: string, cacId: string, limit: number = 50): Promise<Message[]> {
    const messagesRef = collection(db, 'users', userId, 'cacs', cacId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(limit));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Message[];
  }
};
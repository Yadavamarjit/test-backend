import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { db } from '../config/firebase';
import { logger } from '../config/logger';

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    const doc = await db.collection('users').doc(uid!).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(doc.data());
  } catch (error: any) {
    logger.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    const updateData = req.body;
    await db.collection('users').doc(uid!).set(updateData, { merge: true });
    res.json({ message: 'Profile updated successfully', ...updateData });
  } catch (error: any) {
    logger.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

export const getSyllabusProgress = async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    const doc = await db.collection('users').doc(uid!).collection('config').doc('syllabus_progress').get();
    if (!doc.exists) {
      return res.json({ completedChapters: [] });
    }
    res.json(doc.data());
  } catch (error) {
    logger.error('Error fetching syllabus progress:', error);
    res.status(500).json({ message: 'Failed to fetch syllabus progress' });
  }
};

export const toggleChapter = async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    const { chapterName } = req.body;
    const docRef = db.collection('users').doc(uid!).collection('config').doc('syllabus_progress');
    const doc = await docRef.get();
    
    let completedChapters: string[] = [];
    if (doc.exists) {
      completedChapters = doc.data()?.completedChapters || [];
    }

    if (completedChapters.includes(chapterName)) {
      completedChapters = completedChapters.filter(c => c !== chapterName);
    } else {
      completedChapters.push(chapterName);
    }

    await docRef.set({ completedChapters }, { merge: true });
    res.json({ completedChapters });
  } catch (error) {
    logger.error('Error toggling chapter:', error);
    res.status(500).json({ message: 'Failed to toggle chapter' });
  }
};

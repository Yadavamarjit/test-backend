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
  } catch (error) {
    logger.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    const updateData = req.body;
    await db.collection('users').doc(uid!).set(updateData, { merge: true });
    res.json({ message: 'Profile updated successfully', ...updateData });
  } catch (error) {
    logger.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

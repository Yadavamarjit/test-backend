import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { db } from '../config/firebase';
import { logger } from '../config/logger';

export const getEvents = async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    const snapshot = await db.collection('users').doc(uid!).collection('events').get();
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(events);
  } catch (error) {
    logger.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    const eventData = req.body;
    const docRef = await db.collection('users').doc(uid!).collection('events').add({
      ...eventData,
      userId: uid,
      createdAt: new Date().getTime()
    });
    res.status(201).json({ id: docRef.id, ...eventData });
  } catch (error) {
    logger.error('Error creating event:', error);
    res.status(500).json({ message: 'Failed to create event' });
  }
};

export const updateEvent = async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    const { id } = req.params;
    const updateData = req.body;
    await db.collection('users').doc(uid!).collection('events').doc(id).update(updateData);
    res.json({ id, ...updateData });
  } catch (error) {
    logger.error('Error updating event:', error);
    res.status(500).json({ message: 'Failed to update event' });
  }
};

export const deleteEvent = async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    const { id } = req.params;
    await db.collection('users').doc(uid!).collection('events').doc(id).delete();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    logger.error('Error deleting event:', error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
};

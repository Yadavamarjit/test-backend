import { Router } from 'express';
import { getProfile, updateProfile, getSyllabusProgress, toggleChapter } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/syllabus', getSyllabusProgress);
router.post('/syllabus/toggle', toggleChapter);

export default router;

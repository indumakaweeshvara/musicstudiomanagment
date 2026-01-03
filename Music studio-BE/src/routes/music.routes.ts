import express from 'express';
import { upload } from '../middleware/upload.middleware';
import {
  uploadMusic,
  getAllMusic,
  searchMusic,
  incrementView,
  updateMusic,
  deleteMusic
} from '../controllers/music.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = express.Router();

// 1. සින්දු ඔක්කොම ගන්න
router.get('/', getAllMusic);

// 2. සින්දු Search කරන්න
router.get('/search', searchMusic);

// 3. Views වැඩි කරන්න
router.put('/:id/view', incrementView);


// --- Protected Routes (Admin විතරයි) ---

// 4. සින්දු Upload කරන්න
router.post('/upload', protect, admin, upload.single('file'), uploadMusic);

// 5. සින්දු Update කරන්න (NEW)
router.put('/:id', protect, admin, upload.single('thumbnail'), updateMusic);

// 6. සින්දු Delete කරන්න (NEW)
router.delete('/:id', protect, admin, deleteMusic);

export default router;
import express from 'express';
import {
    getDashboardStats,
    getAllMusic,
    deleteMusic,
    getAllContacts,
    deleteContact,
    getAnalytics
} from '../controllers/admin.controller';

const router = express.Router();


router.get('/stats', getDashboardStats);


router.get('/music', getAllMusic);
router.delete('/music/:id', deleteMusic);


router.get('/contacts', getAllContacts);
router.delete('/contacts/:id', deleteContact);

router.get('/analytics', getAnalytics);

export default router;

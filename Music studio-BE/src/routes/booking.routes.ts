import express from 'express';
import {
    createBooking,
    getAllBookings,
    getBookingById,
    approveBooking,
    rejectBooking,
    updateBooking,
    deleteBooking,
    getBookingStats
} from '../controllers/booking.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', createBooking);


router.get('/', protect, admin, getAllBookings);
router.get('/stats', protect, admin, getBookingStats);
router.get('/:id', protect, admin, getBookingById);
router.put('/:id/approve', protect, admin, approveBooking);
router.put('/:id/reject', protect, admin, rejectBooking);
router.put('/:id', protect, admin, updateBooking);
router.delete('/:id', protect, admin, deleteBooking);

export default router;

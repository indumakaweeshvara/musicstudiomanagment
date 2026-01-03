import express from 'express';
import {
    getAllTestimonials,
    getAllTestimonialsAdmin,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
} from '../controllers/testimonial.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = express.Router();


router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);

router.get('/admin/all', protect, admin, getAllTestimonialsAdmin);
router.post('/', protect, admin, createTestimonial);
router.put('/:id', protect, admin, updateTestimonial);
router.delete('/:id', protect, admin, deleteTestimonial);

export default router;

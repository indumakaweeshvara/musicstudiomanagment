import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial';

// Get all approved testimonials (public)
export const getAllTestimonials = async (req: Request, res: Response) => {
    try {
        const { featured } = req.query;

        const filter: any = { approved: true };
        if (featured === 'true') filter.featured = true;

        const testimonials = await Testimonial.find(filter)
            .sort({ featured: -1, rating: -1, date: -1 });

        res.json(testimonials);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
    }
};

// Get all testimonials including unapproved (admin only)
export const getAllTestimonialsAdmin = async (req: Request, res: Response) => {
    try {
        const testimonials = await Testimonial.find()
            .sort({ createdAt: -1 });

        res.json(testimonials);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
    }
};

// Get single testimonial
export const getTestimonialById = async (req: Request, res: Response) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json(testimonial);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching testimonial', error: error.message });
    }
};

// Create testimonial (admin only)
export const createTestimonial = async (req: Request, res: Response) => {
    try {
        const { clientName, photo, review, rating, service, featured, approved } = req.body;

        if (!clientName || !review || !rating) {
            return res.status(400).json({ message: 'Client name, review, and rating are required' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const newTestimonial = new Testimonial({
            clientName,
            photo: photo || '',
            review,
            rating,
            service: service || '',
            featured: featured || false,
            approved: approved !== undefined ? approved : true
        });

        const savedTestimonial = await newTestimonial.save();
        res.status(201).json({
            message: 'Testimonial created successfully',
            testimonial: savedTestimonial
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating testimonial', error: error.message });
    }
};

// Update testimonial (admin only)
export const updateTestimonial = async (req: Request, res: Response) => {
    try {
        const { clientName, photo, review, rating, service, featured, approved } = req.body;

        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        if (clientName) testimonial.clientName = clientName;
        if (photo !== undefined) testimonial.photo = photo;
        if (review) testimonial.review = review;
        if (rating !== undefined) {
            if (rating < 1 || rating > 5) {
                return res.status(400).json({ message: 'Rating must be between 1 and 5' });
            }
            testimonial.rating = rating;
        }
        if (service !== undefined) testimonial.service = service;
        if (featured !== undefined) testimonial.featured = featured;
        if (approved !== undefined) testimonial.approved = approved;

        const updatedTestimonial = await testimonial.save();
        res.json({
            message: 'Testimonial updated successfully',
            testimonial: updatedTestimonial
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating testimonial', error: error.message });
    }
};

// Delete testimonial (admin only)
export const deleteTestimonial = async (req: Request, res: Response) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting testimonial', error: error.message });
    }
};

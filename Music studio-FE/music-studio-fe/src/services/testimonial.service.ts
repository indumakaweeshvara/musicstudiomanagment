import api from './api';

export interface ITestimonial {
    _id: string;
    clientName: string;
    photo: string;
    review: string;
    rating: number;
    service: string;
    date: string;
    featured: boolean;
    approved: boolean;
    createdAt: string;
    updatedAt: string;
}

export const getAllTestimonials = async (): Promise<ITestimonial[]> => {
    try {
        const response = await api.get('/testimonials');
        return response.data;
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
    }
};

export const getFeaturedTestimonials = async (): Promise<ITestimonial[]> => {
    try {
        const response = await api.get('/testimonials?featured=true');
        return response.data;
    } catch (error) {
        console.error('Error fetching featured testimonials:', error);
        throw error;
    }
};

export const getAllTestimonialsAdmin = async (): Promise<ITestimonial[]> => {
    try {
        const response = await api.get('/testimonials/admin/all');
        return response.data;
    } catch (error) {
        console.error('Error fetching all testimonials:', error);
        throw error;
    }
};

export const createTestimonial = async (testimonialData: Partial<ITestimonial>): Promise<{ message: string; testimonial: ITestimonial }> => {
    try {
        const response = await api.post('/testimonials', testimonialData);
        return response.data;
    } catch (error) {
        console.error('Error creating testimonial:', error);
        throw error;
    }
};

export const updateTestimonial = async (id: string, testimonialData: Partial<ITestimonial>): Promise<{ message: string; testimonial: ITestimonial }> => {
    try {
        const response = await api.put(`/testimonials/${id}`, testimonialData);
        return response.data;
    } catch (error) {
        console.error('Error updating testimonial:', error);
        throw error;
    }
};

export const deleteTestimonial = async (id: string): Promise<{ message: string }> => {
    try {
        const response = await api.delete(`/testimonials/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        throw error;
    }
};

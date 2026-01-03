import api from './api';

export interface IBooking {
    _id: string;
    clientName: string;
    email: string;
    phone: string;
    date: string;
    timeSlot: string;
    packageId?: string;
    packageName?: string;
    service?: string;
    message: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    respondedAt?: string;
    adminNotes: string;
}

export interface BookingStats {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
}


export const createBooking = async (bookingData: Partial<IBooking>): Promise<{ message: string; booking: IBooking }> => {
    try {
        const response = await api.post('/bookings', bookingData);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};


export const getAllBookings = async (status?: string): Promise<IBooking[]> => {
    try {
        const url = status ? `/bookings?status=${status}` : '/bookings';
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
};

export const getBookingStats = async (): Promise<BookingStats> => {
    try {
        const response = await api.get('/bookings/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching booking stats:', error);
        throw error;
    }
};


export const approveBooking = async (id: string, adminNotes?: string): Promise<{ message: string; booking: IBooking }> => {
    try {
        const response = await api.put(`/bookings/${id}/approve`, { adminNotes });
        return response.data;
    } catch (error) {
        console.error('Error approving booking:', error);
        throw error;
    }
};


export const rejectBooking = async (id: string, adminNotes?: string): Promise<{ message: string; booking: IBooking }> => {
    try {
        const response = await api.put(`/bookings/${id}/reject`, { adminNotes });
        return response.data;
    } catch (error) {
        console.error('Error rejecting booking:', error);
        throw error;
    }
};


export const updateBooking = async (id: string, bookingData: Partial<IBooking>): Promise<{ message: string; booking: IBooking }> => {
    try {
        const response = await api.put(`/bookings/${id}`, bookingData);
        return response.data;
    } catch (error) {
        console.error('Error updating booking:', error);
        throw error;
    }
};


export const deleteBooking = async (id: string): Promise<{ message: string }> => {
    try {
        const response = await api.delete(`/bookings/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting booking:', error);
        throw error;
    }
};

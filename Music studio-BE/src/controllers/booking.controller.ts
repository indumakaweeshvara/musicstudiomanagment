import { Request, Response } from 'express';
import Booking from '../models/Booking';

export const createBooking = async (req: Request, res: Response) => {
    try {
        const { clientName, email, phone, date, timeSlot, packageId, packageName, service, message } = req.body;

        // Validation
        if (!clientName || !email || !phone || !date || !timeSlot) {
            return res.status(400).json({
                message: 'Please provide all required fields: name, email, phone, date, and time'
            });
        }

        // Require either packageId or service
        if (!packageId && !service) {
            return res.status(400).json({
                message: 'Please select a package or specify a service'
            });
        }

        // Check if date is in the future
        const bookingDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (bookingDate < today) {
            return res.status(400).json({ message: 'Booking date must be in the future' });
        }

        const newBooking = new Booking({
            clientName,
            email,
            phone,
            date: bookingDate,
            timeSlot,
            packageId: packageId || undefined,
            packageName: packageName || undefined,
            service: service || undefined,
            message: message || '',
            status: 'pending'
        });

        const savedBooking = await newBooking.save();

        res.status(201).json({
            message: 'Booking request submitted successfully! We will contact you soon.',
            booking: savedBooking
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// Get all bookings (admin only)
export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const { status } = req.query;

        const filter: any = {};
        if (status) filter.status = status;

        const bookings = await Booking.find(filter).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};

// Get single booking
export const getBookingById = async (req: Request, res: Response) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching booking', error: error.message });
    }
};

// Approve booking (admin only)
export const approveBooking = async (req: Request, res: Response) => {
    try {
        const { adminNotes } = req.body;

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = 'approved';
        booking.respondedAt = new Date();
        if (adminNotes) booking.adminNotes = adminNotes;

        const updatedBooking = await booking.save();
        res.json({
            message: 'Booking approved successfully',
            booking: updatedBooking
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error approving booking', error: error.message });
    }
};

// Reject booking (admin only)
export const rejectBooking = async (req: Request, res: Response) => {
    try {
        const { adminNotes } = req.body;

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = 'rejected';
        booking.respondedAt = new Date();
        if (adminNotes) booking.adminNotes = adminNotes;

        const updatedBooking = await booking.save();
        res.json({
            message: 'Booking rejected',
            booking: updatedBooking
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error rejecting booking', error: error.message });
    }
};

// Update booking (admin only)
export const updateBooking = async (req: Request, res: Response) => {
    try {
        const { clientName, email, phone, date, timeSlot, service, message, status, adminNotes } = req.body;

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (clientName) booking.clientName = clientName;
        if (email) booking.email = email;
        if (phone) booking.phone = phone;
        if (date) booking.date = new Date(date);
        if (timeSlot) booking.timeSlot = timeSlot;
        if (service) booking.service = service;
        if (message !== undefined) booking.message = message;
        if (status) booking.status = status;
        if (adminNotes !== undefined) booking.adminNotes = adminNotes;

        const updatedBooking = await booking.save();
        res.json({
            message: 'Booking updated successfully',
            booking: updatedBooking
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
};

// Delete booking (admin only)
export const deleteBooking = async (req: Request, res: Response) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
};

// Get booking statistics (admin only)
export const getBookingStats = async (req: Request, res: Response) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const pendingBookings = await Booking.countDocuments({ status: 'pending' });
        const approvedBookings = await Booking.countDocuments({ status: 'approved' });
        const rejectedBookings = await Booking.countDocuments({ status: 'rejected' });

        res.json({
            total: totalBookings,
            pending: pendingBookings,
            approved: approvedBookings,
            rejected: rejectedBookings
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching booking stats', error: error.message });
    }
};

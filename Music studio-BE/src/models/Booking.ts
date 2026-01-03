import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    clientName: string;
    email: string;
    phone: string;
    date: Date;
    timeSlot: string;
    packageId?: string;
    packageName?: string;
    service?: string;
    message: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    respondedAt?: Date;
    adminNotes: string;
}

const BookingSchema: Schema = new Schema({
    clientName: {
        type: String,
        required: [true, 'Client name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Booking date is required']
    },
    timeSlot: {
        type: String,
        required: [true, 'Time slot is required'],
        trim: true
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    },
    packageName: {
        type: String,
        trim: true
    },
    service: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    respondedAt: {
        type: Date
    },
    adminNotes: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    timestamps: true
});

// Index for faster queries
BookingSchema.index({ status: 1, date: -1 });
BookingSchema.index({ email: 1 });

export default mongoose.model<IBooking>('Booking', BookingSchema);

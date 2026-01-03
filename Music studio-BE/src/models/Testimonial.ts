import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
    clientName: string;
    photo: string;
    review: string;
    rating: number;
    service: string;
    date: Date;
    featured: boolean;
    approved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema({
    clientName: {
        type: String,
        required: [true, 'Client name is required'],
        trim: true
    },
    photo: {
        type: String,
        default: ''
    },
    review: {
        type: String,
        required: [true, 'Review text is required'],
        trim: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5']
    },
    service: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    featured: {
        type: Boolean,
        default: false
    },
    approved: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster queries
TestimonialSchema.index({ approved: 1, featured: -1, rating: -1 });

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

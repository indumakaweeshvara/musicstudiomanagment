import mongoose, { Schema, Document } from 'mongoose';

export interface IPackage extends Document {
    name: string;
    price: number;
    currency: string;
    duration: string;
    features: string[];
    category: string;
    featured: boolean;
    popular: boolean;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const PackageSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Package name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    currency: {
        type: String,
        default: 'LKR',
        enum: ['LKR', 'USD']
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
        trim: true
    },
    features: {
        type: [String],
        required: [true, 'At least one feature is required'],
        validate: {
            validator: (v: string[]) => v.length > 0,
            message: 'Package must have at least one feature'
        }
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Recording', 'Mixing', 'Mastering', 'Full Production', 'Other']
    },
    description: {
        type: String,
        trim: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    popular: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index for faster queries
PackageSchema.index({ category: 1, featured: -1 });

export default mongoose.model<IPackage>('Package', PackageSchema);

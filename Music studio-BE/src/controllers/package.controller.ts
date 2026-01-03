import { Request, Response } from 'express';
import Package from '../models/Package';

// Get all packages (public)
export const getAllPackages = async (req: Request, res: Response) => {
    try {
        const { category, featured, popular } = req.query;

        // Build filter
        const filter: any = {};
        if (category) filter.category = category;
        if (featured === 'true') filter.featured = true;
        if (popular === 'true') filter.popular = true;

        const packages = await Package.find(filter).sort({ featured: -1, popular: -1, price: 1 });
        res.json(packages);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching packages', error: error.message });
    }
};

// Get single package (public)
export const getPackageById = async (req: Request, res: Response) => {
    try {
        const package_ = await Package.findById(req.params.id);
        if (!package_) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json(package_);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching package', error: error.message });
    }
};

// Create new package (admin only)
export const createPackage = async (req: Request, res: Response) => {
    try {
        const { name, price, currency, duration, features, category, description, featured, popular } = req.body;

        // Validation
        if (!name || !price || !duration || !features || !category) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (!Array.isArray(features) || features.length === 0) {
            return res.status(400).json({ message: 'Features must be a non-empty array' });
        }

        const newPackage = new Package({
            name,
            price,
            currency: currency || 'LKR',
            duration,
            features,
            category,
            description,
            featured: featured || false,
            popular: popular || false
        });

        const savedPackage = await newPackage.save();
        res.status(201).json({
            message: 'Package created successfully',
            package: savedPackage
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating package', error: error.message });
    }
};

// Update package (admin only)
export const updatePackage = async (req: Request, res: Response) => {
    try {
        const { name, price, currency, duration, features, category, description, featured, popular } = req.body;

        const package_ = await Package.findById(req.params.id);
        if (!package_) {
            return res.status(404).json({ message: 'Package not found' });
        }

        // Update fields
        if (name) package_.name = name;
        if (price !== undefined) package_.price = price;
        if (currency) package_.currency = currency;
        if (duration) package_.duration = duration;
        if (features) package_.features = features;
        if (category) package_.category = category;
        if (description !== undefined) package_.description = description;
        if (featured !== undefined) package_.featured = featured;
        if (popular !== undefined) package_.popular = popular;

        const updatedPackage = await package_.save();
        res.json({
            message: 'Package updated successfully',
            package: updatedPackage
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating package', error: error.message });
    }
};

// Delete package (admin only)
export const deletePackage = async (req: Request, res: Response) => {
    try {
        const package_ = await Package.findByIdAndDelete(req.params.id);
        if (!package_) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json({ message: 'Package deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting package', error: error.message });
    }
};

// Get packages by category (public)
export const getPackagesByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params;
        const packages = await Package.find({ category }).sort({ featured: -1, price: 1 });
        res.json(packages);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching packages', error: error.message });
    }
};

import api from './api';

export interface IPackage {
    _id: string;
    name: string;
    price: number;
    currency: string;
    duration: string;
    features: string[];
    category: string;
    description?: string;
    featured: boolean;
    popular: boolean;
    createdAt: string;
    updatedAt: string;
}

export const getAllPackages = async (): Promise<IPackage[]> => {
    try {
        const response = await api.get('/packages');
        return response.data;
    } catch (error) {
        console.error('Error fetching packages:', error);
        throw error;
    }
};

export const getPackagesByCategory = async (category: string): Promise<IPackage[]> => {
    try {
        const response = await api.get(`/packages/category/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching packages by category:', error);
        throw error;
    }
};

export const getFeaturedPackages = async (): Promise<IPackage[]> => {
    try {
        const response = await api.get('/packages?featured=true');
        return response.data;
    } catch (error) {
        console.error('Error fetching featured packages:', error);
        throw error;
    }
};

export const getPackageById = async (id: string): Promise<IPackage> => {
    try {
        const response = await api.get(`/packages/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching package:', error);
        throw error;
    }
};

export const createPackage = async (packageData: Partial<IPackage>): Promise<{ message: string; package: IPackage }> => {
    try {
        const response = await api.post('/packages', packageData);
        return response.data;
    } catch (error) {
        console.error('Error creating package:', error);
        throw error;
    }
};

export const updatePackage = async (id: string, packageData: Partial<IPackage>): Promise<{ message: string; package: IPackage }> => {
    try {
        const response = await api.put(`/packages/${id}`, packageData);
        return response.data;
    } catch (error) {
        console.error('Error updating package:', error);
        throw error;
    }
};

export const deletePackage = async (id: string): Promise<{ message: string }> => {
    try {
        const response = await api.delete(`/packages/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting package:', error);
        throw error;
    }
};

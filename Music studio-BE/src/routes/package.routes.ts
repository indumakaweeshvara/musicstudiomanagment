import express from 'express';
import {
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage,
    getPackagesByCategory
} from '../controllers/package.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getAllPackages);
router.get('/category/:category', getPackagesByCategory);
router.get('/:id', getPackageById);

   
router.post('/', protect, admin, createPackage);
router.put('/:id', protect, admin, updatePackage);
router.delete('/:id', protect, admin, deletePackage);

export default router;

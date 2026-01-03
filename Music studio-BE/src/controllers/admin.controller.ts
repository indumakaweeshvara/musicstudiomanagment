import { Request, Response } from 'express';
import Music from '../models/music.model';
import Contact from '../models/contact.model';

// Get Dashboard Statistics
export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        // Count total music by category
        const totalAudios = await Music.countDocuments({ category: 'audio' });
        const totalVideos = await Music.countDocuments({ category: 'video' });
        const totalSongs = totalAudios + totalVideos;

        // Calculate total views
        const musics = await Music.find();
        const totalViews = musics.reduce((sum, music) => sum + (music.views || 0), 0);

        // Count new inquiries (unread messages)
        const newInquiries = await Contact.countDocuments();

        // Get recent music uploads (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentUploads = await Music.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        res.json({
            totalSongs,
            totalAudios,
            totalVideos,
            totalViews,
            newInquiries,
            recentUploads
        });

    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard statistics' });
    }
};

// Get All Music (for management table)
export const getAllMusic = async (req: Request, res: Response) => {
    try {
        const musics = await Music.find().sort({ createdAt: -1 });
        res.json(musics);
    } catch (error) {
        console.error('Error fetching music:', error);
        res.status(500).json({ message: 'Failed to fetch music' });
    }
};

// Delete Music
export const deleteMusic = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Music.findByIdAndDelete(id);
        res.json({ message: 'Music deleted successfully' });
    } catch (error) {
        console.error('Error deleting music:', error);
        res.status(500).json({ message: 'Failed to delete music' });
    }
};

// Get All Contact Messages
export const getAllContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Failed to fetch contacts' });
    }
};

// Delete Contact Message
export const deleteContact = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Failed to delete contact' });
    }
};

// Get Analytics Data (Views over time)
export const getAnalytics = async (req: Request, res: Response) => {
    try {
        const musics = await Music.find().select('title views category createdAt').sort({ views: -1 }).limit(10);

        // Group by category
        const categoryStats = await Music.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    totalViews: { $sum: '$views' }
                }
            }
        ]);

        res.json({
            topMusic: musics,
            categoryStats
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ message: 'Failed to fetch analytics' });
    }
};

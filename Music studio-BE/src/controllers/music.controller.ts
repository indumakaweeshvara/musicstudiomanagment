import { Request, Response } from 'express';
import Music from '../models/music.model';

// --- 1. Upload Music ---
export const uploadMusic = async (req: Request, res: Response) => {
  try {
    const { title, description, category, artist } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create file URL for local storage
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const newMusic = new Music({
      title,
      description,
      category,
      artist: artist || 'Admin',
      fileUrl: fileUrl,
      thumbnailUrl: '', // Will be added separately if needed
      views: 0
    });

    await newMusic.save();
    res.status(201).json({ message: 'Music uploaded successfully', music: newMusic });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error });
  }
};

// --- 2. Get All Music ---
export const getAllMusic = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query = { category };
    }

    const musicList = await Music.find(query).sort({ createdAt: -1 });
    res.status(200).json(musicList);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch music', error });
  }
};

// --- 3. Search Music ---
export const searchMusic = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword as string;

    if (!keyword) {
      return res.status(400).json({ message: 'Keyword is required' });
    }

    const results = await Music.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { artist: { $regex: keyword, $options: 'i' } }
      ]
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error });
  }
};

// --- 4. Increment View Count ---
export const incrementView = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const music = await Music.findById(id);
    if (!music) {
      return res.status(404).json({ message: 'Music not found' });
    }

    music.views = (music.views || 0) + 1;
    await music.save();

    res.status(200).json({ message: 'View counted', views: music.views });
  } catch (error) {
    res.status(500).json({ message: 'Error updating views', error });
  }
};

// --- 5. Update Music (NEW) ---
export const updateMusic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const music = await Music.findById(id);
    if (!music) {
      return res.status(404).json({ message: 'Music not found' });
    }

    // Update fields
    if (title) music.title = title;
    if (description) music.description = description;

    // If new thumbnail is uploaded
    if (req.file) {
      music.thumbnailUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    await music.save();
    res.status(200).json({ message: 'Music updated successfully', music });

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Update failed', error });
  }
};

// --- 6. Delete Music (NEW) ---
export const deleteMusic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const music = await Music.findById(id);
    if (!music) {
      return res.status(404).json({ message: 'Music not found' });
    }

    await Music.findByIdAndDelete(id);
    res.status(200).json({ message: 'Music deleted successfully' });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Delete failed', error });
  }
};
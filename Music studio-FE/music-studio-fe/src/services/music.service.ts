import api from './api';

export interface IMusic {
  _id: string;
  title: string;
  description: string;
  category: 'audio' | 'video';
  fileUrl: string;
  thumbnailUrl?: string;
  artist?: string;
  createdAt: string;
  views: number;
}

export const fetchAllMusic = async (): Promise<IMusic[]> => {
  try {
    const response = await api.get('/music');
    return response.data;
  } catch (error) {
    console.error("Error fetching all music:", error);
    return [];
  }
};

export const fetchVideos = async (): Promise<IMusic[]> => {
  try {
    const response = await api.get('/music?category=video');
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

export const fetchAudios = async (): Promise<IMusic[]> => {
  try {
    const response = await api.get('/music?category=audio');
    return response.data;
  } catch (error) {
    console.error("Error fetching audios:", error);
    return [];
  }
};

export const searchMusic = async (keyword: string): Promise<IMusic[]> => {
  try {
    const response = await api.get(`/music/search?keyword=${keyword}`);
    return response.data;
  } catch (error) {
    console.error("Error searching music:", error);
    return [];
  }
};

export const incrementView = async (id: string): Promise<any> => {
  try {
    const response = await api.put(`/music/${id}/view`);
    return response.data;
  } catch (error) {
    console.error("Error incrementing view:", error);
    throw error;
  }
};

// Admin functions
export const uploadMusic = async (formData: FormData): Promise<any> => {
  try {
    const response = await api.post('/music/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading music:", error);
    throw error;
  }
};

export const updateMusic = async (id: string, formData: FormData): Promise<any> => {
  try {
    const response = await api.put(`/music/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating music:", error);
    throw error;
  }
};

export const deleteMusic = async (id: string): Promise<any> => {
  try {
    const response = await api.delete(`/music/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting music:", error);
    throw error;
  }
};
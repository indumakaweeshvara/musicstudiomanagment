import mongoose, { Schema, Document } from 'mongoose';

export interface IMusic extends Document {
  title: string;
  description: string;
  category: 'audio' | 'video';
  fileUrl: string;
  thumbnailUrl?: string;
  artist: string;
  views: number;
  createdAt: Date;
}

const MusicSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['audio', 'video'], required: true },
  fileUrl: { type: String, required: true },
  thumbnailUrl: { type: String, default: '' },
  artist: { type: String, default: 'Admin' },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMusic>('Music', MusicSchema);
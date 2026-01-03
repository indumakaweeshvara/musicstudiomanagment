import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';


import connectDB from './config/db';
import musicRoutes from './routes/music.routes';
import contactRoutes from './routes/contact.routes';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import packageRoutes from './routes/package.routes';
import testimonialRoutes from './routes/testimonial.routes';
import bookingRoutes from './routes/booking.routes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

connectDB();


app.get('/', (req: Request, res: Response) => {
  res.send('Music Studio API Running!');
});


app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});

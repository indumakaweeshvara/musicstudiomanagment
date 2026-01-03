import { Request, Response } from 'express';
import Contact from '../models/contact.model';
// වැදගත්: '../utils/email' කියන path එකේ email.ts ෆයිල් එක තියෙන්නම ඕන.
import { sendEmail } from '../utils/email';

// 1. Submit Contact Form
export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message, service } = req.body;

    // A. Database එකට Save කිරීම
    const newContact = new Contact({
      name,
      email,
      message,
      service: service || 'General Inquiry',
    });

    await newContact.save();

    // B. Email එක යැවීම (Nodemailer) 📧
    const subject = `New Inquiry from ${name}`;

    const emailContent = `
      Name: ${name}
      Email: ${email}
      Service: ${service || 'Not specified'}
      
      Message:
      ${message}
    `;


    await sendEmail(subject, emailContent);

    res.status(201).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ message: 'Failed to send message', error });
  }
};

// 2. Get All Messages (Admin සඳහා)
export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};
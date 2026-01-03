import api from './api';


export interface IContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface IContact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}


export const submitContactForm = async (formData: IContactFormData) => {
  try {
    const response = await api.post('/contact/submit', formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);

    throw error;
  }
};

export const getAllContacts = async () => {
  try {
    const response = await api.get('/contact/messages');
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};
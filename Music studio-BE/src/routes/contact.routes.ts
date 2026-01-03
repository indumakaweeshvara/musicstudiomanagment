import { Router } from 'express';
import { submitContact, getAllMessages } from '../controllers/contact.controller';

const router = Router();
 
router.post('/', submitContact);


router.get('/messages', getAllMessages);

export default router;
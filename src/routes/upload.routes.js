import express from 'express';
import { uploadDocumentToDrive } from '../controllers/upload.controller.js';

const router = express.Router();

router.post('/upload', uploadDocumentToDrive);

export default router;

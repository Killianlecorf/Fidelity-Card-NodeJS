import { authenticateUser } from '../middlewares/auth.middleware';
import { requireAuth } from '../middlewares/requireAuth.middleware';
import { corsMiddleware } from '../middlewares/credentials.middleware';
import { sanitizeMiddleware }  from '../middlewares/sanitize.middleware';
import { antivirusMiddleware }  from '../middlewares/antivirus.middleware';
import { uploadFile }  from '../controllers/upload.controller';
const express = require('express');
const router = express.Router();


router.post('/', corsMiddleware, requireAuth, authenticateUser, sanitizeMiddleware, antivirusMiddleware, uploadFile);

export default router;

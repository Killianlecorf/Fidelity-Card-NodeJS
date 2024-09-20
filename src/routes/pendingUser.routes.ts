import express from 'express';
import { corsMiddleware } from '../middlewares/credentials.middleware';
import { 
    registerUser,
} 
from '../controllers/pendingUser.controller';

const router = express.Router();

router.post('/verification/user',corsMiddleware, registerUser);

export default router;
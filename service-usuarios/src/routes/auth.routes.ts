import express from 'express';
import { register, login, logout, check } from '../controllers/auth.controllers';
import { protectRoute } from '../middlewares/auth.middlewares';
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check', protectRoute, check);
export default router;
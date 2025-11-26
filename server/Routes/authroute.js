import express from 'express';
import { signup } from "../controllers/authcontrollers.js";

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Export router as default
export default router;

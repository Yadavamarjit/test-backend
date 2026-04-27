import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/error';
import { logger } from './config/logger';
import eventRoutes from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined', { 
  stream: { write: (message) => logger.http(message.trim()) } 
}));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'SSC CPO Prep API is active',
    version: '1.0.0',
    status: 'Ready for Deployment'
  });
});

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

app.get('/api/welcome', (req, res) => {
  res.json({ message: 'Welcome to the SSC CPO Prep API' });
});

// Error handling
app.use(errorHandler);

export default app;

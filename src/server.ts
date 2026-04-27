import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config();

import app from './app';
import { logger } from './config/logger';
import './config/firebase';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

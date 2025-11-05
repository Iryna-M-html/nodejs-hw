// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';

import helmet from 'helmet';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errrorHandler.js';
import notesRoutes from './routes/notesRoutes';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello Node.js',
  });
});

app.use(notesRoutes);

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

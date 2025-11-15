// src/server.js
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';

import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { logger } from './middleware/logger.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());

app.use(logger);

app.get('/', (req, res) => {
  res.send('✅ API is running!');
});
app.use(notesRoutes);

app.use(notFoundHandler);

app.use(errorHandler);
app.use(errors());

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

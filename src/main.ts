import express from 'express';
import path from 'path';
import soundRoutes from './routes/sound.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';
import mixRoutes from './routes/mix.routes';
import uploadRoutes from './routes/upload.routes';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve static files (images, sounds, ...)
const publicDir = path.join(__dirname, '..', 'public');
app.use('/public', express.static(publicDir));

// Routes API
app.use('/api/sounds', soundRoutes);
app.use('/api/mix', mixRoutes);
app.use('/api/upload', uploadRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check or homepage
app.get('/', (req, res) => {
  res.send('✅ ChillRelax backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

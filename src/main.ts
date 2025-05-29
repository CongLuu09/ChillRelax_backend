import express from 'express';
import soundRoutes from './routes/sound.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';
import mixRoutes from './routes/mix.routes';
import uploadRoutes from './routes/upload.routes';



const app = express();
const PORT = 5000;
app.use(express.json());
app.use('/api/sounds', soundRoutes);
app.use('/api/mix', mixRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send('✅ ChillRelax backend is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

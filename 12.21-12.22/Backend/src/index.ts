import express from 'express';
import { errorMiddleware } from './middleware/errorHandler';
import cors from 'cors';
import patientsRouter from './routes/patientsRouter';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use('/patients', patientsRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
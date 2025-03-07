import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import { nanoid } from 'nanoid';

const app = express();
app.use(cors());
app.use(express.json());





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
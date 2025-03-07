import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import { nanoid } from 'nanoid';

const app = express();
app.use(cors());
app.use(express.json());



const swaggerOptions = {
    //параметры openapi 3.0
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'AImposter Game API',
        version: '1.0.0',
        description: 'API documentation for the AImposter Game',
      },
      //сервер разработки
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
    },
    apis: ['./server.js'],
  };
  //генерируется документация на основе аннотаций в коде
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  //чтобы показывать сгенерированную документацию
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
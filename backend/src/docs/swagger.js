// src/docs/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Mafia Game API',
      description: 'API для игры в мафию',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8080', // Здесь укажи адрес твоего локального сервера
      },
    ],
  },
  apis: ['./routes/*.js'],  // Путь к твоим маршрутам для генерации документации
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const swaggerSetup = (app) => {
  app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));  // Настроим UI для Swagger
};

module.exports = swaggerSetup;

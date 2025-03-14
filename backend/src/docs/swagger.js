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
        url: 'http://localhost:3000', // Здесь укажи адрес твоего локального сервера
      },
    ],
  },
  // apis: ['./src/routes/*.js'],  // Путь к твоим маршрутам для генерации документации
     apis: ['../routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const swaggerSetup = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  // Настроим UI для Swagger
};

module.exports = swaggerSetup;
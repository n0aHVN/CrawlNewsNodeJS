import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Crawl TuoiTre News API',
      version: '1.0.0',
    },
  },
  apis: [
    './src/routes/*.ts',      // Route files with JSDoc comments
    './src/dto/*.ts',    // DTO files with JSDoc comments
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;

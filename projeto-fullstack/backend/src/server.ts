import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`API disponível em http://localhost:${PORT}/api`);
  });
};

startServer();

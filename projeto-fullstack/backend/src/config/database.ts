import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/sneakers_db';
    await mongoose.connect(mongoUri);
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
};

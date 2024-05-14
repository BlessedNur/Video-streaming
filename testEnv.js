import dotenv from 'dotenv';

dotenv.config();

console.log("MONGO:", process.env.MONGO);
if (!process.env.MONGO) {
  throw new Error('MONGO environment variable is not set');
}

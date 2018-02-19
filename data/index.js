import mongoose from 'mongoose';
import { databaseConfig } from '../config';

export { default as Account } from './account';

export function connectDB() {
  const connection = databaseConfig.database;
  mongoose.connect(connection, (err, res) => {
    if (err) {
      console.log(`ERROR connecting to: ${connection}. ${err}`);
    } else {
      console.log(`Succeeded connected to: ${connection}`);
    }
  });
}


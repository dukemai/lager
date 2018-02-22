import mongoose from 'mongoose';
import { databaseConfig } from '../config';

export { default as Account } from './account';
export { default as Company } from './company';
export { default as Distributor } from './distributor';
export { default as Contact } from './contact';


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


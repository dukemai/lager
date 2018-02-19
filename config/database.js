import dotenv from 'dotenv';

dotenv.config();

const database = {
  secret: process.env.SECRET_KEY,
  database: process.env.DB_CONN_STRING,
};

export default database;

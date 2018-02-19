import dotenv from 'dotenv';

dotenv.config();

const domainPath = process.env.DOMAIN;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

export { domainPath, redisHost, redisPort };

export { default as databaseConfig } from './database';
export { default as configPassport, getToken } from './passport';

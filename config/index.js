import dotenv from 'dotenv';

dotenv.config();

const domainPath = process.env.DOMAIN;


export { domainPath };

export { default as databaseConfig } from './database';
export { default as configPassport, getToken } from './passport';

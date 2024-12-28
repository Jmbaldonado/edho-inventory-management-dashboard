import * as dotenv from 'dotenv';
dotenv.config();

const APP_PORT = +process.env.APP_PORT || 3000;
const APP_ENV = process.env.APP_ENV || 'development';
const APP_VERSION = process.env.APP_VERSION || '0.0.1';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = +process.env.DB_PORT || 5432;
const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
const DB_NAME = process.env.DB_NAME || 'postgres';
const DB_SYNC = process.env.DB_SYNC === 'true';

const CORS_ALLOWED_HEADERS =
    process.env.CORS_ALLOWED_HEADERS ||
    'Access-Control-Allow-Headers,Origin,X-Requested-With,Content-Type,Accept,Authorization';
const CORS_EXPOSED_HEADERS = process.env.CORS_EXPOSED_HEADERS || '';
const CORS_WHITELIST = process.env.CORS_WHITELIST || '';

export {
    APP_ENV,
    APP_PORT,
    APP_VERSION,
    CORS_ALLOWED_HEADERS,
    CORS_EXPOSED_HEADERS,
    CORS_WHITELIST,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_SYNC,
    DB_USERNAME,
};

import { DataSource } from 'typeorm';
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_SYNC,
    DB_USERNAME,
} from '../../config/environment';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [__dirname + '/entities/*.entity{.ts,.js}'],
    synchronize: DB_SYNC,
});

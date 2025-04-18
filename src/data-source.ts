import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { Movie } from "./entity/Movie";
import { Category } from "./entity/Category";
import { MovieCategory } from "./entity/MovieCategory";

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "gatauu123",
    database: process.env.DB_NAME || "movieindoxxi",
    synchronize: true,
    logging: false,
    entities: [Movie, Category, MovieCategory],
    migrations: [],
    subscribers: [],
    extra: {
        // MySQL 8 compatibility
        authPlugins: {
            mysql_native_password: () => require('mysql2/lib/auth/mysql_native_password')
        }
    }
}); 
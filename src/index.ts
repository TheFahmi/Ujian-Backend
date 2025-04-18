import "reflect-metadata";
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import { movieRouters, categoryRouters, MovCatRouters } from "./routers/index";

// Load environment variables
dotenv.config();

// Initialize TypeORM
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        startServer();
    })
    .catch((error) => console.log("Error during Data Source initialization", error));

function startServer() {
    const app = express();
    const port = process.env.PORT || 4000;

    // Middleware keamanan
    app.use(helmet()); // Melindungi header HTTP
    app.use(cors()); // Mengatur Cross-Origin Resource Sharing
    app.use(json()); // Parse request JSON

    // Rate limiting untuk mencegah DDoS
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 menit
        max: 100, // batas request per IP
        standardHeaders: true,
        legacyHeaders: false,
    });
    app.use(limiter);

    // Rute utama
    app.get("/", (_req: express.Request, res: express.Response) => {
        res.status(200).send("<h1>Welcome to API</h1>");
    });

    // API Routes
    app.use("/movie", movieRouters);
    app.use("/category", categoryRouters);
    app.use("/movcat", MovCatRouters);

    // Error handling
    app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        console.error(err.stack);
        res.status(500).send("Ada kesalahan pada server!");
    });

    // 404 handling
    app.use((_req: express.Request, res: express.Response) => {
        res.status(404).send("Halaman tidak ditemukan!");
    });

    // Jalankan server
    app.listen(port, () => console.log(`API aktif di port ${port}`));
} 
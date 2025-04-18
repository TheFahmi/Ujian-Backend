import { Request, Response } from 'express';

declare namespace Express {
    export interface Request {
        body: any;
        params: any;
        query: any;
    }
    export interface Response {
        status(code: number): Response;
        send(body: any): Response;
    }
}

declare module 'mysql2' {
    export interface Connection {
        query(sql: string, callback: (err: Error | null, results: any) => void): void;
        query(sql: string, values: any, callback: (err: Error | null, results: any) => void): void;
    }
} 
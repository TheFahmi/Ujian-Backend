import * as express from 'express';
import { AppDataSource } from '../data-source';
import { Movie } from '../entity/Movie';

type Request = express.Request;
type Response = express.Response;

// Get movie repository
const movieRepository = AppDataSource.getRepository(Movie);

// Fungsi validasi film
const validateMovie = (movie: Partial<Movie>): { valid: boolean; message?: string } => {
    if (!movie.nama) {
        return { valid: false, message: 'Nama film wajib diisi' };
    }
    
    if (!movie.tahun) {
        return { valid: false, message: 'Tahun film wajib diisi' };
    }
    
    // Validasi tahun berupa angka
    if (isNaN(Number(movie.tahun))) {
        return { valid: false, message: 'Tahun film harus berupa angka' };
    }
    
    return { valid: true };
};

export const getMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const nama = req.query.nama as string || '';
        const tahun = req.query.tahun ? req.query.tahun as string : '';
        
        let query = movieRepository.createQueryBuilder('movie');
        
        if (nama) {
            query = query.where('movie.nama LIKE :nama', { nama: `%${nama}%` });
        }
        
        if (tahun) {
            query = query.andWhere('movie.tahun LIKE :tahun', { tahun: `%${tahun}%` });
        }
        
        const movies = await query.getMany();
        res.status(200).send(movies);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data film');
    }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie = await movieRepository.findOne({ 
            where: { id: parseInt(req.params.id) }
        });
        
        if (!movie) {
            res.status(404).send('Film tidak ditemukan');
            return;
        }
        
        res.status(200).send(movie);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data film');
    }
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie = await movieRepository.findOne({ 
            where: { id: parseInt(req.params.id) }
        });
        
        if (!movie) {
            res.status(404).send('Film tidak ditemukan');
            return;
        }
        
        await movieRepository.remove(movie);
        res.status(200).send('Sukses Delete Movie');
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat menghapus film');
    }
};

export const addMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieData = req.body as Partial<Movie>;
        
        // Validasi data
        const validation = validateMovie(movieData);
        if (!validation.valid) {
            res.status(400).send(validation.message);
            return;
        }
        
        const movie = movieRepository.create(movieData);
        await movieRepository.save(movie);
        
        res.status(201).send('Sukses Add Movie');
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat menambahkan film');
    }
};

export const editMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const movieData = req.body as Partial<Movie>;
        
        // Validasi data
        const validation = validateMovie(movieData);
        if (!validation.valid) {
            res.status(400).send(validation.message);
            return;
        }
        
        const movie = await movieRepository.findOne({ 
            where: { id }
        });
        
        if (!movie) {
            res.status(404).send('Film tidak ditemukan');
            return;
        }
        
        movieRepository.merge(movie, movieData);
        await movieRepository.save(movie);
        
        res.status(200).send('Sukses Edit Movie');
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengedit film');
    }
};
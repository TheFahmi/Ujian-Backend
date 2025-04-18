import * as express from 'express';
import { AppDataSource } from '../data-source';
import { MovieCategory } from '../entity/MovieCategory';
import { Movie } from '../entity/Movie';
import { Category } from '../entity/Category';

type Request = express.Request;
type Response = express.Response;

// Get repository
const movCatRepository = AppDataSource.getRepository(MovieCategory);
const movieRepository = AppDataSource.getRepository(Movie);
const categoryRepository = AppDataSource.getRepository(Category);

// Fungsi validasi relasi film-kategori
const validateMovCat = async (movcat: Partial<MovieCategory>): Promise<{ valid: boolean; message?: string }> => {
    if (!movcat.movieId) {
        return { valid: false, message: 'ID film wajib diisi' };
    }
    
    if (!movcat.categoryId) {
        return { valid: false, message: 'ID kategori wajib diisi' };
    }
    
    // Validasi film ada
    const movie = await movieRepository.findOne({ where: { id: movcat.movieId } });
    if (!movie) {
        return { valid: false, message: 'Film dengan ID tersebut tidak ditemukan' };
    }
    
    // Validasi kategori ada
    const category = await categoryRepository.findOne({ where: { id: movcat.categoryId } });
    if (!category) {
        return { valid: false, message: 'Kategori dengan ID tersebut tidak ditemukan' };
    }
    
    return { valid: true };
};

export const getMovCat = async (req: Request, res: Response): Promise<void> => {
    try {
        const movCats = await movCatRepository
            .createQueryBuilder('movcat')
            .leftJoinAndSelect('movcat.movie', 'movie')
            .leftJoinAndSelect('movcat.category', 'category')
            .select([
                'movcat.id',
                'movie.nama as movie',
                'category.nama as category'
            ])
            .getRawMany();
        
        res.status(200).send(movCats);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data relasi film-kategori');
    }
};

export const getMovCatById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        
        const movCat = await movCatRepository
            .createQueryBuilder('movcat')
            .leftJoinAndSelect('movcat.movie', 'movie')
            .leftJoinAndSelect('movcat.category', 'category')
            .select([
                'movcat.id',
                'movie.nama as movie',
                'category.nama as category'
            ])
            .where('movcat.id = :id', { id })
            .getRawOne();
        
        if (!movCat) {
            res.status(404).send('Relasi film-kategori tidak ditemukan');
            return;
        }
        
        res.status(200).send(movCat);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data relasi film-kategori');
    }
};

export const deleteMovCat = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const movCat = await movCatRepository.findOne({ where: { id } });
        
        if (!movCat) {
            res.status(404).send('Relasi film-kategori tidak ditemukan');
            return;
        }
        
        await movCatRepository.remove(movCat);
        res.status(200).send('Sukses Delete MovCat');
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat menghapus relasi film-kategori');
    }
};

export const addMovCat = async (req: Request, res: Response): Promise<void> => {
    try {
        const movCatData = req.body as Partial<MovieCategory>;
        
        // Validasi data
        const validation = await validateMovCat(movCatData);
        if (!validation.valid) {
            res.status(400).send(validation.message);
            return;
        }
        
        const movCat = movCatRepository.create(movCatData);
        await movCatRepository.save(movCat);
        
        res.status(201).send('Sukses Add MovCat');
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat menambahkan relasi film-kategori');
    }
};

export const editMovCat = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const movCatData = req.body as Partial<MovieCategory>;
        
        // Validasi data
        const validation = await validateMovCat(movCatData);
        if (!validation.valid) {
            res.status(400).send(validation.message);
            return;
        }
        
        const movCat = await movCatRepository.findOne({ where: { id } });
        
        if (!movCat) {
            res.status(404).send('Relasi film-kategori tidak ditemukan');
            return;
        }
        
        movCatRepository.merge(movCat, movCatData);
        await movCatRepository.save(movCat);
        
        res.status(200).send('Sukses Edit MovCat');
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengedit relasi film-kategori');
    }
}; 
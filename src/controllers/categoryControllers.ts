import * as express from 'express';
import { AppDataSource } from '../data-source';
import { Category } from '../entity/Category';

type Request = express.Request;
type Response = express.Response;

// Get category repository
const categoryRepository = AppDataSource.getRepository(Category);

// Fungsi validasi kategori
const validateCategory = (category: Partial<Category>): { valid: boolean; message?: string } => {
    if (!category.nama) {
        return { valid: false, message: 'Nama kategori wajib diisi' };
    }
    
    return { valid: true };
};

export const getCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const nama = req.query.nama as string || '';
        
        let query = categoryRepository.createQueryBuilder('category');
        
        if (nama) {
            query = query.where('category.nama LIKE :nama', { nama: `%${nama}%` });
        }
        
        const categories = await query.getMany();
        res.status(200).send(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data kategori');
    }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await categoryRepository.findOne({ 
            where: { id: parseInt(req.params.id) }
        });
        
        if (!category) {
            res.status(404).send('Kategori tidak ditemukan');
            return;
        }
        
        res.status(200).send(category);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data kategori');
    }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await categoryRepository.findOne({ 
            where: { id: parseInt(req.params.id) }
        });
        
        if (!category) {
            res.status(404).send('Kategori tidak ditemukan');
            return;
        }
        
        await categoryRepository.remove(category);
        res.status(200).send('Sukses Delete Category');
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat menghapus kategori');
    }
};

export const addCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryData = req.body as Partial<Category>;
        
        // Validasi data
        const validation = validateCategory(categoryData);
        if (!validation.valid) {
            res.status(400).send(validation.message);
            return;
        }
        
        const category = categoryRepository.create(categoryData);
        await categoryRepository.save(category);
        
        res.status(201).send('Sukses Add Category');
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat menambahkan kategori');
    }
};

export const editCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const categoryData = req.body as Partial<Category>;
        
        // Validasi data
        const validation = validateCategory(categoryData);
        if (!validation.valid) {
            res.status(400).send(validation.message);
            return;
        }
        
        const category = await categoryRepository.findOne({ 
            where: { id }
        });
        
        if (!category) {
            res.status(404).send('Kategori tidak ditemukan');
            return;
        }
        
        categoryRepository.merge(category, categoryData);
        await categoryRepository.save(category);
        
        res.status(200).send('Sukses Edit Category');
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengedit kategori');
    }
}; 
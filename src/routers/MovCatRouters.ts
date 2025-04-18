import express from 'express';
import { MovCatControllers } from '../controllers/index';

const router = express.Router();

router.get('/getmovcats', MovCatControllers.getMovCat);
router.get('/getmovcats/:id', MovCatControllers.getMovCatById);
router.delete('/deletemovcat/:id', MovCatControllers.deleteMovCat);
router.post('/addmovcat', MovCatControllers.addMovCat);
router.put('/editmovcat/:id', MovCatControllers.editMovCat);

export default router; 
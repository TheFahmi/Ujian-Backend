import express from 'express';
import { movieControllers } from '../controllers/index';

const router = express.Router();

router.get('/getmovies', movieControllers.getMovie);
router.get('/getmovies/:id', movieControllers.getMovieById);
router.delete('/deletemovie/:id', movieControllers.deleteMovie);
router.post('/addmovie', movieControllers.addMovie);
router.put('/editmovie/:id', movieControllers.editMovie);

export default router; 
import express from 'express';
import { categoryControllers } from '../controllers/index';

const router = express.Router();

router.get('/getcategories', categoryControllers.getCategory);
router.get('/getcategories/:id', categoryControllers.getCategoryById);
router.delete('/deletecategory/:id', categoryControllers.deleteCategory);
router.post('/addcategory', categoryControllers.addCategory);
router.put('/editcategory/:id', categoryControllers.editCategory);

export default router; 
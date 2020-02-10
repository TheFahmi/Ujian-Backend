const express = require('express')
const { categoryControllers } = require('../controllers')

const router = express.Router()

router.get('/getcategory', categoryControllers.getCategory)
router.get('/getcategory/:id', categoryControllers.getCategoryById)
router.delete('/deletecategory/:id', categoryControllers.deleteCategory)
router.post('/addcategory', categoryControllers.addCategory)
router.put('/editcategory/:id', categoryControllers.editCategory)

module.exports = router
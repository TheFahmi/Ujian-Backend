const express = require('express')
const { MovCatControllers } = require('../controllers')

const router = express.Router()

router.get('/getmovcat', MovCatControllers.getMoveCat)
// router.get('/getmovcatbymovie', MovCatControllers.getMoveCatByMovie)
router.delete('/deletemovcat/:id', MovCatControllers.deleteMoveCat)
router.post('/addmovcat', MovCatControllers.addMoveCat)


module.exports = router
const express = require('express')
const { movieControllers } = require('../controllers')

const router = express.Router()

router.get('/getmovies', movieControllers.getMovie)
router.get('/getmovies/:id', movieControllers.getMovieById)
router.delete('/deletemovie/:id', movieControllers.deleteMovie)
router.post('/addmovie', movieControllers.addMovie)
router.put('/editmovie/:id', movieControllers.editMovie)

module.exports = router
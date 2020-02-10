// Import Database
const sqlDB = require('../connections/index');

module.exports = {
    getMoveCat: (req,res) => {
        var sql = `SELECT m.nama AS namaMovie, c.nama AS namaCategory FROM movcat mc
                    JOIN movies m ON mc.movieId = m.id
                    JOIN categories c ON mc.CategoryId = c.id;`
        
        sqlDB.query(sql, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).send(err)
                        
            }
    
            res.status(200).send(results)
        })
    },

    deleteMoveCat : (req,res) => {
         var sql = `DELETE FROM movcat 
                    WHERE id = ${req.params.id};`
        
        sqlDB.query(sql, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).send(err)
                        
            }
    
            res.status(200).send("Sukses Delete MovCat")
        })
    },

    addMoveCat : (req,res) => {
        var movcat = req.body
        
        if (movcat) {
            var sql = `INSERT INTO movcat SET ?;`
        
            sqlDB.query(sql, movcat, (err, results)=>{
                if(err) {
                    console.log(err);
                    return res.status(500).send(err)
                            
                }
        
                res.status(200).send("Sukses Add MovCat")
            })
    
        } else {
            res.status(500).send('Tolong isi body movieId dan CategoriesId')
        }
    }


}
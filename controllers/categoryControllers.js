// Import Database
const sqlDB = require('../connections/index');

module.exports = {
    getCategory : (req, res) => {
        var nama = req.query.nama ? req.query.nama : ''
    
        var sql = `SELECT * FROM categories WHERE nama LIKE '%${nama}%';`
        
        sqlDB.query(sql, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).send(err)
                        
            }
    
            res.status(200).send(results)
        })
    },

    getCategoryById : (req, res) => {
        var sql = `SELECT * FROM categories WHERE id = ${req.params.id};`
        
        sqlDB.query(sql, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).send(err)
                        
            }
    
            res.status(200).send(results)
        })
    },

    deleteCategory : (req, res) => {
        var sql = `DELETE FROM categories 
                    WHERE id = ${req.params.id};`
        
        
        sqlDB.query(sql, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).send(err)
                        
            }
    
            res.status(200).send("Sukses Delete Category")
        })
    },

    addCategory : (req, res) =>  {
        var addcategory = req.body
        console.log(addcategory)
    
        if (addcategory) {
            var sql = `INSERT INTO categories SET ?;`
        
            sqlDB.query(sql, addcategory, (err, results)=>{
                if(err) {
                    console.log(err);
                    return res.status(500).send(err)
                            
                }
        
                
                res.status(200).send("Sukses Add Category")
            })
    
        } else {
            res.status(500).send('Tolong isi body category')
        }
    },

    editCategory: (req,res) => {
        var updatecategory = req.body
        var sql = `UPDATE categories SET ?
                    WHERE id = ${req.params.id};`
    
        console.log(updatecategory);
        
        sqlDB.query(sql, updatecategory, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(500).send(err)
                        
            }
            
            
            res.status(200).send("Sukses Edit Category")
        })
    }
}
const router = require('express').Router()



router.get('/', (req, res) => {
    res.render('index.ejs',{
        title: 'Taller #1'
        
    })
})

module.exports = router
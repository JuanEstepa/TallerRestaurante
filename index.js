const express = require('express')

const app = express()

//SETTERS

app.set('views','./views')
app.set('view engine','ejs')
app.set('PORT', process.env.PORT || 3000)

//MIDDLEWARE

app.use("/",require('./routes/index'))

app.listen(app.get('PORT'),()=>console.log(`Server is listen at port: ${app.get('PORT')}`))
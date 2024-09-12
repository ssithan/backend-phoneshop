const express = require('express')
const cors = require('cors')
//bodyparser = require('body-parser')
    app = express()
    port = 3000
const db = require('./config/db')

const userRoutes = require('./controller/user.controller')
const categoryRoutes = require('./controller/category.controller')
const productRoutes = require('./controller/product.controller')

app.use(express.json()) // json body from client
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin:'*',
    methods: 'get, head, put, post, delete, patch', 
})) // cors origin
//testing update git by adding line

//app.use(bodyparser.json())
app.use('/api/users', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)

db.query('select 1')
    .then(()=>{
        console.log('mysql connected.')
        app.listen(port,
            () => console.log(`http://localhost:${port}`))
    })
    .catch(err => console.log('Connection failed.\n', err))


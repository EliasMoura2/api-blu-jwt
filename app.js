const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
require("./database");
app.use(morgan('dev'))

// capturar body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(express.urlencoded({extended :false}))
// app.use(express.json)
app.use(cors())
const verifyToken = require('./middleware/verifyToken')

//routes
// app.use(require('./routes/auth'))
// import routes
// const authRoutes = require('./routes/auth')
// route middleware
// app.use('/api/user', authRoutes)
app.use('/api/user', require('./routes/auth'))
app.use('/api/admin', verifyToken, require('./routes/admin'))

app.get('/', (req, res) => {
  res.json({
    estado: true,
    mensaje: 'Funcional'
  })
})



//Static files
// app.use(express.static(path.join(__dirname, 'public')))

// 404 Handler
// app.get((req, res)=>{
//   res.status(404).send('404 not found')
// })

module.exports = app
// required packages
require('dotenv').config()
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const rowdy = require('rowdy-logger')
const authLockedRoute = require('./controllers/authLockedRoute')

// express app
const app = express()
const PORT = process.env.PORT || 3000
// rowdy logger
const rowdyResults = rowdy.begin(app)
// cors
app.use(cors())
// request body parsing
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Get - test route
// app.get('/', authLockedRoute, (req, res)=>{
//     console.log(res.locals)
//     res.json({msg: 'Hello form the backend'})
// })

app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Port: ${PORT}`)
  })
const express = require("express")
const server = express()
const router = require("./router")
const path = require('path')



// View engine
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views') )

server.use(express.urlencoded({extended:true}))
server.use(express.static('public'))

server.use(router)

server.listen(3000, () => {
    console.log("Server iniciado na porta 3000")
})
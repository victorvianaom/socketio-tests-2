import http from "http"
import express from "express"
import socketio from "socket.io"
import path from "path"
import ejs from "ejs"

const port = 5000
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static('public'))
app.set('views', 'public')
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})



server.listen(port)
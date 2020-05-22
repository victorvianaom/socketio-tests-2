import http from "http"
import express from "express"
import socketio from "socket.io" //////SOCKETIO
import path from "path"
import ejs from "ejs"

const port = 5000
const app = express()
const server = http.createServer(app)
const io = socketio(server) //////SOCKETIO

app.use(express.static('public'))
app.set('views', 'public')
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

let messages = [] 

io.on('connection', (socket) => { //////SOCKETIO
    console.log(`> Socket Conectado: ${socket.id}`) //////SOCKETIO

    socket.emit('previuosMessages', messages) //////SOCKETIO

    socket.on('sendMessage', (data) => { //////SOCKETIO
        messages.push(data) //////SOCKETIO
        socket.broadcast.emit('receivedMessage', data) //////SOCKETIO
    })
})

server.listen(port, () => {
    console.log(`> Listening on port: ${port}`)
})
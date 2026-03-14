const fs = require("fs")
const http = require("http")
const socketIo = require("socket.io")

const PORT = 4000
let body = "Welcome to Litepad RTC Editor"

const handler = (req, res) => {
  fs.readFile(`${__dirname}/index.html`, (error, data) => {
    if (error) {
      res.writeHead(500)
      return res.end("Error loading index.html")
    }

    res.writeHead(200)
    return res.end(data)
  })
}

const app = http.createServer(handler)
const io = socketIo.listen(app)

app.listen(PORT)
console.log(`Litepad running at port ${PORT}`)

io.sockets.on("connection", (socket) => {
  // Keep newly joined clients synchronized with the shared editor state.
  socket.emit("refresh", { body })

  socket.on("refresh", (nextBody) => {
    body = nextBody
  })

  socket.on("change", (op) => {
    const isUserInputChange =
      op.origin === "+input" || op.origin === "paste" || op.origin === "+delete"

    if (isUserInputChange) {
      socket.broadcast.emit("change", op)
    }
  })
})

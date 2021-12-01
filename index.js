const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:19006',
    methods: ['GET', 'POST']
  }
})
const port = process.env.PORT || 3000

const messages = [
  "Everything you've ever wanted is right in front of you.",
  "Cats don't like water.",
  "Everyone says In-N-Out is the best fast-food restaurant in the country, but honestly, I was very underwhelmed.",
  "Cutting down on sugar will help you lose weight.",
  "She desperately wanted to take a nap but knew she had to be available in case her friend called her.",
  "I like blueberries and mangoes but not strawberries.",
  "His shirt is new.",
  "If you like I can turn this car around.",
  "That was nice because I'm a nerd.",
  "My grandmother's birthday is tomorrow.",
  "I’m rather fond of him.",
  "He liked his yearbook.",
  "It is interesting to read old newspaper articles and hear about all the famous people who are no longer famous.",
  "He drinks more water than I do.",
  "I think I could fall asleep really quickly.",
  "Tom is a big shot.",
  "Why not me?",
  "She had many opportunities to give up, but she chose not to.",
  "Did you really think you could just show up to school in a Yeti costume and nobody would ask any questions?",
  "Is that a pencil?"
]

const sessions = []

function getDate () {
  const date = new Date()
  return date.toISOString().split('T')[0]
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  socket.on('chat message', ([text, recipient, owner, conversation]) => {
    io.emit('chat message', [text, recipient, owner, conversation, getDate()])

    const delay = Math.floor(Math.random() * 4500)
    const index = Math.floor(Math.random() * 19)

    io.emit('typing', [true, recipient, conversation])

    setTimeout((text) => {
      io.emit('typing', [false, recipient, conversation])
      io.emit('chat message', [text, owner, recipient, conversation, getDate()])
    }, delay, messages[index])
  })
})

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

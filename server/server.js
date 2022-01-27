const mongoose = require("mongoose")
const Document = require("./Document")

mongoose.connect('mongodb://localhost:27017/sharedocs');
const doc_id = "unique_id"
const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

const defaultValue = ""

io.on('connection', socket => {
    socket.on('get-document', async documentId => {
        const document = await findOrCreateDocument()
        socket.join(documentId)
        socket.emit('load-document', document.data)
        
        socket.on('send-changes', delta => {
            socket.broadcast.emit('receive-changes', delta)
        })
        socket.on("save-document", async data => {
            await Document.findByIdAndUpdate(doc_id, { data })
        })
    })
})

async function findOrCreateDocument() {
    // if (id  == null ) return
    
    const document = await Document.findById(doc_id)
    if (document) return document
    return await Document.create({ _id: doc_id, data: defaultValue })
}
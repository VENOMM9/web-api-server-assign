const http = require('http')
const path = require('path')
const fs = require('fs')
const {requestHandler} = require('./modulars/route')



const PORT = 4670
const HOSTNAME = 'localhost'

const itemsFilePath = path.join(__dirname, 'files', "items.json");

const server = http.createServer(requestHandler);
server.listen(PORT, HOSTNAME, () => {
    console.log(`server running successfully on http://${HOSTNAME}:${PORT}`)
    
})





const http = require('http')
const fs = require('fs')
const path = require('path')



const HOSTNAME = 'localhost'
const PORT = 5600



function requestHandler(req, res) {
    if (req.url === '/index.html' && req.method == 'GET') {

        fs.readFile(path.join(__dirname, 'myfirstfiles', 'index.html'), 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('an error occured');
                

            }
            const result = data
            res.writeHead(200, { 'Content-Type': 'text/html' });
                return res.end(result);
            
            
        });
       
    }
    else {
       
        res.writeHead(404, { 'Content-Type': 'text/html'} );
        fs.readFile(path.join(__dirname, 'myfirstfiles', 'notfound.html'), 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            }
            const result = data
            res.end(result);
            
        });
       
        
    }
    
}
    
const server = http.createServer(requestHandler)
server.listen(PORT, HOSTNAME, () => {
    console.log(`server started at http://${HOSTNAME}:${PORT}`);
})


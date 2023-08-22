
const http = require('http')
const path = require('path')
const fs = require('fs')

const itemsFilePath = path.join(__dirname, 'files', "items.json");


function getAllItems(req, res) {
    fs.readFile(itemsFilePath, 'utf8', (err, data)=> {
        if (err) {
            console.log(err)
            res.WriteHead(400)
            res.end('error ocurred here')
        }
        res.end(data);
        console.log('I am here')
    })
};

function createNewItem(req, res) {
    const body = []

    req.on('data', (chunk) => {
        body.push(chunk)
    })
    
    req.on('data', () => {
        const parseditem = Buffer.concat(body).toString()
        const newItem = JSON.parse(parseditem)

       


        fs.readFile(itemsFilePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                res.writeHead(400)
                res.end("An error occured")
            }
      

            const oldItems = JSON.parse(data)
            const allItems = [...oldItems, newItem]


            fs.writeFile(itemsFilePath, JSON.stringify(allItems), (err) => {
                if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.end(JSON.stringify({
                        message: 'Internal Server Error. Could not save book to database.'
                    }));
                }

                res.end(JSON.stringify(newItem));
            });


           
        });



    });

};

//updating inventory with the item created

function updateNewItem(req, res) {
    const body = []

    req.on("data", (chunk) => {
        body.push(chunk)
    })

    req.on("end", () => {
        const parsedItem = Buffer.concat(body).toString()
        const detailsToUpdate = JSON.parse(parsedItem)
    
        const itemId = detailsToUpdate.id
        // console.log(itemId)

       

        fs.readFile(itemsFilePath, "utf8", (err, items) => {
            if (err) {
                console.log(err)
                res.writeHead(400)
                res.end("An error occured")
            }
           

            const itemsObj = JSON.parse(items)
        
            const itemIndex = itemsObj.findIndex(item => item.id === itemId)
             
           

                if (itemIndex === -1) {
                    res.writeHead(404)
                    res.end("Book with the specified id not found!")
                    return
                }

                const updatedItem = { ...itemsObj[itemIndex], ...detailsToUpdate }
                itemsObj[itemIndex] = updatedItem
                console.log(updatedItem)
            

                fs.writeFile(itemsFilePath, JSON.stringify(itemsObj), (err) => {
                    if (err) {
                        console.log(err);
                        res.writeHead(500);
                        res.end(JSON.stringify({
                            message: 'Internal Server Error. Could not save book to database.'
                        }));
                    }

                    res.writeHead(200)
                    res.end("Updated item successfully");
                });

             })

         })
     }

//getting one item

function getOneItem(req, res) {
    const itemsDB = fs.readFileSync(itemsFilePath,)
    const items = JSON.parse(itemsDB)
       
    
        const urlId = req.url.split('/')
    
    

        const urlIndex = items.findIndex((item) => {
            return item.id === parseInt(urlId[2]);
        })
    
        if (urlIndex === -1) {
            res.writeHead(404);
            res.end(JSON.stringify({
                message: 'Book not found'
            }));
    
            return;   
    }
    res.end(JSON.stringify(items[urlIndex]));
    }






//deleting an item from inventory 

function deleteNewItem(req, res) {
    const body = []
    
    req.on('data', (chunk) => {
        body.push(chunk)
      
    })

    req.on('end', () => {
        const parseditem = Buffer.concat(body).toString()
        const detailsToUpdate = JSON.parse(parseditem)

        const itemId = detailsToUpdate.id
        console.log({'knowitemId': itemId })
        
        fs.readFile(itemsFilePath, "utf8", (err, items) => {
            if (err) {
                console.log(err)
                res.writeHead(400)
                res.end("An error occured")
            }
           

            const itemsObj = JSON.parse(items)
            console.log(items)
            console.log(itemsObj)
            
        
            const itemIndex = itemsObj.findIndex(item => item.id === itemId)
            console.log(itemIndex)
             
           

            if (itemIndex === -1) {
                res.writeHead(404)
                res.end("Book with the specified id not found!")
                return
            }

            itemsObj.splice(itemIndex, 1)
            console.log(itemsObj)

            fs.writeFile(itemsFilePath, JSON.stringify(itemsObj), (err) => {
                if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.end(JSON.stringify({
                        message: 'oops book wasn\"t saved' 
                    }));
                }

                res.writeHead(200)
                res.end("successfully deleted");
            });



        })


    })}


module.exports = {
    getAllItems,
    getOneItem,
    createNewItem,
    updateNewItem,
    deleteNewItem
}
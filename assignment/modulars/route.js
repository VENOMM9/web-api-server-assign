const { getAllItems, getOneItem, createNewItem, updateNewItem, deleteNewItem } = require('./method')


function requestHandler(req, res) {
    if (req.url == '/items' && req.method == 'GET') {
        getAllItems(req, res)
    }
     if (req.url == '/items' && req.method == 'POST') {
        createNewItem(req, res)
    }
     if (req.url == '/items' && req.method == 'PUT') {
        updateNewItem(req, res)
    }
     if (req.url == '/items' && req.method == 'DELETE') {
        deleteNewItem(req, res)
    }
     if (req.url.startsWith('/items/') && req.method == 'GET') {
         getOneItem(req, res)
        

    }
}

module.exports = {requestHandler}
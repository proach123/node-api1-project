// implement your API here

const express = require('express');
const server = express();
const port = 5000;

const db = require('./data/db')

server.use(express.json());

server.get('/', (req,res) =>{
    res.json({Success: 'Access granted'})
})




server.get(`/api/users`, (req,res) => {
    db.find().then(db => {
        res.status(200).json(db)
    }).catch(err => {
        res.status(500).json({errorMessage: "The users information could not be retrieved." })
    })
})

server.get(`/api/users/:id`, (req,res) => {
    const { id } = req.params;
    if(id){
        db.findById(id).then(db => {
            res.status(200).json(db)
        }).catch(err => {
            res.status(500).json({errorMessage: "The user information could not be retrieved." })
        })
    } else res.status(404).json({errorMessage: "user was not found"})


})


server.post('/api/users', (req, res) => {
    // axios.post(url, data, options); the data will be in body of the request
    const dbInfo = req.body;
    db.insert(dbInfo).then(db => {
        res.status(201).json(db);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'User was not added to the database'})
    })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id).then(removed => {
        res.status(200).json(removed);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'User was not terminated'})
    })
}) /// delete passed postman test

server.put('/api/users/:id', (req, res) => {

    const { id } = req.params;

    db.update(id, req.body).then(removed => {
        res.status(200).json(removed);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'User was not imporved and updated'})
    })
})



server.listen(port, ()=>{
    console.log(`Server online and functioning out of port: ${port}`)
})
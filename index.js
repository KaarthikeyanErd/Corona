const express = require('express');
const datastore = require('nedb');
const database = new datastore('database.db');
const fetch = require('node-fetch');
require('dotenv').config();
database.loadDatabase();
const app= express();
const port = process.env.PORT ||3000;
app.use(express.static('Public'));
app.use(express.json({limit:'1mb'}));

app.listen(3000, () => {

    console.log("Port @ 3000");
});

app.get('/location', (req,res) => {
    database.find({}, (err,data) => {
        if (err) {
            console.log("Error occured");
            res.end();
            return;
        }
        else {
            res.json(data);
        }
    });
});

app.post('/location', (req,res) => {
    
    const timestamp = Date.now();
    req.body.timestamp=timestamp;
    //console.log(req.body)
    database.insert(req.body);
    res.json(req.body);
});

app.get("/key", (req,res) => {
    let key = process.env.API_KEY;
    res.json(key);
});
const express = require('express');

const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});


app.post("/api/posts", (req, res, next) => {
    const posts = req.body;
    console.log();
    res.status(201).json({
        message: 'Post added successfully'
    });

})
app.use('/api/posts', (req, res, next) =>{
    const posts = [
        {
            id: 'fadf12321l',
            title: 'First server-side post',
            content: 'This is coming from the server'
        },
        {
            id: 'ksajflaj132',
            title: "Second server-side post",
            content: ' This is coming from the server'
        }

    ];
    res.status(200).json({
        message: 'Post fetched sucessfully!',
        posts: posts
    });
});

// app.use((req, res, next)=>{
//     console.log('First middleware');
//     next();

// });


// app.use((req, res, next)=>{

//     res.send('Hello from express!');

// });

module.exports = app;

const express = require('express');

const app = express();

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

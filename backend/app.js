const express = require('express');

const bodyParser = require("body-parser");
const app = express();
const Post = require('./models/post');
const mongoose = require("mongoose");
const { createShorthandPropertyAssignment } = require('typescript');
mongoose.connect("mongodb+srv://mint:kbdjQtnv90nKDgGK@cluster0.zvqktl5.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=> {
    console.log('Connected to database!');
})
.catch(()=>{
    console.log('Connection failed!');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});


app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    // console.log(post);
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
    });

})
app.get('/api/posts', (req, res, next) =>{

    Post.find()
    .then(documents =>{
        res.status(200).json({
            message: 'Post fetched sucessfully!',
            posts: documents
        });
    });
});

// app.use((req, res, next)=>{
//     console.log('First middleware');
//     next();

// });


// app.use((req, res, next)=>{

//     res.send('Hello from express!');

// });

app.delete("/api/posts/:id", (req, res, next) => {
    // console.log(req.params.id);
    Post.deleteOne({_id: req.params.id}).then(result=>{
        console.log(result);
        res.status(200).json({ message: "Post deleted!" });
    });
});
module.exports = app;

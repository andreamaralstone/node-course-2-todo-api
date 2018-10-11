var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/todos');

var {Users} = require('./models/users');

var app = express();

app.use(bodyParser.json()); //bodyParser.json() is the middleware function

app.post('/todos',(req,res)=>{
    // for creating a new todo
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
    })

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    })
})

app.listen(3000,()=>{
    console.log('Starting on port 3000');
})


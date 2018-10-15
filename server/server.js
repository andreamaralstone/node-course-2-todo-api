var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/todos');

var {Users} = require('./models/users');

var app = express();

app.use(bodyParser.json()); //bodyParser.json() is the middleware function

app.post('/todos',(req,res)=>{
    // for creating a new todo

    var newTodo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    })

    newTodo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    })
})


app.get("/todos",(req,res)=>{
    // for consulting a todo
    //var text = req.body.text
    //Todo.find({text:"VAI CURINTIA!"}).then((todos)=>{
    Todo.find().then((todos)=>{
        res.send(
            {
                todos
            }
        )
    },(e)=>{
        res.status(400).send(e)
    })
})

// app.post('/users',(req,res)=>{
//     // for creating a new todo
//     console.log(req.body);
//     var user = new Users({
//         email: req.body.email,
//         login: req.body.login,
//         password: req.body.password
//     })

//     user.save().then((doc)=>{
//         res.send(doc);
//     },(e)=>{
//         res.status(400).send(e);
//     })
// })

app.listen(3000,()=>{
    console.log('Starting on port 3000');
})

module.exports = {app};


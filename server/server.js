var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/todos');

var {Users} = require('./models/users');

var app = express();

const port = process.env.PORT || 3000;

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

// GET /todos/12341234
app.get('/todos/:id',(req,res)=>{
    //res.send(req.params)
    var id = req.params.id
    
    if(!ObjectID.isValid(id)){
        console.log("ID not valid");
        return res.status(404).send({})
    }

    Todo.findById(id).then((todos)=>{
        if(!todos){
            console.log("ID ",id," NOT FOUND!!!");
            return res.status(404).send();
        } else {
            console.log("ID ",id," FOUND!!!");
            return res.send({todos})
        }
    }).catch((e)=>{
        return  res.status(400).send(e);
    })
})

app.listen(port,()=>{
    console.log(`Started up at port ${port}`);
})

module.exports = {app};


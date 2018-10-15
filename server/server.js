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

app.delete('/todos/:id',(req,res)=>{
    //get the id
    var deleteID = req.params.id
    //validate the id
        // not valid return 404
    if(!ObjectID.isValid(deleteID)){
        console.log("ID not valid");
        return res.status(404).send({})
    }
    //remove todo by id
    Todo.findByIdAndRemove(deleteID).then((doc)=>{
        //success
        if(!doc){
            //if no doc, send 404
            console.log("ID ",deleteID," NOT FOUND!!!");
            return res.status(404).send({})
        } else{
            //if doc, send doc back with 200
            console.log("ID ", deleteID," SUCCESSFULLY DELETED");
            console.log(doc);
            return res.status(200).send({todo:doc})
            }
    }).catch((e)=> {
        //error
            //400 with empty body
        return res.status(400).send()
    })
})

app.listen(port,()=>{
    console.log(`Started up at port ${port}`);
})

module.exports = {app};
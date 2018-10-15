const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todos')
const {Users} = require('./../server/models/users')

var id = "5bbe7b7cf628cb3022d056d4111";

if(!ObjectID.isValid(id)){
    console.log("ID NOT VALID");
}

// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo)=>{
//     if (!todo){
//         return console.log('ID not found');
//     }
//     console.log('Todo By ID',todo);
// }).catch((e)=> console.log(e))

// User.findById
// Case 1 No user
// Case 2 User found
// Case 3 Id not found
Users.findById(id).then((user)=>{
    if(!user) {
        return console.log("ID not found");
    }
    console.log('USER by ID', user);
},(e)=>{
    console.log(e);
})
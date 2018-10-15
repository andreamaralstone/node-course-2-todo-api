const {ObjectID} = require ('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todos');
const {User} = require('../server/models/users');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// })

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findOneAndRemove({_id:'5bc4fa6d1aaee27d01a8b79b'}).then((doc)=>{
    console.log(doc);
});


// Todo.findByIdAndRemove('5bc4fa771aaee27d01a8b79d').then((doc)=>{
//     console.log(doc);
// });


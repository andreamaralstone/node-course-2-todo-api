// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    
    // deleteMany

    // db.collection('Users').deleteMany({name:'Andre'}).then((result)=>{
    //     console.log(result);
    // })  

    // deleteOne

    db.collection('Todos').deleteOne({text:'Pedir Pizza do POP VEGAN'}).then((result)=>{
        console.log(result);
    })  

    // findOneAndDelete
    // db.collection('Users').findOneAndDelete({_id: new ObjectID("5bbd0a8686162b1f90e92a74")}).then((result)=>{
    //     console.log(result);
    // })  

    // db.close();
});
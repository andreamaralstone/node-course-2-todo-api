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

    // db.collection('Todos').deleteOne({text:'Pedir Pizza do POP VEGAN'}).then((result)=>{
    //     console.log(result);
    // })  

    // findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate(
    //     {text: "Pedir Pizza do POP VEGAN"},
    //     {$set:{completed: true}},
    //     {returnOriginal: false}
    // ).then((result)=>{
    //     console.log(result);
    // })  


    db.collection('Users').findOneAndUpdate(
        {
            _id: new ObjectID("5bbe5f9d1aaee27d01a8792e")
        },
        {
            $set:{name: "Ananda"},
            $inc:{age:1}
        },
        {
            returnOriginal: false
        }
    ).then((result)=>{
        console.log(result);
    })  

    // db.close();
});
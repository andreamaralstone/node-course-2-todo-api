const expect = require('expect');
const request = require('supertest');

var {ObjectID} = require('mongodb');

const {app} = require('./../server');

const {Todo} = require('./../models/todos');

 const todos = [{
     _id: new ObjectID(),
     text:"First test todo"
 },{
    _id: new ObjectID(),
   text:"Second test todo",
   completed: true,
   completedAt: 333 
}]

beforeEach((done)=>{
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
     }).then(()=>done())
    
});

describe('POST /todos',()=>{
    it('Should create a new todo',(done)=>{
        var text = "vai corinthians";
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res)=>{
                if(err){
                    done(err)
                }
                Todo.find({text}).then((todos)=>{
                    console.log(JSON.stringify(todos,undefined,2));
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>done(e));
            })
    });

    //post request with empty object
    //expect 400
    //no assumptions about res.body
    //call back to end analysing error and analyse the db

    it('Should not create todo with invalid body data',(done)=>{
        var text={};
        request(app)
        .post("/todos")
        .send(text)
        .expect(400)
        .end((err )=>{
            if(err){
                done(err)
            }

            Todo.find().then((todos)=>{
                console.log(JSON.stringify(todos,undefined,2));
                expect(todos.length).toBe(2);
                expect(todos[0].text).toBe("First test todo");
                expect(todos[1].text).toBe("Second test todo");
                // expect(todos.length).toBe(0);
                done();

            }).catch((e)=>done(e));
        })


        
    })
    
})


describe('GET /todos',()=>{
    it('Should get all todos',(done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2);
            })  
            .end(done);
            // .end((err)=>{
            //     if(err){
            //         done(err);
            //     }

            //     Todo.find().then((todos)=>{
            //         expect(todos.length).toBe(2);
            //         expect(todos[0].text).toBe("First test todo");
            //         expect(todos[1].text).toBe("Second test todo");
            //             done();
            //     }).catch((e)=>done(e));
            // })
    })
})

describe('GET /todos/:id',()=>{
    it('Should return todo doc',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.text).toBe(todos[0].text);
            })
            .end(done);
    })


    it('Should return 404 if todo not found',(done)=>{
        var hexID = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexID}`)
            .expect(404)
            .end(done)
    })

    it('Should return 404 for non-object ids',(done)=>{
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done)
    })

})


describe('DELETE /todos/:id',()=>{
    it('Should remove a todo',(done)=>{
        var testID = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${testID}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).toBe(testID);
            })
            .end((err)=>{
                if (err){
                    return done(err);
                }

                //query database using findById toNotExist
                Todo.findById(testID).then((todos)=>{
                    expect(todos).toNotExist();
                    done();
                }).catch((e)=>done(e))
            })

    });
    it('Should return 404 if todo not found',(done)=>{
        var validID = new ObjectID();
        request(app)
            .delete(`/todos/${validID}`)
            .expect(404)
            .end(done)
    });
    it('Should return 404 if object id is invalid',(done)=>{
        var invalidID = '123ABC';
        request(app)
            .delete(`/todos/${invalidID}`)
            .expect(404)
            .end(done)
    })
})


describe('PATCH /todos/:id',()=>{
    it('Should update the todo',(done)=>{
        // grab id of the first item
        var UpdateID = todos[0]._id;
        var sendObj = {
            text: "Vai corinthians!",
            completed: true
        };
        request(app)
            .patch(`/todos/${UpdateID}`)
            .send(sendObj)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(sendObj.text);
                expect(res.body.todo.completed).toBe(sendObj.completed);
                expect(res.body.todo.completedAt).toBeA('number');
             })
            .end(done)
    })

    it('Should clear completedAt when todo is not completed',(done)=>{
        // grab id of second todo item
        var UpdateID2 = todos[1]._id;
        // update text, set completed to false
        var sendObj2 = {
            text: "POPVEGAN!",
            completed: false
        };
        request(app)
            .patch(`/todos/${UpdateID2}`)
            .send(sendObj2)
            .expect(200) // 200
            .expect((res)=>{
                expect(res.body.todo.text).toBe(sendObj2.text);
                expect(res.body.todo.completed).toBe(sendObj2.completed);
                expect(res.body.todo.completedAt).toNotExist();
             })
            .end(done)
        // text is changed, completed false, completedAt is null .toNotExist
    })
})
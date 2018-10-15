const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');

const {Todo} = require('./../models/todos');

 const todos = [{
     text:"First test todo"
 },{
   text:"Second test todo" 
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
    it('Should get the todos',(done)=>{
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

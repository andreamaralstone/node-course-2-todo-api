var mongoose = require('mongoose');

var Users = mongoose.model('Users',{
    email:{
        type:String,
        required: true,
        minlength: 1,
        trim: true
    },
    login:{
        type:String,
        required: true,
        minlength: 5
    },
    password:{
        type:String,
        required: true,
        minlength: 8
    }
});

module.exports = {Users}
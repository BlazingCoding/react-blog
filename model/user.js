const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
   name: {
       type:String,
       maxlength:50
   },
    email: {
        type:String,
        trim:true,
        unique:1 // email을 고유의 값으로
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type:Stirng,
        maxlength: 50
    },
    role: { // admin 유저랑 보통 유저 구분하기 위함
        type:Number,
        default:0 // 0이 보통유저
    },
    token : {
       type: String,
    },
    tokenExp:{
       type:Number
    }
});
const User = mongoose.model('User', userSchema)
module.exports = { User }
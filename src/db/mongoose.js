const mongoose = require('mongoose')
const validator = require('validator')


mongoose.connect(process.env.MONGODB_URL/*'mongodb://127.0.0.1:27017/task-manager-api'*/, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false 

})

// const User = mongoose.model('User',{
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid!')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if(value < 0){
//                 throw new Error('Age must be a positive number')
//             }  
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: 6,
//         validate(value){
//             if(validator.contains(value, 'password',{ignoreCase: true})){
//                 throw new Error('password is not a password')
//             }
//         }
//     }
// })

// const me = new User({
//     name: '  Ciro  ',
//     email: ' stahl31@hotmail.com    ',
//     password: '123   ABC   '
// })

// me.save().then(()=>{
//     console.log(me)

// }).catch((error) => {
//     console.log('Error!', error)
// })

// const Todos = mongoose.model('Todos', {
//     description: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const todo = new Todos({
//     description: ''
// })

// todo.save().then(()=> {
//     console.log(todo)
// }).catch((error)=>{
//     console.log(error)
// })
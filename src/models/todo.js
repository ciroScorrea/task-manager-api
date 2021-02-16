const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema( {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' //it has to be the same name in user mongoose.model user file.
    }
}, {
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)

todoSchema.pre('save', async function (next){
    const todo = this
    next()
})

 

module.exports = Todo
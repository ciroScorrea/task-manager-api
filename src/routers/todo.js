const express = require('express')
const router = new express.Router()
const Todo = require('../models/todo')
const auth = require('../middleware/auth')

router.post('/todos', auth,  async (req, res)=>{
    const todo = new Todo({
        ...req.body, //.... for spread
        owner: req.user._id
    })
    try{
        await todo.save()
        res.status(201).send(todo)
    } catch {
        res.status(500).send()
    }
})


// GET /todos?completed=false (or true)
// GET /todos?limit=10&skip=10  show 10 results, skyp 10 results. So, seconde page: skip 1st 10 e show next 10 
// GET /todos?sortBy=createdAt_desc   Ascending = 1 , Descending =-1
router.get('/todos', auth, async (req, res)=>{
    const match = {}
    const sort = {}

    if (req.query.completed){
        match.completed = req.query.completed ==='true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 :0
    }

    try{
        //approach one
        //const todos = await Todo.find({owner: req.user._id})
        //approach two
        await req.user.populate({
            path: 'userTodos',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.userTodos)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/todos/:id', auth,  async (req, res) =>{
    const _id = req.params.id
    try{
        const todo = await Todo.findOne({_id, owner: req.user._id})
        
        if(!todo){
            return res.status(404).send()
        }
        res.send(todo)
    } catch(e) {
        res.status(500).send()
    }

})

router.patch('/todos/:id', auth,  async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Operators!'})
    }

    try{
        const todo = await Todo.findOne({ _id: req.params.id, owner: req.user._id})
        
        if(!todo){
            return res.status(404).send()
        }
        updates.forEach( update =>todo[update] = req.body[update])
        await todo.save()
        res.send(todo)
    } catch (e){
        res.status(400).send({error: 'catch'})
    }
})

router.delete('/todos/:id', auth, async (req, res) => {
    try{
        const todo = await Todo.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!todo){
            return res.status(404).send()
        }
        res.send(todo)
    } catch(e){
        res.status(500).send()
    }

})


module.exports = router
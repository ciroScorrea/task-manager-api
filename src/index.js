const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const todoRouter = require('./routers/todo')

const app = express()
const port = process.env.PORT

app.use(express.json()) /* automatically converts to object*/
app.use(userRouter)
app.use(todoRouter)
    
app.listen(port, () => {
    console.log('Server is up on port' + port)
})
//
// Without middleware: new request -> run route handler
//
// With middleware: new request -> do something (functions, i.e.) -> run route handler
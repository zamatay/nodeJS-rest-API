const express = require("express");
const path = require("path");
const todoRoutes = require("./routes/todo");
const secuelize = require('./utils/db')


const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/todo', todoRoutes)
app.use((req,res, next)=>{
    res.sendFile('/index.html')
})

async function start(){
    try {
        await secuelize.sync();
        app.listen(PORT)
    } catch (e) {
        console.log(e)
    }

}
start()

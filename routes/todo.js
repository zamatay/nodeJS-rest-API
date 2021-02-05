const {Router} = require("express");
const router = Router()
const Todo = require("../models/todo");


handleError = (req, res)=>{
    console.log(e)
    res.status(500).json({'message': 'Server error'})
};

router.get('/', async(req, res)=>{
    try {
        const todos = await Todo.findAll()
        console.log(todos)
        res.json(todos)
    } catch (e) {
        handleError(req, res)
    }
})

router.post('/', async(req, res)=>{
    try {
        const {done, title} = {...req.body, done: false};
        const todo = await Todo.create({
            title, done
        })
        res.status(201).json(todo.dataValues)
    } catch (e) {
        handleError(req, res);
    }
})

router.put('/:id', async(req, res)=>{
    try {
        const todo = await Todo.findByPk(+req.params.id);
        todo.done = req.body.done;
        await todo.save();
        res.json({todo})
    } catch (e) {
        handleError(req, res)
    }
})

router.delete('/:id', async(req, res)=>{
    try {
        const todos = await Todo.findAll({
            where: {
                id: +req.params.id
            }
        })
        await todos[0].destroy()
        res.status(204).json({id: req.params.id})
    } catch (e) {
        handleError(req, res);
    }
})



module.exports = router;
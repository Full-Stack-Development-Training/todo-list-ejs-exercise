const express = require('express')
const app = express()
const date = require(__dirname + '/date.js')

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.set('view engine', 'ejs')

let tasksAdded = ['Buy Food', 'Cook Food', 'Eat Food']
let workItems = []

app.get('/', (req, res) => {
    let day = date()
    res.render('list', {listTitle: day, newTasks: tasksAdded})
    
})

app.post('/', (req, res)=> {
    let taskAdded = req.body.taskName
    if(req.body.list === 'Work') {
        workItems.push(taskAdded)
        res.redirect('/work')
   }else{
       tasksAdded.push(taskAdded)
    res.redirect('/')
   }
})

app.get('/work', (req, res) => {
    res.render('list', {listTitle: "Work List", newTasks: workItems})
})

app.post('/work', (req, res) => {
    let item = req.body.taskName
    workItems.push(item)
    res.redirect('/work')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000, () => console.log("Server started on port 3000"))

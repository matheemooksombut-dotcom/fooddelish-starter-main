const express = require('express')
const bodyparser = require('body-parser')
const app = express()





//mock API--------------------------------



app.use(bodyparser.json())


let users = []
let couter = 1

//Adress
const port = 8000


//path Get User
app.get('/users',(req,res)=>{
    res.json(users)
})



//path Post User
app.post('/user' ,  (req , res)=>{
    let user = req.body
    user.id = couter
    couter ++
    users.push(user)
    res.json({
        message: 'add user' , 
        user: users
    })
})


app.put('/user/:id',(req,res)=>{
    let id = req.params.id
    let selectedIndex = users.findIndex(user => {
        if(user.id == id){
            return true
        }else{
           return false
        }

    })
    res.send(selectedIndex + '')    
})


app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
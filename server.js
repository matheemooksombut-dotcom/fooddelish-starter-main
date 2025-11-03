const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const app = express()
const port = 8000


// ! เชื่อมต่อ Database
let conn = null
app.use(bodyparser.json())
const initDatabase  = async () =>{
        conn = await mysql.createConnection({
        host : 'localhost',
        user: 'root' , 
        password: "root",
        database:"user" ,
        port:3306
    })
    console.log('Database connected')
}
app.get('/database',async(req , res)=>{
    try{
       
    const result = await conn.query('SELECT * FROM user')
    res.json(result[0])

    }catch(error){
        console.error('Error fetching user:', error.message)
        res.status(500).json({error: 'Error fetchning'})

    }

    
})

//!   รับข้อมูล User จากฝั่ง Database

//path Get User
app.get('/users',async(req,res)=>{
    const result = await conn.query('SELECT * FROM user')
    res.json(result[0])
})

//!   นำข้อมูลจากฝั่ง User เก็บลง Database

//path Post User
app.post('/user' ,  async(req , res)=>{
    let user = req.body
    const result = await conn.query('INSERT INTO user SET ?' , user)
    
    console.log('results' , result)



    // ! นำข้อมูลจาก database มาแสดงให้ user ในรูปแบบ json
    res.json({
        message: 'Inserted' , 
        data: result[0]
    })
  
})





//mock API--------------------------------







// app.put('/user/:id',(req,res)=>{
//     let id = req.params.id
//     //ค้นหา user ผ่าน id 
//     let selectedIndex = users.findIndex(user => {
//         if(user.id == id){
//             return true
//         }else{
//            return false
//         }

//     })
//     res.send(selectedIndex + '')    
// })


app.listen(port, async(req,res) => {
    await initDatabase()
  console.log(`server running on port ${port}`)
})
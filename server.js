const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const app = express()
const cors = require('cors');
const port = 8000


app.use(cors());


// -----> เส้น API ยิงผ่าน Postman เข้า Database แล้ว 

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
app.post('/Register' ,  async(req , res)=>{
    
    try{
    let user = req.body
    const {Username} = user ; 
    // Username ซํ้าๆ
    const [existing] = await conn.query('SELECT * FROM user WHERE Username = ?',[Username])
    if(existing.length >0){
      // ! พบ User ซํ้า
      return res.status(400).json({
        message: 'Username already exists'
        
      })
      
    }
    const [result] = await conn.query('INSERT INTO user SET ?' , user)
    // ! นำข้อมูลจาก database มาแสดงให้ user ในรูปแบบ json
    res.json({
        message: 'Inserted' , 
        data: result
    })

    }catch(error){
        console.error( 'errorMessage', error.message)
        res.status(500).json({message: 'Something wrong',
           
        })

    }
    
})


// 🔵 LOGIN
app.post('/login', async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const [rows] = await conn.query(
      'SELECT * FROM user WHERE Username = ? AND Password = ?',
      [Username, Password]
    );

    if (rows.length > 0) {
      res.json({ success: true, message: 'Login success', user: rows[0] });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err });
  }
});



app.get('/user/:id', async(req,res)=>{
    try{let id = req.params.id
    //ค้นหา user ผ่าน id 
    const result = await conn.query('SELECT * FROM user WHERE id = ?' , id)
    if(result[0].length >0){
        res.json(result[0][0])
    }else{
        res.status(404).json({
            message: 'NOT FOUND'
        })
    }
    
 }catch(error){
   console.error( 'errorMessage', error.message)
        res.status(500).json({message: 'Something wrong',
           
    })
 }
    
})


app.listen(port, async(req,res) => {
    await initDatabase()
  console.log(`server running on port ${port}`)
})

// const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));

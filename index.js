const express = require('express');

const mongoose = require('mongoose');
const User = require('./Models/User.js');

// const connectToMongo = require('./db')

// const bodyParser = require('body-parser');
// const cors = require('cors');
// const User = require('./Models/Users.js');

const app = express();
const port = 3001;



// app.use(cors())
app.use(express.json())

const URI = 'mongodb+srv://Hitesh:Hitesh@cluster0.bulhrac.mongodb.net/MongoDbDatabase?retryWrites=true&w=majority'

mongoose.connect(URI).then(success => console.log(' connected with db successfully'))

app.get('/', async (req, res) => {



    const allUser = await User.find({})

    console.log(typeof (allUser))
    // res.send("getting all the request")
    // res.json({ status: 'ok',allUser })
    res.json({ allUser })
})

app.post('/', async (req, res) => {

    const { name, phone, age } = req.body

    const allUser = await User.create({
        name, phone, age
    })

    console.log(allUser)
    res.send('get request [gettin all the user from db ]')
})

app.delete('/', async (req, res) => {

    const { id } = req.body
})



app.delete('/deleteAll', async (req, res) => {
    const deleted = await User.deleteMany({})
    res.json({ deleted })
})


app.listen(port, () => {
    console.log("server is running on port " + port);
})
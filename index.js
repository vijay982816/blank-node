const express = require('express');

const mongoose = require('mongoose');
const User = require('./Models/User.js');

const { body } = require('express-validator');

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


    // res.send("getting all the request")
    // res.json({ status: 'ok',allUser })
    res.json({ allUser })
})

app.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('phone', 'Description must be atleast 5 characters').isLength({ min: 10 })], async (req, res) => {



        try {

            const { name, phone, age } = req.body

            if (name | phone | age) {
                const addedUser = await User.create({
                    name, phone, age
                })



                res.json({ addedUser })

            }
            else {

                res.send('please enter requrired field')
            }


        } catch (error) {


            res.send(error.message)
        }


    })


app.put('/', async (req, res) => {

    res.send('put request ')
})

app.delete('/', async (req, res) => {

    const { id } = req.body

    res.send('deleted data from the db')
})



app.delete('/deleteAll', async (req, res) => {
    const deleted = await User.deleteMany({})
    res.json({ deleted })
})


app.listen(port, () => {
    console.log("server is running on port " + port);
})
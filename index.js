const express = require('express');
const User = require('./Models/User.js');
const connectToMongo = require('./db.js');
var cors = require('cors')
const { body, validationResult } = require('express-validator');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 3002;
app.use(express.json())
app.use(cors())



// connecting to db [mongodb]

connectToMongo()

//getting all the users
app.get('/', async (req, res) => {



    const allUser = await User.find({})
    // res.json({ allUser })
    res.json(allUser)
})

//getting one user
app.get('/oneuser/:id', async (req, res) => {



    // Find the user 

    const { id } = req.params

    const oneUser = await User.findById(id)

    res.json(oneUser)
    




})

//ading users in db
app.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('phone', "enter a valid phone number").isLength({ min: 10 })], async (req, res) => {



        try {

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }


            const { name, phone, age } = req.body
            const addedUser = await User.create({
                name, phone, age
            })



            // res.json({ addedUser })

            res.json( addedUser )



            // const { name, phone, age } = req.body

            // if (name | phone | age) {
            //     const addedUser = await User.create({
            //         name, phone, age
            //     })



            //     res.json({ addedUser })

            // }
            // else {

            //     res.send('please enter requrired field')
            // }


        } catch (error) {

            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }


    })

// updating user 
app.put('/:id', async (req, res) => {



    try {



        // Create a new User  object
        const { name, phone, age } = req.body;
        const updatingUser = {};
        if (name) { updatingUser.name = name };
        if (phone) { updatingUser.phone = phone };
        if (age) { updatingUser.age = age };

        // Find the user to be updated and update it

        const { id } = req.params

        const updatedUser = await User.findByIdAndUpdate(id, { $set: updatingUser }, { new: true })
        res.send(`put request ${updatedUser} `)


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }



})


//deleting user
app.delete('/:id', async (req, res) => {

    try {
        // Find the user to be delete and delete it
        let foundUser = await User.findById(req.params.id);
        if (!foundUser) { return res.status(404).send("User Not Found") }



        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.json({ "Success": "User has been deleted", deletedUser: deletedUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


app.listen(port, () => {
    console.log("server is running on port " + port);
})
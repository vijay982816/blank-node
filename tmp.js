
require('dotenv').config()
console.log(process.env.PORT)

const { PORT, USERNAME, PASSWORD, DATABASENAME } = process.env


console.log(`'mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.bulhrac.mongodb.net/${DATABASENAME}?retryWrites=true&w=majority'`)
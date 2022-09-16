const mongoose = require('mongoose');
const URI = 'mongodb+srv://admin:<admin>@cluster0.bulhrac.mongodb.net/MongoDbDatabase?retryWrites=true&w=majority'

const connectToMongo = () => {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(success => console.log('connect to db succesflly'))
}

module.exports = connectToMongo;





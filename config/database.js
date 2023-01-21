const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.set('strictQuery', true).connect(process.env.DATABASE)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.DATABASE
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
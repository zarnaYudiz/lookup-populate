const express = require("express");
const mongoose = require('mongoose')
const app = express();

// // product schema
// const airlineSchema = new mongoose.Schema({
//     name: String,
//     country: String,
//     rating: Number,
// })
// const Airline = mongoose.model("Airline", airlineSchema);
// const airAllianceSchema = new mongoose.Schema({
//     name: String,
//     alliance: [],
// })
// const AirAlliance = mongoose.model("AirAlliance", airAllianceSchema);
// Airline.aggregate([
//     {
//         $lookup: {
//             from: "air_airlines",
//             localField: "name",
//             foreignField: "airlines",
//             as: "alliance"
//         }
//     }
// ])
// .then((result) => {
//     console.log(result)
// })
// .catch((error) => {
//     console.log(error)
// })

const userSchema = new mongoose.Schema({
    username: String,
    email: String
})

const postSchema = new mongoose.Schema({
    title: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

mongoose.connect("mongodb+srv://zarnapatel:testpassword@cluster0.cjxny.mongodb.net/olxDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database..'))
  .catch(error => {
    console.log('Connection to Database failed..')
    console.log(error) 
})

const orderSchema = new mongoose.Schema({
    _id: Number,
    customerId: Number,
    itemName: String
})
  
const customerSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    city: String
})
  
const Order = new mongoose.model('order', orderSchema);
const Customer = new mongoose.model('customer', customerSchema);

Customer.aggregate([
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "customerId",
        as: "orders_info",
      },
    },
    {
      $unwind: "$orders_info",
    },
  ])
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });

// POPULATE:
    Post.find()
    .then(p => console.log(p))
    .catch(error => console.log(error));

app.listen(process.env.PORT, function(req,res){
    console.log("Server is listening on post 3000");
})
const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema;


var productCartSchema = new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number,
})

const ProductCart = mongoose.model("ProductCrat",productCartSchema)

var orderSchema =new mongoose.Schema({
    products:[productCartSchema],
    transaction_id:{},
    amount:{ type: Number },
    address: String,
    status : {
        type: String,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Recieved", "Processing", "Shipped"]
    },
    updated: Date,
    user:{
        type:ObjectId,
        ref:"User",
    }
},{timestamps: true});

 const Order =mongoose.model("Order", orderSchema);

 module.exports={ Order, ProductCart};
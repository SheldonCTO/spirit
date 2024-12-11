const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

let mongoDBConnectionString =   "mongodb+srv://ccto:rUisVwZ2L2tuITbV@cluster0.3rmouip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let Schema = mongoose.Schema;

let orderSchema = new Schema({
    OID:Number, //PK
    CID:Number,
	SID:Number,
    PID:Number,
    quantity:Number,
	shippingAddress: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
	totalPrice:{
		type: Number,
		required: true
	},
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});	

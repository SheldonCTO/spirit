const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

let mongoDBConnectionString =   "mongodb+srv://ccto:rUisVwZ2L2tuITbV@cluster0.3rmouip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let Schema = mongoose.Schema;

let storeSchema = new Schema({
        SID: Number,
        userName:String,
        password: String,
        storeName: String,
        city: String,
        build: String,
        noOfStreet: Number,
        street: String,
        phone: Number,
        order: [
            {
              OID: Number
            }
          ],
        inventory: [
            {
                PID: Number,
                price: Number,
                quantity: Number
            }
        ]
})


module.exports.getAllSales = function () {
    return new Promise(function (resolve, reject) {
        if (!Product) {
            reject(new Error('Product model not initialized.'));
        } else {
            Product.find({}).lean().exec()
            .then(products => resolve(products))
            .catch(error => reject(error));
        }
    });
};
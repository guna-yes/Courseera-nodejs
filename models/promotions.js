const mongoose = require("mongoose")
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;
const PromoSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true
      
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String
    },
    price: {
        type: Currency,
        required: true
    },
    featured: {
        type: String
    },
    description:
    {
        type: String
    }
   },
    {
        timestamps: true
    }
);

const Promos=mongoose.model("Promo",PromoSchema);
module.exports =Promos;


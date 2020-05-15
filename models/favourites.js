const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const favouriteSchema=new Schema({

user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
},
favouriteDishes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Dish"
    }]
},
    {
        timestamps: true
    }, {
    usePushEach: true
});

const Favourite=mongoose.model("Favourite",favouriteSchema);

module.exports=Favourite;
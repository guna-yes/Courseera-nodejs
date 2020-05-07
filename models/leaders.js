const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const leaderSchema=new Schema({
    name: {
        type: String,
        required: true,
        unique: true

    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String
    },

    featured: {
        type: Boolean
    },
    description:
    {
        type: String
    }
},
    {
        timestamps: true
});

const Leaders=mongoose.model("Leader",leaderSchema);

module.exports=Leaders;
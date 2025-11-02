import { Schema, model } from "mongoose"

const foodItemSchema = new Schema({
    chefId:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    item:{
        type:Map,
        of: Number,
        required:true,
    },
}, {timestamps:true})

const FoodItem = model("FoodItem", foodItemSchema);

export default FoodItem;
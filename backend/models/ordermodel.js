import mongoose from "mongoose";


const orderSchema = mongoose.Schema({


user:{
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:'User'

},

orderItems:[
{
    name:{type:String , require:true},
    qty:{type:Number , require:true},
    image:{type:String , require:true},
    price:{type:Number , require:true},
    product:{type:mongoose.Schema.Types.ObjectId , require:true , ref:'Product'},

}

],

shippingAddress:{
    address:{type: String , required:true},
    city:{type: String , required:true},
    postalCode:{type: String , required:true},
    country:{type: String , required:true},

},


paymentMethod:{
    type:String,
    required:true
},

paymentResult:{
   
    id:{type:String},
    status:{type:String},
    update_time:{type:String},
    email_adress:{type:String},


},

taxPrice:{
    type:Number,
    required:true,
    default:0
},
shippingPrice:{
    type:Number,
    required:true,
    default:0
},
totalPrice:{
    type:Number,
    required:true,
    default:0
},
isPaid:{
    type:Boolean,
    required:true,
    default:false
},
paidAt:{
    type:Date
},
isDelivered:{
    type:Boolean,
    required:true,
    default:false
},
deliveredAt:{
    type:Date
},


},{
    timestamps :true
})

const Order = mongoose.model("Order",orderSchema)

export default Order


import asyncHandler from 'express-async-handler'
import Order from '../models/ordermodel.js'


// Creat New order
// POST /api/orders
//Potected

const addOrderItems = asyncHandler( async (req,res) =>{
    console.log('▶️ addOrderItems hit');
    console.log('▶️ req.user:', req.user);
    console.log('▶️ req.body:', req.body);
    const {orderItems , shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body

    if(orderItems && orderItems.length === 0 ){
        res.status(400)
        throw new Error('no order items')
        return
    } else {
        const order = new Order ({
             

             orderItems,
             user : req.user._id,
             shippingAddress,
             paymentMethod,
             itemsPrice,
             taxPrice,
             shippingPrice,
             totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})


// get order
// get /api/orders
//Potected

const getOrderById = asyncHandler( async (req,res) =>{
    const order = await Order.findById(req.params.id).populate('user','name email')
    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('order Not found ')
    }
})


const updateOrderToPaid = asyncHandler( async (req,res) =>{
    const order = await Order.findById(req.params.id)
    if(order) {
        order.isPaid = true
        order.paidAt= Date.now()

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('order Not found ')
    }
})

const updateOrderToDelivered = asyncHandler( async (req,res) =>{
    const order = await Order.findById(req.params.id)
    if(order) {
        order.isDelivered = true
        order.deliveredAt= Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('order Not found ')
    }
})

const getMyOrder = asyncHandler( async (req,res) =>{
    const orders = await Order.find({user :req.user._id})
   res.json(orders)
})



const getOrders = asyncHandler( async (req,res) =>{
    const orders = await Order.find({}).populate('user','id name')
   res.json(orders)
})


export  {addOrderItems ,getOrderById,updateOrderToPaid,getMyOrder,getOrders,updateOrderToDelivered}
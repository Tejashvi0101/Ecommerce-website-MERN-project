import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/user.js'

import products from './data/products.js'
import User from './models/usermodel.js'
import Product from './models/productmodel.js'
import Order from './models/ordermodel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('✅ Data Imported')
    process.exit()
  } catch (error) {
    console.error('❌ Error with data import:', error)
    process.exit(1)
  }
}

importData()

import dotenv from 'dotenv';
dotenv.config();

let productsDao
let cartsDao

if (`${process.env.DB}` === 'mongodb') {
  const { default : ProductsDaoMongo } = await import('./products/MongoProductsDao');
  const { default : CartsDaoMongo } = await import('./carts/MongoCartsDao');
  productsDao = new ProductsDaoMongo()
  cartsDao = new CartsDaoMongo()
} 

// Si la DB es Firebase
if (`${process.env.DB}` === 'firebase') {
  const { default : ProductsDaoFirebase } = await import('./products/FirebaseProductsDao');
  const { default : CartsDaoFirebase } = await import('./carts/FirebaseCartsDao');
  productsDao = new ProductsDaoFirebase()
  cartsDao = new CartsDaoFirebase()
} 

module.exports = {
  ProductsDao,
  CartsDao,
}
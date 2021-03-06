const { CartsDao } = require('../models/daos/index');
const { productsDao } = require('./productContainer');

const cartsDao = new CartsDao();

const moment = require("moment");
const fs = require("fs").promises;

class Cart {

    // constructor() {
    //     this.path = "./data/cart.txt";
    //     this.cart = [];
    //     this.id = 1;
    //     this.cartProducts = {
    //         id: this.id,
    //         timestamp: moment().format("L LTS"),
    //         name: "",
    //         description: "",
    //         code: "",
    //         img: "",
    //         price: 0,
    //         stock: 0,
    //     };
    // }


    async cartDisplay() {
        try {
            const data = await fs.readFile(cartsDao.path, "utf8");
            if (data && data.toString().trim() !== "") {
                cartsDao.cart = JSON.parse(data);
                if (cartsDao.cart.length > 0) {
                    cartsDao.id = parseInt(cartsDao.cart[cartsDao.cart.length - 1].id) + 1;
                }
                else {
                    cartsDao.id = 1;
                }
            }
            return cartsDao.cart;
        } catch (error) {
            if (error.code === "ENOENT") {
                await fs.writeFile(cartsDao.path, JSON.stringify([], null, 2));
                return [];
            } else {
                throw new Error((
                    "Se produjo un error en CartDisplay: " + error.message
                ));
            }
        }
    }

    async newCart() {
        try {
            const data = await cartsDao.cartDisplay();
            if (!data) {
                data = cartsDao.cart;
            } else if (data.length > 0) {
                cartsDao.id = parseInt(data[data.length - 1].id) + 1;
            }
            //this.id = 1;
            const cart = {
                id: cartsDao.id,
                timestamp: moment().format("L LTS"),
                products: [],
            };
            data.push(cart);
            await fs.writeFile(cartsDao.path, JSON.stringify(data, null, 2));
            return cart;
        } catch (error) {
            throw new Error((
                "Se produjo un error en newCart: " + error.message
            ));
        }
    }

    async deleteCart(id) {
        try {
            const data = await cartsDao.cartDisplay();
            const index = data.findIndex((cart) => cart.id === parseInt(id));
            if (index === -1) {
                throw new Error("Cart not found");
            }
            data.splice(index, 1);
            await fs.writeFile(cartsDao.path, JSON.stringify(data, null, 2));
            return `Se ha eliminado el carrito con id: ${id}`;
        } catch (error) {
            throw new Error((
                "Se produjo un error en deleteCart: " + error.message
            ));
        }
    }

    async cartProd(id) {
        try {
            const data = await cartsDao.cartDisplay();
            const cart = data.find((cart) => cart.id == parseInt(id));
            if (!cart) {
                throw new Error("Cart not found");
            }
            return cart;
        } catch (error) {
            throw new Error((
                "Se produjo un error en cartProd: " + error.message
            ));
        }
    }

    async addProduct(idCart, product) {
        try {
            const data = await cartsDao.cartDisplay();
            const cart = data.find((cart) => cart.id === parseInt(idCart));
            cart.products.push(product)
            await fs.writeFile(cartsDao.path, JSON.stringify(data, null, 2));
            return cart;
        } catch (error) {
            throw new Error((
                "Se produjo un error en addProduct: " + error.message
            ));
        }
    }

    async eraseProduct(id, idProd) {
        try 
        {
            const data = await cartsDao.cartDisplay();
            const cart = data.find((cart) => cart.id === parseInt(id));
            const index = cart.products.findIndex((product) => product.id === parseInt(idProd));
            cart.products.splice(index, 1);
            await fs.writeFile(cartsDao.path, JSON.stringify(data, null, 2));
            return cart;
        }
        catch (error)
        {
            throw new Error((
                "Se produjo un error en eraseProduct: " + error.message
            ));
        }
    }

}

module.exports = Cart;
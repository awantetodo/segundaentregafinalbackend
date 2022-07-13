const express = require('express');
const { ENV: { PORT } } = require('./config');


const app = express();

const productRouter = require('./routers/productRouter');
const cartRouter = require('./routers/cartRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);


app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
});
require('dotenv').config()
const express = require('express');
const fs = require('fs');
// const productos = require('./api/productos');    //BASE DE DATOS MYSQL
// const carrito = require('./api/carrito');        //BASE DE DATOS MYSQL
const productos = require('./api/productosMongo')   // BASE DE DATOS DE MONGO
const carrito = require('./api/carritoMongo')       // BASE DE DATOS DE MONGO
const app = express();
const mongo = require('./config/mongo.json')
const mongoose = require('mongoose');

async function connect() {
    //COMENTAR Y DESCOMENTAR SEGUN SE QUIERA USAR MONGO EN LA NUBE O MONGO LOCAL RESPECTIVAMENTE    
    let uri = mongo.MONGODBaaS;
    // let uri = mongo.MONGODB;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`mongoose conectado en ${uri}`);
    return;
}

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerCarrito = express.Router();
const routerProductos = express.Router();

// PRODUCTOS
// LISTAR
routerProductos.get('/listar', async (req, res) => {
    let resultado = await productos.listar();
    res.json(resultado)
})
// LISTAR POR ID
routerProductos.get('/listar/:id', async (req, res) => {
    let idProducto = req.params.id;
    let productoPedido = await productos.listarPorId(idProducto);
    res.json(productoPedido);
})
// AGREGAR
routerProductos.post('/agregar', async (req, res) => {
    let nuevoProducto = req.body;
    let resultado = await productos.guardar(nuevoProducto);
    res.json(resultado);
})
// ACTUALIZAR
routerProductos.put('/actualizar/:id', async (req, res) => {
    let idProducto = req.params.id;
    let productoActualizado = req.body;
    let resultado = await productos.actualizar(idProducto, productoActualizado);
    res.json(resultado);
})
// BORRAR
routerProductos.delete('/borrar/:id', async (req, res) => {
    let idProducto = req.params.id;
    let resultado = await productos.borrar(idProducto);
    res.json(resultado);
})

// CARRITO
//LISTAR
routerCarrito.get('/listar', async (req, res) => {
    let resultado = await carrito.listar();
    res.json(resultado);
})
routerCarrito.get('/listar/:id', async (req, res) => {
    let idCarrito = req.params.id;
    let resultado = await carrito.listarPorId(idCarrito);
    res.json(resultado);
})

// AGREGAR PRODUCTOS
routerCarrito.post('/agregar/:id_producto', async (req, res) => {
    let idProducto = req.params.id_producto;
    let resultado = await carrito.guardar(idProducto);
    res.json(resultado);
})

//ACTUALIZAR PRODUCTO
routerCarrito.put('/actualizar/:id', async (req, res) => {
    let idCarrito = req.params.id;
    let nuevoProducto = req.body;
    let resultado = await carrito.actualizar(idCarrito, nuevoProducto);
    res.json(resultado);
})

//BORRAR PRODUCTOS
routerCarrito.delete('/borrar/:id', async (req, res) => {
    let resultado = carrito.borrar(req.params.id);
    res.json(resultado);
})



// CREACION ROUTERS CARRITO Y PRODUCTOS
app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);

// FUNCION PARA CHECKEAR LOS PRIVILEGIOS (USUARIO - ADMIN)
// function checkAdmin(req, res, next) {
//     if (req.body.administrador !== "true") {
//         res.status(401).send({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada. No tiene permiso de administrador.` })
//     } else {
//         next();
//     }
// }

const server = app.listen(process.env.PUERTO, () => {
    console.log(`servidor escuchando en http://localhost:${process.env.PUERTO}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});


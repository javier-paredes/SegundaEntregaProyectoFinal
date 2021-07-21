require('dotenv').config()
const express = require('express');
const fs = require('fs');
const productos = require('./api/productos');
const carrito = require('./api/carrito');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerCarrito = express.Router();
const routerProductos = express.Router();

// PRODUCTOS
// LISTAR
routerProductos.get('/listar/:id', (req, res) => {
    let idProducto = req.params.id;
    let productoPedido = productos.listarPorID(idProducto);
    res.json(productoPedido);
})
// AGREGAR
routerProductos.post('/agregar', checkAdmin, (req, res) => {
    let nuevoProducto = req.body;
    productos.guardar(nuevoProducto);
    res.send('Producto Agregado');
})
// ACTUALIZAR
routerProductos.put('/actualizar/:id', checkAdmin, (req, res) => {
    let idProducto = req.params.id;
    let productoActualizado = req.body;
    productos.actualizar(idProducto, productoActualizado);
    res.send('Producto Actualizado');
})
// BORRAR
routerProductos.delete('/borrar/:id', checkAdmin, (req, res) => {
    let idProducto = req.params.id;
    productos.borrar(idProducto);
    res.send('Producto Borrado');
})

// CARRITO
//LISTAR
routerCarrito.get('/listar/:id', (req, res) => {
    let idCarrito = req.params.id;
    carritoPedido = carrito.listarPorID(idCarrito);
    res.json(carrito);
})
// AGREGAR PRODUCTOS
let idIndividualCarrito = 0;
routerCarrito.post('/agregar/:id_producto', (req, res) => {
    idIndividualCarrito += 1;
    carrito.carrito.id += idIndividualCarrito;
    carrito.carrito.timestamp = new Date().toLocaleString();
    let idProducto = req.params.id_producto;
    carrito.agregar(idProducto);
    res.send('Product agregado al carrito');
})
//BORRAR PRODUCTOS
routerCarrito.delete('/borrar/:id', (req, res) => {
    carrito.borrar(req.params.id);
    res.send('Producto borrado');
})

// CREACION ROUTERS CARRITO Y PRODUCTOS
app.use('/productos', routerProductos);
app.use('/carrito', routerCarrito);


// FUNCION PARA CHECKEAR LOS PRIVILEGIOS (USUARIO - ADMIN)
function checkAdmin(req, res, next) {
    if (req.body.administrador !== "true") {
        res.status(401).send({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada` })
    } else {
        next();
    }
}

const server = app.listen(process.env.PUERTO, () => {
    console.log(`servidor escuchando en http://localhost:${process.env.PUERTO}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});


const ModeloCarrito = require('../models/carrito')
const Productos = require('./productosMongo')

class Carrito {
    constructor() {             
    }
    
    async listar() {
        try {
            let resultado = await ModeloCarrito.find({});
            return resultado;
        } catch (error) {
            throw error;
        }
    }
    async listarPorId(idCarrito) {
        try {
            let resultado = await ModeloCarrito.find({_id: idCarrito});
            return resultado;
        } catch (error) {
            throw error;
        }
    }
   
    async guardar(idProducto) {
        try {
            let carrito = {                
                timestamp: 'fecha',
                producto: {}
            }
            let timestamp = new Date().toLocaleString();            
            let producto = await Productos.listarPorId(idProducto);
            carrito.timestamp = timestamp;
            carrito.producto = producto;
            let resultado = await ModeloCarrito.create(carrito);
            return resultado;
        } catch (error) {
            throw error;
        }
    }
    
    async borrar(idCarrito) {
        try {
            let resultado = await ModeloCarrito.findByIdAndDelete(idCarrito)
            return resultado;
        } catch(error) {
            throw error;
        }
    }

    async actualizar(idCarrito, nuevoProducto) {        
        let nuevoCarrito = await ModeloCarrito.find({_id: idCarrito});
        nuevoCarrito.producto = nuevoProducto;         
        let resultado = await ModeloCarrito.findByIdAndUpdate(idCarrito, nuevoCarrito);
        return resultado;
    }
}

module.exports = new Carrito();

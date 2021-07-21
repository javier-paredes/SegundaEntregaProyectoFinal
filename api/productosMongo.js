const mongoose = require('mongoose');
const ModeloProductos = require('../models/productos')
const config = require('../config/mongo.json')

class Productos {
    constructor() {
        this.crearConexion();
    }

    async crearConexion() {
        await mongoose.connect(config.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('conexion a la base de datos realizada!');        
    }

    async listar() {
        try {
            let resultado = await ModeloProductos.find({})
            return resultado;
        } catch (error) {
            throw error;
        }
    }
    
    async listarPorId(idProducto) {
        try {
            let resultado = await ModeloProductos.find({_id: idProducto})
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async guardar(producto) {
        try {            
            let timestamp = new Date().toLocaleString();
            producto.timestamp = timestamp
            let resultado = await ModeloProductos.create(producto)
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    actualizar(idProducto, nuevoProducto) {
        try {
            let resultado = await ModeloProductos.findByIdAndUpdate(idProducto, {nuevoProducto} )
            return resultado;
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo actualizar el producto');
        }
    }

    async borrar(idProducto) {
        try {
            let resultado = await ModeloProductos.findByIdAndDelete(idProducto)
            return resultado;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = new Productos();


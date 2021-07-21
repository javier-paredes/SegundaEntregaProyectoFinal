const mongoose = require('mongoose');
const ModeloCarrito = require('../models/carrito')
const config = require('../config/mongo.json')

class Carrito {
    constructor() {        
        this.crearConexion();
    }
    
    async crearConexion() {
        await mongoose.connect(config.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('conexion a la base de datos realizada!');        
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
            let mensajes = await ModeloCarrito.find({id: idCarrito});
            return mensajes;
        } catch (error) {
            throw error;
        }
    }
   
    async guardar(carrito) {
        try {
            let timestamp = new Date().toLocaleString();
            carrito.timestamp = timestamp;
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
}

module.exports = new Carrito();

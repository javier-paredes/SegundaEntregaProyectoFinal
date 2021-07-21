const mongoose = require('mongoose');

const schema = mongoose.Schema({
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 100 },
    codigo: { type: String, required: true, max: 100 },
    foto: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    timestamp: { type: String, required: true, max: 100 }
}, { strict: false });

const Productos = mongoose.model('productos', schema);

module.exports = Productos;
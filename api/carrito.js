const options = require('../config/mysqlConnection');
const knex = require('knex')(options);
const productos = require('.//productos');
class Carrito {
    constructor(producto) {        
        this.crearTabla();
    }
    
    async crearTabla() {
        try {
            console.log('Borrando tabla carrito existente...');
            await knex.schema.dropTable('carrito');

            await knex.schema.createTable('carrito', table => {
                table.increments('id');
                table.string('timestamp');                
                table.string('producto');
            });
            console.log('Tabla carrito creada!');
        } catch (error) {
            console.log(error);
        }
    }
    async listar() {
        try {
            let resultado = await knex('carrito').select('*');
            return resultado;
        } catch (error) {
            throw error;
        }
    }
    async listarPorId(idCarrito) {
        try {
            let mensajes = await knex('carrito').where({id: idCarrito});
            return mensajes;
        } catch (error) {
            throw error;
        }
    }
   
    async guardar(carrito) {
        try {
            let timestamp = new Date().toLocaleString();
            let resultado = await knex('carrito').insert(carrito);
            return resultado;
        } catch (error) {
            throw error;
        }
    }
    
    async borrar(idCarrito) {
        try {
            let resultado = await knex('carrito').where({id: idCarrito}).del()
            return resultado;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = new Carrito();

// usamos la función requiere para cargar el modulo db.config.js para traer los parametros preconfigurados de la BD
const dbConfig = require("../config/db.config.js");
// cargamos el modulo sequelize "ORM" para el manejo de las entidades como objetos. 
const Sequelize = require("sequelize");
// creamos una variable sequelize y la inicializamos como un Objeto Sequelize con la informacion de la BD 

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
    // si utilizamos una BD externa, probablemente nos pida ssl = true, cambios la linea de reject por la que esta comentada
    /* ssl:{ requiere: true}*/
    
  }
});
// creamos un objeto db
const db = {};
// la variable db.Sequelize = modulo importado Sequelize que esta declarado previamente donde se importa el modulo
db.Sequelize = Sequelize;
// se define una variable con la configuracion de sequelize
db.sequelize = sequelize;
// se crea una variable clientes que importa el modelo que esta dentro de la carpeta models/cliente.model.js

db.canciones =  require("./canciones.model.js")(sequelize,Sequelize);
// puede seguir agregando mas modelos e importarlos de la seguiente manera
//db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
// se utiliza el export para que el objeto db pueda ser accedio a travez de otras clases. 

module.exports = db;
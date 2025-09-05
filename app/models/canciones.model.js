//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "cancion"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const cancion = sequelize.define("cancion", {
        nombre: {
            type: Sequelize.STRING
        },
        descrpcion: {
            type: Sequelize.STRING
        },
        artista: {
            type: Sequelize.STRING
        },
        duracion: {
            type: Sequelize.INTEGER
        },
        extension: {
            type: Sequelize.STRING
        },
        album:{
            type: Sequelize.STRING
        },
        lanzamiento: {
            type: Sequelize.STRING
        }
    });
    return cancion;
};
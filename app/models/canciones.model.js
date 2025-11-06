module.exports = (sequelize, Sequelize) => {
    const cancion = sequelize.define("cancion", {
        nombre: {
            type: Sequelize.STRING
        },
       
        descripcion: {
            type: Sequelize.STRING,
            field: "descrpcion"   // mapea a la columna vieja
        },
        artista: {
            type: Sequelize.STRING
        },
        duracion: {
            type: Sequelize.INTEGER
        },
       
        extension: {
            type: Sequelize.STRING,
            field: "extencion"
        },
        
        album: {
            type: Sequelize.STRING
        },
        lanzamiento: {
            type: Sequelize.STRING
        }
    });

    return cancion;
};

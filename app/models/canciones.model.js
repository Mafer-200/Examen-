// models/cancion.model.js
module.exports = (sequelize, Sequelize) => {
  const cancion = sequelize.define("cancion", {
    nombre:      { type: Sequelize.STRING },

    // 👇 El atributo lógico "descripcion" apunta a la columna real "descrpcion"
    descripcion: { type: Sequelize.STRING, field: "descrpcion" },

    artista:     { type: Sequelize.STRING },
    duracion:    { type: Sequelize.INTEGER },

    // La columna correcta para extensión en tu DB es "extension"
    extension:   { type: Sequelize.STRING, field: "extension" },

    album:       { type: Sequelize.STRING },
    lanzamiento: { type: Sequelize.STRING },
    // Si NO tienes status en la tabla, no lo declares.
    // status:   { type: Sequelize.BOOLEAN }
  });

  return cancion;
};


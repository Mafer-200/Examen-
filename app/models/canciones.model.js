module.exports = (sequelize, Sequelize) => {
  const cancion = sequelize.define("cancion", {
    nombre: { type: Sequelize.STRING },

    // Si en tu DB la columna correcta es "descripcion", usa field: "descripcion".
    // Si tu DB aún tiene "descrpcion", cámbialo a field: "descrpcion".
    descripcion: { type: Sequelize.STRING, field: "descripcion" },

    artista: { type: Sequelize.STRING },
    duracion: { type: Sequelize.INTEGER },

    // 🔴 Importante: usa la columna correcta de tu DB
    extension: { type: Sequelize.STRING, field: "extension" },

    album: { type: Sequelize.STRING },
    lanzamiento: { type: Sequelize.STRING }
  });

  return cancion;
};

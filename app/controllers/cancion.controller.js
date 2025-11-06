// controllers/cancion.controller.js
const db = require("../models");
const cancion = db.canciones;           // Asegúrate que en models/index.js exportas "canciones"
const { Op } = db.Sequelize;

/** Normaliza el payload entrante para tolerar typos/aliases del frontend */
function normalizeCancionPayload(body = {}) {
  return {
    nombre: body.nombre ?? null,
  
    descripcion: body.descripcion ?? body.descrpcion ?? null,

    artista: body.artista ?? null,
    duracion: body.duracion ?? null,

    // atributo correcto: "extension" (si tu modelo tiene extencion, ajusta abajo)
    extension: body.extension ?? body.extencion ?? null,

    // atributo correcto: "album"
    album: body.album ?? body.albun ?? null,

    lanzamiento: body.lanzamiento ?? null,

    // Si decides tener status (boolean), permite sobreescritura
    ...(body.status !== undefined ? { status: body.status } : {})
  };
}

// Create and Save a new Cancion
exports.create = async (req, res) => {
  try {
    if (!req.body || !req.body.nombre) {
      return res.status(400).send({ message: "El nombre es requerido." });
    }

    const payload = normalizeCancionPayload(req.body);
    const data = await cancion.create(payload);
    return res.status(201).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Ocurrió un error creando la canción."
    });
  }
};

// Retrieve all from the database (?nombre=...)
exports.findAll = async (req, res) => {
  try {
    const nombre = req.query.nombre;
    const where = nombre
      ? { nombre: { [Op.iLike]: `%${nombre}%` } } // requiere Postgres
      : undefined;

    const data = await cancion.findAll({ where });
    return res.send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Ocurrió un error listando canciones."
    });
  }
};

// Find one by nombre (param)
exports.findOne = async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const data = await cancion.findOne({ where: { nombre } });

    if (!data) {
      return res
        .status(404)
        .send({ message: `No se encontró la canción con nombre=${nombre}` });
    }
    return res.send(data);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error recuperando canción con nombre=" + req.params.nombre });
  }
};

// Update by id
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    // Normaliza para que aunque llegue "extencion"/"descrpcion" se guarde bien
    const payload = normalizeCancionPayload(req.body);

    const [count] = await cancion.update(payload, { where: { id } });
    if (count === 1) {
      return res.send({ message: "Canción actualizada correctamente." });
    } else {
      return res
        .status(404)
        .send({ message: `No se pudo actualizar. ¿Existe la canción id=${id}?` });
    }
  } catch (err) {
    return res.status(500).send({ message: "Error actualizando id=" + req.params.id });
  }
};

// Delete by id
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const count = await cancion.destroy({ where: { id } });
    if (count === 1) {
      return res.send({ message: "Canción eliminada correctamente." });
    } else {
      return res
        .status(404)
        .send({ message: `No se pudo eliminar. Canción id=${id} no encontrada.` });
    }
  } catch (err) {
    return res.status(500).send({ message: "Error eliminando id=" + req.params.id });
  }
};

// Delete all
exports.deleteAll = async (req, res) => {
  try {
    const nums = await cancion.destroy({ where: {}, truncate: false });
    return res.send({ message: `${nums} canciones eliminadas.` });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Ocurrió un error eliminando todas las canciones."
    });
  }
};

// find all where status = true (si tienes la columna 'status')
exports.findAllStatus = async (req, res) => {
  try {
    // Si NO tienes la columna status en tu modelo/tabla, comenta/borra esta acción.
    const data = await cancion.findAll({ where: { status: true } });
    return res.send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Ocurrió un error listando canciones activas."
    });
  }
};

// controllers/cancion.controller.js
const db = require("../models");

// Tolera export en singular o plural
const cancion = db.cancion || db.canciones;
const Op = db.Sequelize.Op;

// Elegir operador LIKE según el dialecto
const LIKE_OP = Op.iLike ? Op.iLike : Op.like;

/** Devuelve un objeto sin propiedades undefined */
function pickDefined(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj || {})) {
    if (v !== undefined) out[k] = v;
  }
  return out;
}

/** Normaliza body: acepta 'extencion'/'descrpcion' y las mapea a nombres correctos */
function normalizeCancionPayload(body = {}) {
  const descripcion = body.descripcion ?? body.descrpcion;
  const extension   = body.extension   ?? body.extencion;
  const album       = body.album       ?? body.albun;

  let duracion = body.duracion;
  if (duracion != null && duracion !== "") {
    const n = Number(duracion);
    duracion = Number.isFinite(n) ? n : undefined;
  } else {
    duracion = undefined;
  }

  return pickDefined({
    nombre: body.nombre,
    descripcion,
    artista: body.artista,
    duracion,
    extension,
    album,
    lanzamiento: body.lanzamiento,
    // status: body.status, // descomenta si tienes la columna en la tabla
  });
}

// ==============================
// Create
// ==============================
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

// =========================================
// Find All (?nombre=...)
// =========================================
exports.findAll = async (req, res) => {
  try {
    const { nombre } = req.query;
    const where = nombre
      ? { nombre: { [LIKE_OP]: `%${nombre}%` } }
      : undefined;

    const data = await cancion.findAll({ where });
    return res.send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Ocurrió un error listando canciones."
    });
  }
};

// ===============================
// Find One by nombre
// ===============================
exports.findOne = async (req, res) => {
  try {
    const { nombre } = req.params;
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

// ===============================
// Update by id
// ===============================
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
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

// ===============================
// Delete by id
// ===============================
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
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

// ===============================
// Delete All
// ===============================
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

// ===============================
// Find All Status = true (si existe columna)
// ===============================
exports.findAllStatus = async (req, res) => {
  try {
    const data = await cancion.findAll({ where: { status: true } });
    return res.send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Ocurrió un error listando canciones activas."
    });
  }
};

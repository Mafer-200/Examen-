module.exports = app => {
    const cancion = require("../controllers/cancion.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create", cancion.create);
    // Retrieve all Client
    router.get("/", cancion.findAll);
    // Retrieve all published Client
    router.get("/status", cancion.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", cancion.findOne);
    // Update a Client with id
    router.put("/update/:id", cancion.update);
    // Delete a Client with id
    router.delete("/delete/:id", cancion.delete);
    // Delete all canciones
    router.delete("/delete/", cancion.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cancion/
    app.use("/api/song", router);
};
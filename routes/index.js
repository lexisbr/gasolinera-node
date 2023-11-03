const { Router } = require('express');
const router = Router();

const clientesController = require('../controllers/clientesController');

router.get("/consultar-puntos/:nitCliente", clientesController.consultarPuntos);
router.get("/:nitCliente", clientesController.obtenerIdCliente);
router.put("/canjear-puntos", clientesController.canjearPuntos);
router.put("/acumular-puntos", clientesController.acumularPuntos);


module.exports = function(app) {
    app.use('/clientes', router);
}
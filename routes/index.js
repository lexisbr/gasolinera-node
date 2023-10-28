const { Router } = require('express');
const router = Router();

const transaccionesController = require('../controllers/clientesController');

router.get("/consultar-puntos/:idCliente", transaccionesController.consultarPuntos);
router.put("/canjear-puntos", transaccionesController.canjearPuntos);
router.put("/acumular-puntos", transaccionesController.acumularPuntos);


module.exports = function(app) {
    app.use('/clientes', router);
}
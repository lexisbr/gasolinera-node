const db = require("../models");
const Cliente = db.cliente;

exports.consultarPuntos = async (req, res) => {
  try {
    const nit = req.params.nitCliente;
    const cliente = await Cliente.findOne({
      where: { nit: nit },
    });
    if (cliente === null) {
      return res.status(400).json({ message: "El cliente no existe" });
    }

    const puntos = await Cliente.findOne({
      attributes: ["puntos", "id_cliente"],
      where: {
        nit: nit,
      },
    });

    return res.status(200).json(puntos.puntos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.canjearPuntos = async (req, res) => {
  try {
    const { idCliente, puntosCanje } = req.body;
    const cliente = await Cliente.findOne({
      where: { id_cliente: idCliente },
    });
    if (cliente === null) {
      return res.status(400).json({ message: "El cliente no existe" });
    }

    const puntosActuales = await Cliente.findOne({
      attributes: ["puntos"],
      where: {
        id_cliente: idCliente,
      },
    });

    let nuevosPuntos = 0;
    if (puntosActuales.dataValues.puntos > puntosCanje) {
      nuevosPuntos = puntosActuales.dataValues.puntos - puntosCanje; 
      precioPorPagar = 0;
    } else {
      precioPorPagar = puntosCanje - puntosActuales.dataValues.puntos;
    }


    await Cliente.update(
      {
        puntos: nuevosPuntos,
      },
      {
        where: {
          id_cliente: idCliente,
        },
      }
    );

    return res.status(200).json({ success: true, message: precioPorPagar });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.acumularPuntos = async (req, res) => {
  try {
    console.log(req.body);
    const { idCliente, galonesComprados } = req.body;
    const cliente = await Cliente.findOne({
      where: { id_cliente: idCliente },
    });
    console.log(cliente);
    if (cliente === null) {
      return res.status(400).json({ message: "El cliente no existe" });
    }

    const puntosActuales = await Cliente.findOne({
      attributes: ["puntos"],
      where: {
        id_cliente: idCliente,
      },
    });

    const puntosAcumular = galonesComprados / 5;

    const nuevosPuntos = puntosActuales.dataValues.puntos + puntosAcumular;

    await Cliente.update(
      {
        puntos: nuevosPuntos,
      },
      {
        where: {
          id_cliente: idCliente,
        },
      }
    );

    return res
      .status(200)
      .json({ success: true, message: "Se han acumulado los puntos" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.obtenerIdCliente = async (req, res) => {
  try {
    const nitCliente = req.params.nitCliente;
    const cliente = await Cliente.findOne({
      where: { nit: nitCliente },
    });
    if (cliente === null) {
      return res.status(400).json({ message: "El cliente no existe" });
    }

    return res.status(200).json(cliente.id_cliente);
  } catch (error) {}
};

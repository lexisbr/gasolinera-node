const db = require("../models");
const Cliente = db.cliente;

exports.consultarPuntos = async (req, res) => {
  try {
    const idCliente = req.params.idCliente;
    const cliente = await Cliente.findOne({
      where: { id_cliente: idCliente },
    });
    if (cliente === null) {
      return res.status(400).json({ message: "El cliente no existe" });
    }

    const puntos = await Cliente.findOne({
      attributes: ["puntos"],
      where: {
        id_cliente: idCliente,
      },
    });

    return res.status(200).json(puntos);
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

    if (puntosActuales.dataValues.puntos < puntosCanje) {
      return res
        .status(400)
        .json({ message: "El cliente no tiene suficientes puntos" });
    }

    const nuevosPuntos = puntosActuales.dataValues.puntos - puntosCanje;

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

    return res.status(200).json("Se han canjeado los puntos");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
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

    return res.status(200).json("Se han acumulado los puntos");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
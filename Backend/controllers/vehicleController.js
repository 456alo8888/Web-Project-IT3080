import db from "../models/index.js"
const { VehicleType } = db

export async function getVehicleTypes(req, res) {
  try {
    const vehicleTypes = await VehicleType.findAll({
      attributes: ['id', 'name'],
    });

    res.status(200).json({
      data: vehicleTypes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
}
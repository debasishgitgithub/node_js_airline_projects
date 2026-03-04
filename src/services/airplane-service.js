const { AirplaneRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    const airplane = await airplaneRepository.create(data);
    if (!airplane) {
        throw new AppError('Airplane not created');
    }

    return airplane;
}

async function updateAirplane(data) {
    const airplane = await airplaneRepository.update(data);
    return airplane;
}


async function getAllAirplane() {
    const data = await airplaneRepository.getAll();
    return data;
}

async function getAirplane(id) {
    const data = await airplaneRepository.get(id);
    return data;
}

async function deleteAirplane(id) {
    const data = await airplaneRepository.delete({ id });
    return data;

}

module.exports = {
    createAirplane,
    getAllAirplane,
    getAirplane,
    deleteAirplane,
    updateAirplane
}
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const { AirportRepository } = require('../repositories');


const airportRepository = new AirportRepository();

async function createAirport(data) {
    const airport = await airportRepository.create(data);
    return airport;
}

async function getAirports() {
    const airports = await airportRepository.getAll();
    return airports;
}

async function getAirport(id) {
    const airport = await airportRepository.get(id);
    if (!airport) {
        throw new AppError('Airport not found', StatusCodes.BAD_REQUEST);
    }
    return airport;
}

async function destroyAirport(id) {
    const response = await airportRepository.destroy(id);
    return response;

}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport
}
const { StatusCodes } = require('http-status-codes');

const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function create(data) {
    const city = await cityRepository.create(data);
    if (!city) {
        throw new AppError('City not created', StatusCodes.BAD_REQUEST);
    }
    return city;
}

async function getAll() {
    const data = await cityRepository.getAll();
    return data;
}

async function get(id) {
    const data = await cityRepository.get(id);
    if (!data) {
        throw new AppError('City not found', StatusCodes.BAD_REQUEST);
    }
    return data;
}

async function findOne(options) {
    const data = await cityRepository.findOne(options);
    if (!data) {
        throw new AppError('City not found', StatusCodes.BAD_REQUEST);
    }
    return data;
}

module.exports = {
    create,
    getAll,
    get,
    findOne
}
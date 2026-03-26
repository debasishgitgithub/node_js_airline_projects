const { StatusCodes } = require('http-status-codes');

const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

class CityService {
    constructor() {
        this.cityRepository = new CityRepository();
    }

    async create(data) {
        if(!data.name) {
            throw new AppError('Name is required', StatusCodes.BAD_REQUEST);
        }
        const city = await this.cityRepository.create(data);
        if (!city) {
            throw new AppError('City not created', StatusCodes.BAD_REQUEST);
        }
        return city;
    }

    async getAll() {
        const data = await this.cityRepository.getAll();
        return data;
    }

    async get(id) {
        const data = await this.cityRepository.get(id);
        if (!data) {
            throw new AppError('City not found', StatusCodes.BAD_REQUEST);
        }
        return data;
    }

    async findOne(options) {
        const data = await this.cityRepository.findOne(options);
        if (!data) {
            throw new AppError('City not found', StatusCodes.BAD_REQUEST);
        }
        return data;
    }
}


module.exports = CityService;
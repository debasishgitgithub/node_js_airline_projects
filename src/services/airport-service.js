const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const { AirportRepository } = require('../repositories');


class AirportService {
    constructor() {
        this.airportRepository = new AirportRepository();
    }


    async create(data) {
        const airport = await this.airportRepository.create(data);
        return airport;
    }

    async getAll() {
        const airports = await this.airportRepository.getAll();
        return airports;
    }

    async get(id) {
        const airport = await this.airportRepository.get(id);
        if (!airport) {
            throw new AppError('Airport not found', StatusCodes.BAD_REQUEST);
        }
        return airport;
    }

    async destroy(id) {
        const response = await this.airportRepository.destroy(id);
        return response;

    }
}

module.exports = AirportService;
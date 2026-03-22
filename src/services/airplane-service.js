const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');


class AirplaneService {
    constructor() {
        this.airplaneRepository = new AirplaneRepository();
    }

    async create(data) {
        const airplane = await this.airplaneRepository.create(data);
        if (!airplane) {
            throw new AppError('Airplane not created');
        }

        return airplane;
    }

    async update(data) {

        return await this.airplaneRepository.update(data);
    }


    async getAll() {
        const data = await this.airplaneRepository.getAll();
        return data;
    }

    async get(id) {
        const data = await this.airplaneRepository.get(id);
        return data;
    }

    async delete(id) {
        const data = await this.airplaneRepository.delete({ id });
        return data;

    }
}

module.exports = AirplaneService;
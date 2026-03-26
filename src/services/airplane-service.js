const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { ServerConfig } = require('../config');


class AirplaneService {
    constructor() {
        this.airplaneRepository = new AirplaneRepository();
    }

    async create(data) {
        let airplane = await this.airplaneRepository.create(data);
        airplane = airplane.toJSON();
        airplane.full_file_url =  airplane.file_url ? `${ServerConfig.BASE_URL}\\${airplane.file_url}` : null
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
        const formatted = data.map(a => ({
            ...a.dataValues,
            full_file_url: a.file_url ? `${ServerConfig.BASE_URL}\\${a.file_url}` : null
        }));
        return formatted;
    }

    async get(id) {
        let data = await this.airplaneRepository.get(id);
        data = data.toJSON();
        data.full_file_url =  data.file_url ? `${ServerConfig.BASE_URL}\\${data.file_url}` : null
        return data;
    }

    async delete(id) {
        const data = await this.airplaneRepository.delete({ id });
        return data;

    }
}

module.exports = AirplaneService;
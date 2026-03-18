const { Logger } = require('../config');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async delete(data) {
        const response = await this.model.destroy({
            where: data
        });
        return response;
    }

    async get(data) {
        const response = await this.model.findByPk(data);
        return response;

    }
    async findOne(data) {
        const response = await this.model.findOne(data);
        return response;

    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async update(data) {
        const response = await this.model.update(data, {
            where: {
                id: data.id
            }
        });
        return response;
    }

}

module.exports = CrudRepository;
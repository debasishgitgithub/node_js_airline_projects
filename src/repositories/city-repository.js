const CrudRepository = require('./crud-repository');
const { City } = require('../models');
const { Airport } = require('../models');


class CityRepository extends CrudRepository {
    constructor() {
        super(City);
    }

    async getAll() {
        const response = await this.model.findAll({include: Airport});
        return response;
    }
}

module.exports = CityRepository;
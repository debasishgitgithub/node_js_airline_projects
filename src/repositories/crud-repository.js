const { Logger } = require('../config');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        console.log("Inside create repo");
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Repo create');
            throw error;
        }
    }

    async delete(data) {
        try {
            const response = await this.model.destroy({
                where: data
            });
            return response;
        } catch (error) {
            // console.log(error);
            Logger.error('Something went wrong in the Crud Repo delete');
            throw error;
        }
    }

    async get(data) {
        try {
            const response = await this.model.findByPk(data);
            return response;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Repo get');
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Repo getAll');
            throw error;
        }
    }

    async update(data) {
        try {
            const response = await this.model.update(data, {
                where: {
                    id: data.id
                }
            });
            return response;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Repo update');
            throw error;
        }
    }

}

module.exports = CrudRepository;
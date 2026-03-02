const { AirplaneRepository } = require('../repositories');
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        throw error;
    }
}

async function updateAirplane(data) {
    try {
        const airplane = await airplaneRepository.update(data);
        return airplane;
    } catch (error) {
        throw error;
    }
}


async function getAllAirplane() {
    try {
        const data = await airplaneRepository.getAll();
        return data;
    } catch (error) {
        throw error;
    }
}

async function getAirplane(id) {
    try {
        const data = await airplaneRepository.get(id);
        return data;
    } catch (error) {
        throw error;
    }
}

async function deleteAirplane(id) {
    try {
        const data = await airplaneRepository.delete({id});
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createAirplane,
    getAllAirplane,
    getAirplane,
    deleteAirplane,
    updateAirplane
}
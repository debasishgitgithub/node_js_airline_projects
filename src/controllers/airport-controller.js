const { StatusCodes } = require('http-status-codes');

const { AirportService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const airportService = new AirportService();

/**
 * POST : /airports 
 * req-body {name: 'IGI', cityId: 5, code: 'DEL'}
 */
async function createAirport(req, res, next) {
    try {
        const airport = await airportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });
        SuccessResponse.data = airport;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        next(error);
    }
}


/**
 * POST : /airports
 * req-body {}
 */
async function getAirports(req, res, next) {
    try {
        const airports = await airportService.getAll();
        SuccessResponse.data = airports;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
       next(error);
    }
}

/**
 * POST : /airports/:id 
 * req-body {}
 */
async function getAirport(req, res, next) {
    try {
        const airports = await airportService.get(req.params?.id);
        SuccessResponse.data = airports;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        next(error);
    }
}

/**
 * DELETE : /airports/:id
 * req-body {}
 */
async function destroyAirport(req, res, next) {
    try {
        const response = await airportService.destroy(req.params.id);
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
       next(error);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport
}
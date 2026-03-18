const { StatusCodes } = require('http-status-codes');

const { CityService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { Airport } = require('../models');


/**
 * POST : /cities 
 * req-body {name: 'London'}
 */
async function create(req, res, next) {
    try {
        const city = await CityService.create({
            name: req.body?.name
        });
        SuccessResponse.data = city;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        next(error);
    }
}

const getAll = async (req, res, next) => {
    try {
        const data = await CityService.getAll();
        SuccessResponse.data = data;
        SuccessResponse.message = "Successfully fetch an airplane";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        next(error);   // pass to global error handler
    }
}

const get = async (req, res, next) => {
    try {
        const id = req.params.id;
        let options  = {
            where:{
                id
            },
            include: Airport
        }
        // const data = await CityService.get(id);
        const data = await CityService.findOne(options);
        const airports = await data.getAirports();
        // console.log('test-------------')
        console.log(airports);
        SuccessResponse.data = data;
        SuccessResponse.message = "Successfully fetch an airplane";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        next(error);   // pass to global error handler
    }
}



module.exports = {
    create,
    getAll,
    get
}
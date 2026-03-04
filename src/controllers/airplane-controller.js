const { createAirplane, getAllAirplane, getAirplane, deleteAirplane, updateAirplane } = require('../services/airplane-service');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const { success } = require('../utils/common/error-response');
const logger = require('../config/logger-config');


const createAirplaneController = async (req, res, next) => {
    try {
        const airplane = await createAirplane({
            modelNumber: req.body?.modelNumber,
            capacity: req.body?.capacity
        });
        SuccessResponse.data = airplane;
        SuccessResponse.message = "Successfully create an airplane";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        next(error);   // pass to global error handler
    }
}

const updateAirplaneController = async (req, res, next) => {
    try {
        const airplane = await updateAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity,
            id: req.params.id
        });

        if (!airplane) {
            ErrorResponse.message = "Airplane not found";
            return res
                .status(StatusCodes.NOT_FOUND)
                .json(ErrorResponse);
        }

        SuccessResponse.data = airplane;
        SuccessResponse.message = "Successfully update an airplane";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        next(error);   // pass to global error handler
    }
}

const getAllAirplaneController = async (req, res, next) => {
    try {
        const airplane = await getAllAirplane();
        SuccessResponse.data = airplane;
        SuccessResponse.message = "Successfully fetch an airplane";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        next(error);   // pass to global error handler
    }
}

const getByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const airplane = await getAirplane(id);

        if (!airplane) {
            ErrorResponse.message = "Airplane not found";
            return res
                .status(StatusCodes.NOT_FOUND)
                .json(ErrorResponse);
        }


        SuccessResponse.data = airplane;
        SuccessResponse.message = "Successfully fetch an airplane";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        next(error);   // pass to global error handler
    }
}

const deleteByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const airplane = await deleteAirplane(id);

        if (!airplane) {
            ErrorResponse.message = "Airplane not found";
            return res
                .status(StatusCodes.NOT_FOUND)
                .json(ErrorResponse);
        }


        SuccessResponse.data = airplane;
        SuccessResponse.message = "Successfully fetch an airplane";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        next(error);   // pass to global error handler
    }
}

module.exports = {
    createAirplaneController,
    getAllAirplaneController,
    getByIdController,
    deleteByIdController,
    updateAirplaneController
}
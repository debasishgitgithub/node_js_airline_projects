const { createAirplane, getAllAirplane, getAirplane, deleteAirplane, updateAirplane } = require('../services/airplane-service');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const { success } = require('../utils/common/error-response');
const logger = require('../config/logger-config');


const createAirplaneController = async (req, res) => {
    try {
        const airplane = await createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
        SuccessResponse.message = "Successfully create an airplane";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while creating an airplane";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

const updateAirplaneController = async (req, res) => {
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
        console.log(error);
        ErrorResponse.message = "Something went wrong while updating an airplane";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

const getAllAirplaneController = async (req, res) => {
    try {
        const airplane = await getAllAirplane();
        SuccessResponse.data = airplane;
        SuccessResponse.message = "Successfully fetch an airplane";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while getting an airplane";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

const getByIdController = async (req, res) => {
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
        ErrorResponse.message = "Something went wrong while getting an airplane";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

const deleteByIdController = async (req, res) => {
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
        ErrorResponse.message = "Something went wrong while deleting an airplane";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createAirplaneController,
    getAllAirplaneController,
    getByIdController,
    deleteByIdController,
    updateAirplaneController
}
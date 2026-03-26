const { createAirplane, getAllAirplane, getAirplane, deleteAirplane, updateAirplane } = require('../services/airplane-service');
const { AirplaneService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const logger = require('../config/logger-config');
const fs = require('fs');
const path = require('path');

const airplaneService = new AirplaneService();


const createAirplaneController = async (req, res, next) => {
    try {
        console.log(req.body)
        // validate file
        if (!req.file) {
            ErrorResponse.message = 'Something went wrong while uploading image airplane';
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }

        const airplane = await airplaneService.create({
            modelNumber: req.body?.modelNumber,
            capacity: req.body?.capacity,
            file_url: req.file.path.split(path.sep).join('/')
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

        let insertAbleData = {
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity,
            id: req.params.id
        };

        // get old data from DB
        const airplane = await airplaneService.get(insertAbleData.id);

        if (!airplane) {
            throw new AppError('Airplane not found');
        }
        console.log(airplane);

        // if new file uploaded
        if (req.file) {
            // delete old file
            if (airplane.file_url) {
                const oldPath = path.join(__dirname, '../../', airplane.file_url);
                console.log(oldPath)
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            insertAbleData.file_url = req.file.path.split(path.sep).join('/')
        }

        const airplaneUpdate = await airplaneService.update(insertAbleData);

        if (!airplaneUpdate) {
            ErrorResponse.message = "Airplane not found";
            return res
                .status(StatusCodes.NOT_FOUND)
                .json(ErrorResponse);
        }

        SuccessResponse.data = airplaneUpdate;
        SuccessResponse.message = "Successfully update an airplane";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        next(error);   // pass to global error handler
    }
}

const getAllAirplaneController = async (req, res, next) => {
    try {
        const airplane = await airplaneService.getAll();
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
        const airplane = await airplaneService.get(id);

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

        // get old data from DB
        const airplaneData = await airplaneService.get(id);

        if (!airplaneData) {
            throw new AppError('Airplane not found');
        }


        if (airplaneData.file_url) {
            const oldPath = path.join(__dirname, '../../', airplaneData.file_url);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }


        if (await airplaneService.delete(id)) {

            SuccessResponse.data = null;
            SuccessResponse.message = "Successfully delete an airplane";
            return res.status(StatusCodes.CREATED).json(SuccessResponse);

        } else {
            ErrorResponse.message = "Airplane not found";
            return res
                .status(StatusCodes.NOT_FOUND)
                .json(ErrorResponse);
        }
    } catch (error) {
        next(error);   // pass to global error handler
    }
}

//  < ------- this is for WEB routes  ------- > //


async function create_form(req, res, next) {
    return res.render('airplane/create');
}


module.exports = {
    createAirplaneController,
    getAllAirplaneController,
    getByIdController,
    deleteByIdController,
    updateAirplaneController,
    create_form
}
const { body } = require('express-validator');
const { checkExists } = require('./custom-validator');
const { Airplane, Airport } = require('../models');

module.exports = {
    createFormValidator: [
        body('flightNumber')
            .notEmpty().withMessage('Flight number is required')
            .isString().withMessage('Flight number must be a string'),

        body('airplaneId')
            .notEmpty().withMessage('Airplane ID is required')
            .custom(checkExists(Airplane, 'id', 'Airplane')),

        body('departureAirportId')
            .notEmpty().withMessage('Departure airport ID is required')
            .custom(checkExists(Airport, 'code', 'Departure airport code')),

        body('arrivalAirportId')
            .notEmpty().withMessage('Arrival airport ID is required')
            .custom(checkExists(Airport, 'code', 'Arrival airport code')),

        body('departureTime')
            .notEmpty().withMessage('Departure time is required')
            .isISO8601().withMessage('Departure time must be a valid datetime'),

        body('arrivalTime')
            .notEmpty().withMessage('Arrival time is required')
            .isISO8601().withMessage('Arrival time must be a valid datetime'),

        body('price')
            .notEmpty().withMessage('Price is required')
            .isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),

        // body('boardingGate')
        //     .notEmpty().withMessage('Boarding gate is required')
        //     .isString().withMessage('Boarding gate must be a string')
    ]
};



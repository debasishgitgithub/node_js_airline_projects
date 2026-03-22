const { StatusCodes } = require('http-status-codes');

const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const flightService = new FlightService();

/**
 * POST : /flights 
 * req-body {
 *  flightNumber: 'UK 808',
 *  airplaneId: 'a380',
 *  departureAirportId: 12,
 *  arrivalAirportId: 11,
 *  arrivalTime: '11:10:00',
 *  departureTime: '9:10:00',
 *  price: 2000
 *  boardingGate: '12A',
 *  totalSeats: 120
 * }
 */
async function createFlight(req, res, next) {
    try {
        const flight = await flightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate
        });
        SuccessResponse.data = flight;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
       next(error);
    }
}

async function getAllFlights(req, res, next) {
    try {
        const flights = await flightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
       next(error);
    }
}

/**
 * POST : /flights/:id 
 * req-body {}
 */
async function getFlight(req, res, next) {
    try {
        const flight = await flightService.getFlight(req.params.id);
        SuccessResponse.data = flight;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        next(error);
    }
}

async function updateSeats(req, res, next) {
    try {
        console.log(req.body);
        const response = await flightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats, 
            dec: req.body.dec
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        next(error);
    }
}


module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}
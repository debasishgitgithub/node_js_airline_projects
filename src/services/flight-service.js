const { Op } = require('sequelize');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { AirplaneRepository } = require('../repositories');

class FlightService {
    constructor() { 
        this.flightRepository = new FlightRepository();
        this.airplaneRepository = new AirplaneRepository();
    }

    async createFlight(data) {
        const airplaneDetails = await this.airplaneRepository.get(data.airplaneId);
        if (!airplaneDetails) throw new AppError('Airplane not found', StatusCodes.BAD_REQUEST);
        data.totalSeats = airplaneDetails.capacity;
        // console.log(data);
        // return false;
        const flight = await this.flightRepository.create(data);
        return flight;
    }

    async getAllFlights(query) {
        let customFilter = {};
        let sortFilter = [];
        const endingTripTime = " 23:59:00";
        // trips=MUM-DEL
        if (query.trips) {

            [departureAirportId, arrivalAirportId] = query.trips.split("-");
            customFilter.departureAirportId = departureAirportId;
            customFilter.arrivalAirportId = arrivalAirportId;
            // TODO: add a check that they are not same
        }
        if (query.price) {
            [minPrice, maxPrice] = query.price.split("-");
            customFilter.price = {
                [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000 : maxPrice)]
            }
        }
        if (query.travellers) {
            customFilter.totalSeats = {
                [Op.gte]: query.travellers
            }
        }
        if (query.tripDate) {
            customFilter.departureTime = {
                [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
            }
        }
        if (query.sort) {
            const params = query.sort.split(',');
            const sortFilters = params.map((param) => param.split('_'));
            sortFilter = sortFilters
        }
        console.log(customFilter, sortFilter);
        // return false

        const flights = await this.flightRepository.getAllFlights(customFilter, sortFilter);
        if (flights.length == 0) {
            throw new AppError('No flights found', 404);
        }
        return flights;

    }

    async getFlight(id) {
        const flight = await this.flightRepository.get(id);
        return flight;
    }

    async updateSeats(data) {
        const response = await this.flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    }
}

module.exports = FlightService
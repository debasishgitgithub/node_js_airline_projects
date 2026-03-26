const InfoController = require('./info-controller');


module.exports = {
    InfoController,
    AirplaneController: require('./airplane-controller'),
    CityController: require('./city-controller'),
    AirportController: require('./airport-controller'),
    FlightController: require('./flight-controller'),
    UserController: require('./user-controller')
}
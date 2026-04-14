const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors, json, printf } = format;

const logger = createLogger({
    format: combine(
        timestamp(),
        // winston.format.timestamp({
        //   format: () => new Date().toLocaleString()
        // }),
        errors({ stack: true }),
        json() // default format for file
    ),
    transports: [
        // Error logs (only errors)
        // new transports.File({
        //     filename: 'logs/error.log',
        //     level: 'error'
        // }),
        // // All logs
        // new transports.File({
        //     filename: 'logs/combined.log'
        // })
        new transports.Console()
    ]
});


// const myFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
//     return `${timestamp} [${level}]: ${stack || message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
// });

// // Console logging (only in development)
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(
//         new transports.Console({
//             format: combine(
//                 timestamp(),
//                 myFormat
//             )
//         })
//     );
// }

module.exports = logger;
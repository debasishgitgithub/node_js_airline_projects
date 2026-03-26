// Using Object.freeze makes sure these values cannot be changed at runtime
module.exports = Object.freeze({
    JWT_SECRET_KEY: "JWT_SECRET_KEY",
    JWT_EXPIRES_TIME: "1D",
    SESSION_SECRET_KEY: "SESSION_SECRET_KEY",
    COOKIE_EXPIRES_TIME: 1000 * 60 * 60
});
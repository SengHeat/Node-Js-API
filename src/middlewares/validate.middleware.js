
const ApiError = require('../utils/ApiError');

module.exports = (schema) => (req, res, next) => {
    const { error } = schema.body.validate(req.body);
    if (error) {
        return next(new ApiError(400, error.details[0].message));
    }
    next();
};

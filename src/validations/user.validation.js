const Joi = require('joi');

const createUser = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        age: Joi.number().min(0).optional()
    })
};

const updateUser = {
    body: Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        age: Joi.number().min(0)
    }).min(1)
};

module.exports = { createUser, updateUser };

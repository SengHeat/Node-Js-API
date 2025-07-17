const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate.middleware');
const userValidation = require('../validations/user.validation');

router
    .route('/')
    .get(userController.getAllUsers)
    .post(validate(userValidation.createUser), userController.createUser);

router
    .route('/paginate')
    .get(userController.getPaginatedUsers);

router
    .route('/:id')
    .get(userController.getUserById)
    .put(validate(userValidation.updateUser), userController.updateUser)
    .delete(userController.deleteUser);


module.exports = router;

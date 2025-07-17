const userRepo = require('../repositories/user.repository');
const ApiError = require('../utils/ApiError');

exports.createUser = async (data) => {
    const existing = await userRepo.findByEmail(data.email);
    if (existing) {
        throw new ApiError(409, 'User already exists with this email');
    }
    return userRepo.create(data);
}
exports.getAllUsers = () => userRepo.findAll();

exports.getUserById = async (id) => {
    const user = await userRepo.findById(id);
    if (!user) throw new ApiError(404, 'User not found');
    return user;
};

exports.updateUser = async (id, data) => {
    const user = await userRepo.update(id, data);
    if (!user) throw new ApiError(404, 'User not found');
    return user;
};

exports.deleteUser = async (id) => {
    const deleted = await userRepo.remove(id);
    if (!deleted) throw new ApiError(404, 'User not found');
};

exports.getPaginatedUsers = (queryParams, baseUrl) => {
    const page = queryParams.page || 1;
    const limit = queryParams.limit || 15;

    return userRepo.paginate({}, { page, limit }, baseUrl, queryParams);
};
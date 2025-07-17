const User = require('../models/user.model');
const paginator = require('../utils/paginator');

exports.create = (data) => User.create(data);

exports.findAll = () => User.findAll();

exports.findById = (id) => User.findByPk(id);

exports.findByEmail = (email) => User.findOne({ where: { email } });

exports.update = async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(data);
};

exports.remove = async (id) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
};

exports.findAllByAge = (age) => User.findAll({ where: { age } });

exports.paginate = async (query, options, baseUrl, originalQuery) => {
    const { where, limit, offset, order, paginationMeta } = paginator.paginate(query, options);

    const { count, rows } = await User.findAndCountAll({
        where,
        limit,
        offset,
        order
    });

    return paginator.formatLaravelStyleResult({
        rows,
        count,
        page: paginationMeta.page,
        limit: paginationMeta.limit,
        query: originalQuery,
        baseUrl
    });
};



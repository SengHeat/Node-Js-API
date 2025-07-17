const buildPaginationLinks = (baseUrl, page, totalPages, query) => {
    const getPageUrl = (pageNumber) => {
        const params = new URLSearchParams({ ...query, page: pageNumber });
        return `${baseUrl}?${params.toString()}`;
    };

    return {
        first: getPageUrl(1),
        last: getPageUrl(totalPages),
        prev: page > 1 ? getPageUrl(page - 1) : null,
        next: page < totalPages ? getPageUrl(page + 1) : null,
    };
};

const buildPageButtonLinks = (baseUrl, totalPages, currentPage, query) => {
    const getPageUrl = (pageNumber) => {
        const params = new URLSearchParams({ ...query, page: pageNumber });
        return `${baseUrl}?${params.toString()}`;
    };

    const buttons = [];

    buttons.push({
        url: currentPage > 1 ? getPageUrl(currentPage - 1) : null,
        label: '&laquo; Previous',
        active: false
    });

    for (let i = 1; i <= totalPages; i++) {
        buttons.push({
            url: getPageUrl(i),
            label: `${i}`,
            active: i === currentPage
        });
    }

    buttons.push({
        url: currentPage < totalPages ? getPageUrl(currentPage + 1) : null,
        label: 'Next &raquo;',
        active: false
    });

    return buttons;
};

module.exports = {
    paginate: (query = {}, options = {}) => {
        const page = Math.max(parseInt(options.page) || 1, 1);
        const limit = Math.max(parseInt(options.limit) || 15, 1);
        const offset = (page - 1) * limit;

        return {
            where: query.where || {},
            limit,
            offset,
            order: options.order || [['created_at', 'DESC']],
            paginationMeta: { page, limit }
        };
    },

    formatLaravelStyleResult: ({ rows, count, page, limit, query, baseUrl }) => {
        const totalPages = Math.ceil(count / limit);

        const from = count > 0 ? (page - 1) * limit + 1 : null;
        const to = count > 0 ? Math.min(page * limit, count) : null;

        return {
            data: rows,
            links: buildPaginationLinks(baseUrl, page, totalPages, query),
            meta: {
                current_page: page,
                from,
                last_page: totalPages,
                links: buildPageButtonLinks(baseUrl, totalPages, page, query),
                path: baseUrl,
                per_page: limit,
                to,
                total: count
            }
        };
    }
};

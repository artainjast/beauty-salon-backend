const limitQuery = (query, limit = 10, offset) => {
    if (limit) {
        query += ` LIMIT ${limit}`;
    }
    if (offset) {
        query += ` OFFSET ${offset} `;
    }
    return query;
};
module.exports = {
    limitQuery
};
//# sourceMappingURL=queryLimit.js.map
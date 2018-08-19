const Artist = require('../models/artist');
const _ = require('lodash');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
    const filterArtist = Artist.find(buildQuery(criteria))
        .sort({ [sortProperty]: 1 })
        .skip(offset)
        .limit(limit);

    return Promise.all([filterArtist, Artist.count()]).then(results => {
        return { all: results[0], count: results[1], offset, limit };
    });
};

function buildQuery(criteria) {
    const query = {};
    const { name, age, yearsActive } = criteria;
    if (name) {
        query.$text = { $search: name };
    }
    if (!_.isEmpty(age)) {
        query['age'] = { $gte: age.min, $lte: age.max };
    }
    if (!_.isEmpty(yearsActive)) {
        query['yearsActive'] = { $gte: yearsActive.min, $lte: yearsActive.max };
    }
    return query;
}

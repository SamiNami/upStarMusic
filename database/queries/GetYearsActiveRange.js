const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
    const findMin = Artist.findOne({})
        .sort({ age: 1 })
        .then(artist => artist.yearsActive);

    const findMax = Artist.findOne({})
        .sort({ age: -1 })
        .then(artist => artist.yearsActive);

    return Promise.all([findMin, findMax]).then(result => {
        return { min: result[0], max: result[1] };
    });
};

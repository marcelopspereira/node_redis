const cache = require('./cache');

const ages = {
    John: '20',
    Michelle: '34',
    Amy: '31',
    Doug: '21'
}

const getAgeFromDb = (name, cb) => setTimeout(() => {
    console.log('Fetching from Db');

    const age = ages[name] || 'Does not exist'

    cb(age);

}, 1000);

module.exports = (name, cb) => {
    cache.get(name, (err, age) => {
        if (age !== null) {
            return cb(age);
        }
    });

    getAgeFromDb(name, age => {
        cache.set(name, age, () => {
            cb(age);
        });
    });
}
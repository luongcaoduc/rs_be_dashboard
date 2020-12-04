const fs = require('fs');

const dataFile = fs.readFileSync(`${__dirname}/config.txt`);
const config = JSON.parse(dataFile);

module.exports = config;

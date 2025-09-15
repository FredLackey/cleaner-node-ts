const isBlockDate    = require('./is');
const parseBlockDate = require('./parse');
const fromBlockDate  = require('./from');

module.exports = {
  isBlockDate,
  parseBlockDate,
  fromBlockDate,
  toDate: fromBlockDate,
};

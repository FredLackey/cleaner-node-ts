import isBlockDate from './is';
import parseBlockDate from './parse';
import fromBlockDate from './from';

export default {
  isBlockDate,
  parseBlockDate,
  fromBlockDate,
  toDate: fromBlockDate,
};

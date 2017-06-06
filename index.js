'use strict';

const __get = require('hodash.get');


/**
 *
 */
function reshape(mapping, obj, config) {
  config = config || {};

  const output = {};

  for (const key in mapping) {
    const value = mapping[key];

    if(!value)
      throw new Error('hodash.reshape mapped value for ' + key + ' must be a string, function, or object.');

    let mapped;
    // Assume .call and .apply means it's a function.
    if (value.call && value.apply) {
      try { mapped = value(obj); }
      catch (err) {}
    }
    else if (typeof value === 'string') mapped = __get(obj, value);
    else mapped = value;

    if (mapped === undefined && config.undefinedAsNull) mapped = null;
    output[key] = mapped;
  }

  return output;
};


/**
 *
 */
module.exports = reshape;

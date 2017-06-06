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

    let mapped;

    if (typeof value === 'function') {
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

'use strict';

const get = require('hodash.get');


/**
 *
 */
function reshape(mapping, obj, {
  sandboxed = true,
  undefinedAsNull = false
} = {}) {
  const output = {};

  for (const key in mapping) {
    const value = mapping[key];

    let mapped;

    if (typeof value === 'function') mapped = sandboxed ? get(() => value(obj, { get })) : value(obj, { get });
    else if (typeof value === 'string') mapped = get(obj, value);
    else mapped = value;

    if (mapped === undefined && undefinedAsNull) mapped = null;
    output[key] = mapped;
  }

  return output;
};


/**
 *
 */
module.exports = reshape;

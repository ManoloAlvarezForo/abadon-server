"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupBy = void 0;

/**
 * Groups objects by a property.
 *
 * @param {String} key That represent the property
 */
var groupBy = function groupBy(key) {
  return function (array) {
    return array.reduce(function (objectsByKeyValue, obj) {
      var value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  };
};

exports.groupBy = groupBy;
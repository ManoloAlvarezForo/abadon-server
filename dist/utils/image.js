"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSize = void 0;

var _imageSize = _interopRequireDefault(require("image-size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSize = function getSize(urlFile) {
  return new Promise(function (resolve, reject) {
    (0, _imageSize["default"])(urlFile, function (err, dimensions) {
      if (err) {
        reject(err);
      }

      resolve(dimensions);
    });
  });
};

exports.getSize = getSize;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comments = exports.addComment = exports.getProductCategories = exports.getProductsByCategory = exports.getProductsByFilter = exports.getPromoProductsByCategory = exports.getProductsByCategoryId = exports.getProductById = exports.addProduct = exports.getProducts = void 0;

var _product = _interopRequireDefault(require("../models/product"));

var _user = require("../resolvers/user");

var _client = require("../resolvers/client");

var _category = require("./category");

var _thumbnail = require("../resolvers/thumbnail");

var _fileManager = require("../utils/fileManager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// export const getProducts = async () => {
//   return await Product.find({})
//     .populate("thumbs")
//     .populate("client")
//     .populate({ path: "client", populate: "thumb" })
//     .populate("type")
//     .populate("categories");
// };
var getProducts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _product["default"].find({}).populate("thumbs").populate("client").populate({
              path: "client",
              populate: "thumb"
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getProducts() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Adds a new product in the product collection.
 *
 * @param {object} product Product to add.
 * @param {object} pubsub for Subscriptions.
 */


exports.getProducts = getProducts;

var addProduct = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(clientId, product) {
    var files,
        newProduct,
        thumbs,
        thumbnailsSaved,
        foundClient,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            files = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : [];
            _context2.prev = 1;
            newProduct = new _product["default"](_objectSpread({}, product));
            _context2.next = 5;
            return (0, _fileManager.uploadFiles)(files);

          case 5:
            thumbs = _context2.sent;

            if (thumbs) {
              _context2.next = 8;
              break;
            }

            throw Error("[Error]: to upload file.");

          case 8:
            _context2.next = 10;
            return (0, _thumbnail.addThumbnails)(thumbs);

          case 10:
            thumbnailsSaved = _context2.sent;
            newProduct.thumbs = thumbnailsSaved; // let productSaved = {};

            console.log("[INFO]: product added succsessfully.");

            if (!clientId) {
              _context2.next = 19;
              break;
            }

            _context2.next = 16;
            return (0, _client.getClientById)(clientId);

          case 16:
            foundClient = _context2.sent;
            newProduct.client = foundClient._id; // productSaved = await newProduct.save();
            // foundClient.products.unshift(productSaved._id);
            // await foundClient.save();

            console.log("[INFO]: product added to a client succsessfully.");

          case 19:
            _context2.next = 21;
            return newProduct.save();

          case 21:
            return _context2.abrupt("return", _context2.sent);

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](1);
            console.log("[Error]: Error to save a product. ", _context2.t0);

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 24]]);
  }));

  return function addProduct(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Gets a Product model by ID.
 *
 * @param {string} id String that represents an ID.
 */


exports.addProduct = addProduct;

var getProductById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    var foundProduct;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _product["default"].findById(id).populate("thumbs").populate("client").populate({
              path: "client",
              populate: "thumb"
            });

          case 2:
            foundProduct = _context3.sent;
            return _context3.abrupt("return", foundProduct);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getProductById(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getProductById = getProductById;

var getProductsByCategoryId = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(categoryId) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _product["default"].find({
              categories: {
                $in: categoryId
              }
            }).populate("thumbs").populate("client").populate({
              path: "client",
              populate: "thumb"
            });

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getProductsByCategoryId(_x4) {
    return _ref4.apply(this, arguments);
  };
}(); // export const getAllPromos = async 


exports.getProductsByCategoryId = getProductsByCategoryId;

var getPromoProductsByCategory = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(categoryId) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _product["default"].find({
              categories: {
                $in: categoryId
              },
              promo: true
            }).populate("thumbs").populate("client").populate({
              path: "client",
              populate: "thumb"
            });

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getPromoProductsByCategory(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Gets an product array by filter and properties.
 *
 * @param {string} query String that represents a Query.
 * @param {string[]} properties Array of string that represent properties.
 */


exports.getPromoProductsByCategory = getPromoProductsByCategory;

var getProductsByFilter = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(query) {
    var properties,
        regexToMatch,
        propertiesToMatch,
        _args6 = arguments;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            properties = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : [];
            regexToMatch = {
              $regex: new RegExp(query, "ig")
            };
            propertiesToMatch = properties.map(function (property) {
              return _defineProperty({}, property, regexToMatch);
            });

            if (!(query && properties.length > 0)) {
              _context6.next = 9;
              break;
            }

            _context6.next = 6;
            return _product["default"].aggregate([{
              $match: {
                $or: propertiesToMatch
              }
            }, {
              $addFields: {
                id: {
                  $toString: "$_id"
                }
              }
            }]);

          case 6:
            return _context6.abrupt("return", _context6.sent);

          case 9:
            _context6.next = 11;
            return _product["default"].find({});

          case 11:
            return _context6.abrupt("return", _context6.sent);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getProductsByFilter(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getProductsByFilter = getProductsByFilter;

var getProductsByCategory = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(category) {
    var response;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _product["default"].aggregate([{
              $match: {
                categories: category
              }
            }, {
              $addFields: {
                id: {
                  $toString: "$_id"
                }
              }
            }]);

          case 2:
            response = _context7.sent;
            return _context7.abrupt("return", response);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getProductsByCategory(_x7) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * Gets the enum values from product categories.
 */


exports.getProductsByCategory = getProductsByCategory;

var getProductCategories = function getProductCategories() {
  var categories = _product["default"].schema.path("categories").caster.enumValues;

  var response = categories.map(function (category) {
    return {
      name: category
    };
  });
  return response;
};
/**
 * Adds a comment according product id and user id.
 *
 * @param {string} comment String that represents a comment.
 * @param {string} productId String that represents a product id.
 * @param {string} userId String that represents a user id.
 */


exports.getProductCategories = getProductCategories;

var addComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(comment, productId, userId) {
    var foundProduct, _yield$getUserById, name, productSaved;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return getProductById(productId);

          case 3:
            foundProduct = _context8.sent;
            _context8.next = 6;
            return (0, _user.getUserById)(userId);

          case 6:
            _yield$getUserById = _context8.sent;
            name = _yield$getUserById.name;
            foundProduct.comments.unshift({
              comment: comment,
              user: name,
              userId: userId
            });
            _context8.next = 11;
            return foundProduct.save();

          case 11:
            productSaved = _context8.sent;
            return _context8.abrupt("return", productSaved.comments[0]);

          case 15:
            _context8.prev = 15;
            _context8.t0 = _context8["catch"](0);
            throw Error("[ERROR]: Error to add a comment");

          case 18:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 15]]);
  }));

  return function addComment(_x8, _x9, _x10) {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * Gets comments from a product according a product id.
 *
 * @param {string} productId String that represents a product id.
 */


exports.addComment = addComment;

var comments = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(productId) {
    var _yield$getProductById, comments;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return getProductById(productId);

          case 2:
            _yield$getProductById = _context9.sent;
            comments = _yield$getProductById.comments;
            return _context9.abrupt("return", comments);

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function comments(_x11) {
    return _ref10.apply(this, arguments);
  };
}();

exports.comments = comments;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSubcategoriesToCategory = exports.addSubcategory = exports.createCategories = exports.addCategoriesToParentByIds = exports.getCategorysByFilter = exports.getCategoryById = exports.addCategory = exports.getSubcategoriesByCategoryId = exports.getCategories = void 0;

var _category = _interopRequireDefault(require("../models/category"));

var _fileManager = require("../utils/fileManager");

var _thumbnail = require("./thumbnail");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Gets all Categorys.
 */
var getCategories = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parentId) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _category["default"].find({
              parent: parentId
            }).populate("thumb").populate("categories");

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getCategories(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getCategories = getCategories;

var getSubcategoriesByCategoryId = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(categoryId) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getCategoryById(categoryId);

          case 2:
            response = _context2.sent;

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getSubcategoriesByCategoryId(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Adds a new Category to Database.
 *
 * @param {object} Category Object that represents the Category.
 * @param {object} file Object that represents a file.
 */


exports.getSubcategoriesByCategoryId = getSubcategoriesByCategoryId;

var addCategory = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(category, file) {
    var newCategory, thumb, thumbnailSaved, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            newCategory = new _category["default"](_objectSpread({}, category));

            if (!file) {
              _context3.next = 12;
              break;
            }

            _context3.next = 4;
            return (0, _fileManager.uploadFile)(file);

          case 4:
            thumb = _context3.sent;

            if (thumb) {
              _context3.next = 7;
              break;
            }

            throw Error("[Error]: to upload file.");

          case 7:
            thumb["name"] = _category["default"].brand;
            _context3.next = 10;
            return (0, _thumbnail.addThumbnail)(thumb);

          case 10:
            thumbnailSaved = _context3.sent;
            newCategory.thumb = thumbnailSaved._id;

          case 12:
            _context3.next = 14;
            return newCategory.save();

          case 14:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function addCategory(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Gets a Category by id,
 *
 * @param {string} id String that represents the Category id.
 */


exports.addCategory = addCategory;

var getCategoryById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _category["default"].findById(id).populate("thumb").populate("categories").populate({
              path: "categories",
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

  return function getCategoryById(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Gets Category list by a query and properties.
 *
 * @param {string} query String that represents the query.
 * @param {[string]} properties String array that represent properties.
 */


exports.getCategoryById = getCategoryById;

var getCategorysByFilter = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(query) {
    var properties,
        regexToMatch,
        propertiesToMatch,
        _args5 = arguments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            properties = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : [];
            regexToMatch = {
              $regex: new RegExp(query, "ig")
            };
            propertiesToMatch = properties.map(function (property) {
              return _defineProperty({}, property, regexToMatch);
            });

            if (!(query && properties.length > 0)) {
              _context5.next = 9;
              break;
            }

            _context5.next = 6;
            return _category["default"].aggregate([{
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
            return _context5.abrupt("return", _context5.sent);

          case 9:
            _context5.next = 11;
            return _category["default"].find({});

          case 11:
            return _context5.abrupt("return", _context5.sent);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getCategorysByFilter(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getCategorysByFilter = getCategorysByFilter;

var addCategoriesToParentByIds = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(categoriesIds, parentId) {
    var foundTaegetCategory, response, i, categoryId, categoryFound, categorySaved;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _category["default"].findById(parentId);

          case 2:
            foundTaegetCategory = _context6.sent;
            response = null;
            i = 0;

          case 5:
            if (!(i < categoriesIds.length)) {
              _context6.next = 28;
              break;
            }

            categoryId = categoriesIds[i];
            _context6.prev = 7;
            _context6.next = 10;
            return getCategoryById(categoryId);

          case 10:
            categoryFound = _context6.sent;
            categoryFound.parent = parentId;
            _context6.next = 14;
            return categoryFound.save();

          case 14:
            categorySaved = _context6.sent;
            foundTaegetCategory.categories.push(categorySaved._id);
            _context6.next = 18;
            return foundTaegetCategory.save();

          case 18:
            response = _context6.sent;
            _context6.next = 24;
            break;

          case 21:
            _context6.prev = 21;
            _context6.t0 = _context6["catch"](7);
            console.log("[Error]: Error to add categories to category parent.");

          case 24:
            return _context6.abrupt("return", response);

          case 25:
            i++;
            _context6.next = 5;
            break;

          case 28:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[7, 21]]);
  }));

  return function addCategoriesToParentByIds(_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}();

exports.addCategoriesToParentByIds = addCategoriesToParentByIds;

var createCategories = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(categories) {
    var response, i, categoryItem, category, file, categoryAdded;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log("createCategories");
            response = [];
            i = 0;

          case 3:
            if (!(i < categories.length)) {
              _context7.next = 19;
              break;
            }

            categoryItem = categories[i];
            _context7.prev = 5;
            category = categoryItem.category, file = categoryItem.file;
            _context7.next = 9;
            return addCategory(category, file);

          case 9:
            categoryAdded = _context7.sent;
            response.push(categoryAdded._id);
            _context7.next = 16;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7["catch"](5);
            console.log("[Error]: Error to create a category from a list");

          case 16:
            i++;
            _context7.next = 3;
            break;

          case 19:
            return _context7.abrupt("return", response);

          case 20:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[5, 13]]);
  }));

  return function createCategories(_x9) {
    return _ref8.apply(this, arguments);
  };
}();

exports.createCategories = createCategories;

var addSubcategory = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(targetCategoryId, category, file) {
    var response, newCategory, foundCategory;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            response = null;
            _context8.prev = 1;
            _context8.next = 4;
            return addCategory(category, file);

          case 4:
            newCategory = _context8.sent;
            _context8.next = 7;
            return getCategoryById(targetCategoryId);

          case 7:
            foundCategory = _context8.sent;
            newCategory.parent = foundCategory._id;
            foundCategory.categories.push(newCategory._id);
            _context8.next = 12;
            return newCategory.save();

          case 12:
            _context8.next = 14;
            return foundCategory.save();

          case 14:
            response = _context8.sent;
            _context8.next = 20;
            break;

          case 17:
            _context8.prev = 17;
            _context8.t0 = _context8["catch"](1);
            console.log("[Error]: Error to add subcategory: Method [addSubcategory]: ".concat(_context8.t0));

          case 20:
            return _context8.abrupt("return", response);

          case 21:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 17]]);
  }));

  return function addSubcategory(_x10, _x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * Adds categoris ID's to a target category id.
 *
 * @param {string} targetCategoryId id that represents the target category id.
 * @param {string} categories array that represents a category list.
 */


exports.addSubcategory = addSubcategory;

var setSubcategoriesToCategory = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(targetCategoryId) {
    var categories,
        response,
        _args9 = arguments;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            categories = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : [];
            response = null;

            if (!categories.length) {
              _context9.next = 6;
              break;
            }

            _context9.next = 5;
            return addCategoriesToParentByIds(categories, targetCategoryId);

          case 5:
            response = _context9.sent;

          case 6:
            return _context9.abrupt("return", response);

          case 7:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function setSubcategoriesToCategory(_x13) {
    return _ref10.apply(this, arguments);
  };
}();

exports.setSubcategoriesToCategory = setSubcategoriesToCategory;
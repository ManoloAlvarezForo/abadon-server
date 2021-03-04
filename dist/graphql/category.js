"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryResolvers = exports.Category = void 0;

var _category2 = require("../resolvers/category");

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Category {\n    id: ID\n    name: String\n    label: String\n    parent: Category\n    categories: [Category]\n    thumb: Thumb\n    createdDate: String\n  }\n\n  input CategoryInput {\n    name: String\n    label: String\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Category = (0, _apolloServer.gql)(_templateObject());
exports.Category = Category;
var CategoryResolvers = {
  Query: {
    categories: function categories(_, _ref) {
      var parentId = _ref.parentId;
      // validateAuthentication(context.user);
      return (0, _category2.getCategories)(parentId);
    },
    category: function category(_, _ref2) {
      var id = _ref2.id;
      return (0, _category2.getCategoryById)(id);
    }
  },
  Mutation: {
    category: function category(_, _ref3) {
      var _category = _ref3.category,
          file = _ref3.file;
      return (0, _category2.addCategory)(_category, file);
    },
    addSubcategory: function addSubcategory(_, _ref4) {
      var targetCategoryId = _ref4.targetCategoryId,
          category = _ref4.category,
          file = _ref4.file;
      return (0, _category2.addSubcategory)(targetCategoryId, category, file);
    },
    setSubcategoriesToCategory: function setSubcategoriesToCategory(_, _ref5) {
      var targetId = _ref5.targetId,
          categories = _ref5.categories;
      return (0, _category2.setSubcategoriesToCategory)(targetId, categories);
    }
  }
};
exports.CategoryResolvers = CategoryResolvers;
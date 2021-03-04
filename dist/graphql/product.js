"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductResolvers = exports.Product = void 0;

var _product2 = require("../resolvers/product");

var _graphqlSubscriptions = require("graphql-subscriptions");

var _app = require("../app");

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Comment {\n    id: String\n    user: String\n    userId: String\n    comment: String\n    createdDate: String\n  }\n\n  type ThumbFormat {\n    ext: String\n    mime: String\n    width: Int\n    height: Int\n    size: Int\n    url: String\n  }\n\n  type ThumbFormats {\n    thumbnail: ThumbFormat\n    medium: ThumbFormat\n    small: ThumbFormat\n    large: ThumbFormat\n  }\n\n  type Thumb {\n    name: String\n    width: Int\n    height: Int\n    formats: ThumbFormats\n    ext: String\n    mime: String\n    size: Int\n    url: String\n    created_at: String\n    updated_at: String\n  }\n\n  type Product {\n    id: String\n    promoPrice: Int\n    promo: Boolean\n    productId: String\n    client: Client\n    thumbs: [Thumb]\n    name: String\n    price: Float\n    description: String\n    isAvailable: Boolean\n    availableQuantity: Int\n    createdDate: String\n    comments: [Comment]\n    type: String\n    categories: [String]\n    promoDescription: String\n  }\n\n  type ProductCategory {\n    name: String\n  }\n\n  input ProductCategoryInput {\n    name: String\n  }\n\n  input ProductInput {\n    name: String\n    promo: Boolean\n    promoPrice: Int\n    price: Float!\n    description: String\n    availableQuantity: Int\n    productId: String\n    type: String\n    categories: [String]\n    promoDescription: String\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Product = (0, _apolloServer.gql)(_templateObject());
exports.Product = Product;
var ProductResolvers = {
  Subscription: {
    productAdded: {
      subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
        return _app.pubsub.asyncIterator("productAdded");
      }, function (payload, variables, context) {
        var user = context.user; // The payload in that case is the new preaching and the variables comes from the params.
        // return payload.commentAdded.repository_name === variables.repoFullName;

        return true;
      })
    }
  },
  Query: {
    products: function products() {
      // validateAuthentication(context.user);
      return (0, _product2.getProducts)();
    },
    product: function product(_, _ref) {
      var id = _ref.id;
      return (0, _product2.getProductById)(id);
    },
    productsByFilter: function productsByFilter(_, _ref2) {
      var query = _ref2.query,
          properties = _ref2.properties;
      return (0, _product2.getProductsByFilter)(query, properties);
    },
    productCategories: function productCategories() {
      return (0, _product2.getProductCategories)();
    },
    comments: function comments(_, _ref3) {
      var productId = _ref3.productId;
      return (0, _product2.comments)(productId);
    },
    productsByCategory: function productsByCategory(_, _ref4) {
      var categoryId = _ref4.categoryId;
      return (0, _product2.getProductsByCategoryId)(categoryId);
    },
    promoProductsByCategory: function promoProductsByCategory(_, _ref5) {
      var categoryId = _ref5.categoryId;
      return (0, _product2.getPromoProductsByCategory)(categoryId);
    }
  },
  Mutation: {
    product: function product(_, _ref6) {
      var clientId = _ref6.clientId,
          _product = _ref6.product,
          files = _ref6.files;
      return (0, _product2.addProduct)(clientId, _product, files);
    },
    // addProduct: (_, { clientId, product, file }) => {
    //   return addProduct(clientId, product, file);
    // },
    comment: function comment(_, _ref7) {
      var _comment = _ref7.comment,
          productId = _ref7.productId,
          userId = _ref7.userId;
      return (0, _product2.addComment)(_comment, productId, userId);
    }
  }
};
exports.ProductResolvers = ProductResolvers;